import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setCurrentUser }) {
  const navigate = useNavigate();
  const usernameElem = useRef(null);
  const passwordElem = useRef(null);
  async function submitHandler(event) {
    event.preventDefault();
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameElem.current.value,
        password: passwordElem.current.value
      }),
    });
    const result = await res.json();
    setCurrentUser(result.user_id);
    navigate("/todos", { state: { userId: result.user_id } });
  }

  return (
    <>
      <form className="login-form" onSubmit={submitHandler}>
        <section className="login-form__username">
          {" "}
          <label htmlFor="username">Username</label>
          <input
            ref={usernameElem}
            id="username"
            name="username"
            type="text"
          ></input>
        </section>
        <section className="login-form__password">
          <label htmlFor="password">Password</label>
          <input
            ref={passwordElem}
            id="password"
            name="password"
            type="password"
          ></input>
        </section>
        <section className="login-form__actions">
          <button type="submit">Log In</button>
          <button onClick={() => navigate('/sign-up')}>Sign Up</button>
        </section>
      </form>
    </>
  );
}

export default Login;
