import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import UserSchema from "./UserSchema";

function SignupWithRdz({ setCurrentUser }) {
  const navigate = useNavigate();

  const [file, setFile] = useState();
  const [dataUrl, setDataUrl] = useState();

  const onDrop = useCallback((files) => {
    let file = files?.[0];
   
    if (file) {
      setFile(file);
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onloadend = function () {
        setDataUrl(fileReader.result);
      };
    }
  }, []);

  const {
    getInputProps,
    getRootProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
    },
  });
  
  console.log("ACCEPTED: ", acceptedFiles);

  console.log("REJECTED: ", fileRejections)
  async function uploadFile() {
    let fd = new FormData();
    fd.append("profile", file);
    let res = await fetch("http://localhost:3000/users/upload-profile", {
      method: "POST",
      body: fd,
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
            <p className="err-msg">
              {formik.touched.userName ? formik.errors.userName : ""}
            </p>
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
            <p className="err-msg">
              {formik.touched.password ? formik.errors.password : ""}
            </p>
          </div>
        </section>
        <section>
          <label>Profile Picture</label>
          <div
            className={"upload-section " + (isDragActive ? "is-dragging" : "")}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {file ? (
              <img src={dataUrl} className="preview" />
            ) : (
              <p>
                {isDragActive
                  ? "Please drop your files here"
                  : "Drag And Drop your files here"}
              </p>
            )}
          </div>
          {file && <button onClick={uploadFile}>Upload</button>}
          Accepted Files:
          {acceptedFiles.map((af) => {
            return <p>{JSON.stringify(af)}</p>;
          })}
          Rejected Files:
          {fileRejections.map((rf) => {
            return <p>{JSON.stringify(rf)}</p>;
          })}
        </section>
        <section className="login-form__actions">
          <button className={formik.errors ? "" : "disabled"} type="submit">
            Sign Up
          </button>

          <button
            type="button"
            className={formik.dirty ? "" : "disabled"}
            onClick={formik.handleReset}
          >
            Reset
          </button>
        </section>
      </form>

      <a onClick={() => navigate("/")}>Login</a>
    </>
  );
}

export default SignupWithRdz;
