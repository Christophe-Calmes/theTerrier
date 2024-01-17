import { useAuthContext } from "../context/AuthProvider";

function SignIn() {
  const { user, isAuthenticated, login, logout } = useAuthContext();

  console.log(user);

  return (
    <div>
      <h1>SignIn</h1>
      <button
        onClick={() => {
          console.log(isAuthenticated);
        }}
      >
        Check auth
      </button>
      <button
        onClick={() => {
          console.log(user);
        }}
      >
        Check user
      </button>
      <br />

      <button
        onClick={() => {
          login("toto@gmail.com");
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default SignIn;
