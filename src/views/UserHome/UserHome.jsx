import { useState, useEffect } from 'react'
import { fetchEntries, createEntry } from '../../services/entries'
import { useUser } from '../../context/UserContext';

export default function UserHome() {
  const [entries, setEntries] = useState([]);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('')

  const { user, logout } = useUser();
  
  useEffect(() => {
    const fetchData = async () => {
    try {
      const data = await fetchEntries();
      console.log('data', data)
      setEntries(data);
      setLoading(false);
    } catch (e) {
      setError(e.message);
    }
  };
  fetchData();
  },[]);

  const handleSubmit = async () => {
    try {
      const newEntry = await createEntry({ userId: user.id, content: description });
      setEntries((prevState) => [...prevState, newEntry]);
    } catch (e) {
      setError(e.message);
    }
  };
  if (loading) return <h1>Loading...</h1>

  return (
    <>
    <h1>Guestbook</h1>
    <div>
      {error && <p>{error}</p>}
      <h2>Latest entries:</h2>
      {entries.map((entry) => (
        <ul key={entry.id}>
          <h3>{entry.content}</h3>
          <h4>{user.email}</h4>
          <h5>{entry.created_at}</h5>
        </ul>
        ))}
      <div>
        <label>
          New Entry:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button onClick={handleSubmit}>Save Entry</button>
        </label>
      </div>
    </div>
    </>
  )
}
