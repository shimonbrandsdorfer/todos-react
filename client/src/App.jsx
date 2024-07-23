import { useState } from "react";
import "./App.css";
import Login from "./Login";
import Todos from "./Todos";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthContext from "./auth";
import Signup from "./Signup";
import SignupWithRdz from "./SignupWithRdz";
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  function setUser(user) {
    setCurrentUser(user);
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login setCurrentUser={setCurrentUser} />,
    },
    {
      path : "/sign-up",
      element : <Signup setCurrentUser={setCurrentUser} />
    },
    {
      path : '/sign-up-rdz',
      element : <SignupWithRdz setCurrentUser={setCurrentUser} />
    },
    {
      path: "/todos",
      element: <Todos />,
    },
  ]);
  return (
    <>
      <AuthContext.Provider value={currentUser}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </>
  );
}

export default App;
