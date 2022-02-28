import { useState } from "react";
import cx from "classnames";
import { useRouter } from "next/router";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const classname = {
    label: cx("form-label text-lg fw-medium color-palette-1 mb-10"),
  };
  const onSubmit = () => {
    const dataForm = {
      name,
      email,
      password,
    };

    localStorage.setItem("dataForm", JSON.stringify(dataForm));
    router.push("/sign-up-photo");
  };
  return (
    <>
      <h2 className="text-4xl fw-bold color-palette-1 mb-10">Sign Up</h2>
      <p className="text-lg color-palette-1 m-0">Daftar dan bergabung dengan kami</p>
      <div className="pt-50">
        <label htmlFor="name" className={classname.label}>
          Full Name
        </label>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control rounded-pill text-lg" aria-describedby="name" placeholder="Enter your name" />
      </div>
      <div className="pt-30">
        <label htmlFor="email" className={classname.label}>
          Email Address
        </label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control rounded-pill text-lg" aria-describedby="email" placeholder="Enter your email address" />
      </div>
      <div className="pt-30">
        <label htmlFor="password" className={classname.label}>
          Password
        </label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control rounded-pill text-lg" aria-describedby="password" placeholder="Your password" />
      </div>
      <div className="button-group d-flex flex-column mx-auto pt-50">
        <button onClick={onSubmit} className="btn btn-sign-up fw-medium text-lg text-white rounded-pill mb-16" type="button">
          Continue
        </button>
        <a className="btn btn-sign-in fw-medium text-lg color-palette-1 rounded-pill" href="/sign-in" role="button">
          Sign In
        </a>
      </div>
    </>
  );
}
