import { useUser } from "../../context/UserContext";

export default function Header() {
  const { user, logout } = useUser();

  return (
    <>
    <button onClick={logout}>Sign out</button>
    <p>Signed in as {user.email}</p>
    </>
    )
}
