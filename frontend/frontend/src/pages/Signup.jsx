import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const registerUser = async () => {

    try {

      const response = await axios.post(
        "http://127.0.0.1:5000/signup",
        {
          name,
          email,
          password,
        }
      );

      console.log(response.data);

      if (!response.data.success) {

        alert(response.data.message);

        return;
      }

      alert("Account Created Successfully");

      navigate("/");
      // window.location.href = "/";

    } catch (error) {

      console.log(error);

      alert("Registration Failed");
    }
  };

  return (

    <div className="min-h-screen bg-black flex justify-center items-center px-4">

      <div className="bg-[#161616] border border-gray-800 p-10 rounded-[30px] w-full max-w-[450px]">

        <h1 className="text-4xl font-black text-white text-center">
          Create Account
        </h1>

        <p className="text-gray-400 text-center mt-3">
          Signup to continue
        </p>

        {/* NAME */}
        <input
          type="text"
          placeholder="Enter Name"
          className="w-full mt-8 bg-[#222] text-white p-4 rounded-2xl outline-none"
          onChange={(e) => setName(e.target.value)}
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full mt-5 bg-[#222] text-white p-4 rounded-2xl outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full mt-5 bg-[#222] text-white p-4 rounded-2xl outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={registerUser}
          className="w-full mt-7 bg-orange-500 hover:bg-orange-600 transition-all duration-300 py-4 rounded-2xl text-white font-bold"
        >
          Create Account
        </button>

        {/* LOGIN LINK */}
        <p className="text-gray-400 text-center mt-6">

          Already have account?

          <Link
            to="/"
            className="text-orange-500 ml-2 font-bold"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Signup;