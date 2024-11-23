import shapes from "./../assets/Shapes.png";
import logo from "./../assets/Logo.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [formError, setFormError] = useState<boolean>(true);
  const navigate = useNavigate();


  const handleSubmit = async (e: any) => {
    e.preventDefault();


    try {
      if(email.length < 1 || password.length < 1){
        throw new Error('Fill in all fields.');
      }

      toast.info('Processing, Please wait...');
      const body = {
        email: email,
        password: password
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(body),
      });
  
      if (response.ok) {
        let res = await response.json();
        localStorage.setItem('token', res.token);
        navigate('/dashboard');
      } else {
        let res = await response.json();
        toast.error(res.error);
      }

    } catch (error :any) {
      toast.error(error as string);
    }

  };

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
          <Link to="/signup" className="text-black underline text-center">Don't have an account? Sign up</Link>
          <button className={`w-11/12 bg-black text-gray-50 rounded-2xl mx-auto my-5 ${formError && 'bg-gray-400'}`}>
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
