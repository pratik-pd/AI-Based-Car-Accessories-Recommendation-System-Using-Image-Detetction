import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logoutUser = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");
  };

  return (

    <div className="w-full border-b border-gray-800 bg-[#111111]">

      <div className="max-w-[1400px] mx-auto px-6 py-5 flex justify-between items-center">

        <h1 className="text-3xl font-black text-white">

          AI Vehicle
          <span className="text-orange-500">
            {" "}Analyzer
          </span>

        </h1>

        <button
          onClick={logoutUser}
          className="bg-orange-500 hover:bg-orange-600 transition-all duration-300 px-6 py-3 rounded-2xl font-bold text-white"
        >

          Logout

        </button>

      </div>

    </div>
  );
}

export default Navbar;