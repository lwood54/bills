import * as React from 'react';
import { Link, useNavigate } from "@remix-run/react";
import supabase from "~/utils/supabase";

export default () => {
  const navigate = useNavigate();
  const [errMessage, setErrMessage] = React.useState('');
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setErrMessage(error.message);
      console.log(error.message);
      return;
    }
    console.log('getting here?');
    navigate('/login');
  };
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-800 text-white gap-2">
      {errMessage && <p className="text-red-400">{errMessage}</p> }
      <h1 className="text-4xl mb-4">Sign Up</h1>
      <form className="flex flex-col" onSubmit={handleSignUp}>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className="border border-gray-200 bg-transparent mb-4 px-2"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="border border-gray-200 bg-transparent mb-4 px-2"
          />
        </div>
        <button className="bg-gray-700 py-2">Go!</button>
      </form>
      <p>
        Already have an account?{" "}
        <Link to="/login" className="underline">
          Login
        </Link>
      </p>
    </div>
  );
};
