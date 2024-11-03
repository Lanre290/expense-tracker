import shapes from "./../assets/Shapes.png";
import logo from "./../assets/Logo.png";
import { useEffect, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [formError, setFormError] = useState<boolean>(true);
  const handleSubmit = () => {};

  useEffect(() => {
    if(email.length < 1 || password.length < 1){
        setFormError(true);
    }
    else{
        setFormError(false);
    }
  }, [email, password])

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0">
      <form
        action=""
        className="flex flex-col justify-between w-full h-screen overflow-x-hidden relative bg-left-top bg-no-repeat bg-gray-50"
        onSubmit={handleSubmit}
      >
        <div className="w-80 relative">
          <img className="w-full object-bottom h-72" src={shapes}></img>
          <div className="flex flex-col absolute bottom-16 left-2 w-11/12 mx-auto items-start">
            <img src={logo} alt="logo" className="w-16 h-16" />
            <h3 className="text-gray-50 text-5xl text-left">Welcome Back</h3>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <h3 className="w-11/12 mx-auto text-gray-600 font-bold my-2 ml-4 text-5xl text-left">
            Sign-in
          </h3>
          <div className="flex flex-col mt-8 pl-2 py-3">
            <h3 className="w-11/12 mx-auto font-light text-gray-500 my-2 text-left">
              Email Adress
            </h3>
            <input
              type="text"
              className="p-2 text-gray-600 font-light border-b border-gray-400 bg-transparent w-11/12 mx-auto mb-4"
              placeholder="Email..."
              onInput={(e: any) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
            <h3 className="w-11/12 mx-auto font-light text-gray-500 my-2 text-left">
              Password
            </h3>
            <input
              type="password"
              className="p-2 text-gray-600 font-light border-b border-gray-400 bg-transparent w-11/12 mx-auto mb-4"
              placeholder="Password..."
              onInput={(e: any) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
          </div>
          <a href="/signup" className="text-black underline">Don't have an account? Sign up</a>
          <button className={`w-11/12 bg-black text-gray-50 rounded-2xl mx-auto my-5 ${formError && 'bg-gray-400'}`}>
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
