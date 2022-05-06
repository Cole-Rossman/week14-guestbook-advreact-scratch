import { useState, useEffect } from 'react'
import { fetchEntries, createEntry } from '../../services/entries'
import { useUser } from '../../context/UserContext';
import homeStyle from './UserHome.css';

export default function UserHome() {
  const [entries, setEntries] = useState([]);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('')

  const { user } = useUser();
  
  useEffect(() => {
    const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchEntries();
      setEntries(data);
      setLoading(false);
    } catch (e) {
      setError(e.message);
    }
  };
  fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const newEntry = await createEntry({ userId: user.id, content: description });
      console.log('newEntry', newEntry)
      setEntries((prevState) => [newEntry[0], ...prevState]);
      setDescription('');
    } catch (e) {
      setError(e.message);
    }
  };
  if (loading) return <h1>Loading...</h1>

  return (
    <>
    <h1>Guestbook</h1>
      {error && <p>{error}</p>}
    <div>
      <h2>Latest entries:</h2>
      <div className={homeStyle.entry}>
        <label>
          New Entry:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button onClick={handleSubmit}>Save Entry</button>
        </label>
      </div>
      <div className={homeStyle.list}>
      {entries.map((entry) => (
        <ul key={entry.id} className={homeStyle.item}>
          <h3>Entry: {entry.content}</h3>
          <h4>From user: {user.email}</h4>
          <h5>Date: {entry.created_at}</h5>
        </ul>
        ))}
        </div>
    </div>
    </>
  )
}
