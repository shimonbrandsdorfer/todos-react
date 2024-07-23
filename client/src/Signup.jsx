import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import UserSchema from "./UserSchema";

function Signup({ setCurrentUser }) {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [url, setUrl] = useState();
  const [previewDataUrl, setPreviewDataUrl] = useState();

  async function uploadFile(){
    let fd = new FormData();
    fd.append('profile', file);
    let res = await fetch("http://localhost:3000/users/upload-profile", {
      method : 'POST',
      body : fd
    });

    let resData = await res.json();

    setUrl(resData.url);
  
  }

  const formik = useFormik({
    initialValues: {
      userName: "",
      firstName: "",
      lastName: "",
      dob: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: UserSchema,
    onSubmit: handleSignUp,
  });

  function fileChanged({target}){
   let file = target.files[0];

   setFile(file);
   
   let fileReader = new FileReader();
   if(file){
    fileReader.readAsDataURL(file);
   }

   fileReader.onloadend = function(){
    setPreviewDataUrl(fileReader.result);
   }
  }

  async function handleSignUp(event) {
    event.preventDefault();

    if (formik.errors) return;

    const res = await fetch("http://localhost:3000/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        password: password,
      }),
    });
    const result = await res.json();
    // navigate("/todos", {state: { userId: result.user_id}})
  }

  return (
    <>
      <form className="login-form" onSubmit={formik.handleSubmit}>
        <section
          className={
            "login-form__username " + (!formik.errors.userName ? "" : "invalid")
          }
        >
          {" "}
          <label htmlFor="username">Username</label>
          <div>
            <input
              value={formik.values.userName}
              id="username"
              name="userName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
            <p className="err-msg">{formik.touched.userName ? formik.errors.userName : ""}</p>
          </div>
        </section>

        <section
          className={
            "login-form__password " + (!formik.errors.password ? "" : "invalid")
          }
        >
          {" "}
          <label htmlFor="password">Paswsword</label>
          <div>
            <input
              value={formik.values.password}
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
            <p className="err-msg">{formik.touched.password ? formik.errors.password : ""}</p>
          </div>
        </section>
        <section>
          <label>Profile Picture</label>
          <div>
            <input type="file" onChange={fileChanged} accept="image/png"  />
          </div>
          {file ? <button onClick={uploadFile} >Upload</button> : null}

          {previewDataUrl && <img src={previewDataUrl} width="200" height="200" /> }

          {url ? <img src={url} /> : null}
        </section>
        <section className="login-form__actions">
          <button className={formik.errors ? "" : "disabled"} type="submit">
            Sign Up
          </button>

          <button type="button" className={formik.dirty ? "" : "disabled"} onClick={formik.handleReset} >Reset</button>
        </section>
      </form>

      <a onClick={() => navigate("/")}>Login</a>
    </>
  );
}

export default Signup;
