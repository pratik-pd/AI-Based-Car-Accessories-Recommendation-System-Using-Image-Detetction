import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const loginUser = async () => {

    try {

      const response = await axios.post(
        "http://127.0.0.1:5000/login",
        {
          email,
          password,
        }
      );

      console.log(response.data);

      if (!response.data.success) {

        alert(response.data.message);

        return;
      }

      // SAVE USER
      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      localStorage.setItem(
        "user_id",
        response.data.token
      );

      alert("Login Successful");

      navigate("/home");
      // window.location.href = "/";

    } catch (error) {

      console.log(error);

      alert("Login Failed");
    }
  };

  return (

    <div className="min-h-screen bg-black flex justify-center items-center px-4">

      <div className="bg-[#161616] border border-gray-800 p-10 rounded-[30px] w-full max-w-[450px]">

        <h1 className="text-4xl font-black text-white text-center">
          Welcome Back
        </h1>

        <p className="text-gray-400 text-center mt-3">
          Login to continue
        </p>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full mt-8 bg-[#222] text-white p-4 rounded-2xl outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full mt-5 bg-[#222] text-white p-4 rounded-2xl outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* LOGIN BUTTON */}
        <button
          onClick={loginUser}
          className="w-full mt-7 bg-orange-500 hover:bg-orange-600 transition-all duration-300 py-4 rounded-2xl text-white font-bold"
        >
          Login
        </button>

        {/* SIGNUP LINK */}
        <p className="text-gray-400 text-center mt-6">

          Don't have account?

          <Link
            to="/signup"
            className="text-orange-500 ml-2 font-bold"
          >
            Signup
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;