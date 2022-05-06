import { useState, useEffect } from 'react'
import { fetchEntries, createEntry } from '../../services/entries'
import { useUser } from '../../context/UserContext';

export default function UserHome() {
  const [entry, setEntry] = useState([]);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('')

  const { user } = useUser();
  console.log('user', user)
  useEffect(() => {
    const fetchData = async () => {
    try {
      const data = await fetchEntries();
      console.log('data', data)
      setEntry(data);
      setLoading(false);
    } catch (e) {
      setError(e.message);
    }
  }
  fetchData();
  },[]);

  const handleSubmit = async () => {
    try {
      const newEntry = await createEntry({ userId: user.id, content: description });
      setEntry((prevState) => [...prevState, newEntry]);
    } catch (e) {
      setError(e.message);
    }
  };
  if (loading) return <h1>Loading...</h1>

  return (
    <>
    <h1>Guestbook</h1>
    <div>
      {entry.map((entry) => {
        <h3 key={entry.id}>{entry.entries}</h3>
      })}
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
