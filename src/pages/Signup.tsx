import shapes from "./../assets/Shapes.png";
import logo from "./../assets/Logo.png";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [formError, setFormError] = useState<boolean>(true);
  const navigate = useNavigate();


  const handleSubmit = async (e: any) => {
    e.preventDefault();


    try {
      if(name.length < 1 || email.length < 1 || password.length < 1 || repeatPassword.length < 1){
        throw new Error('Fill in all fields.');
      }
  
      if(password != repeatPassword){
        throw new Error('Passwords do not match.');
      }

      toast.info('Processing, Please wait...');
      const body = {
        fullname: name,
        email: email,
        password: password
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/signup`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(body),
      });
  
      console.log(response);
  
      if (response.ok) {
        localStorage.setItem('email_', email);
        navigate('/otp');
      } else {
        let res = await response.json();
        console.log(res);
        toast.error(res.error);
      }

    } catch (error :any) {
      toast.error(error.message as string);
    }

  };

  useEffect(() => {
    if (
      name.length < 1 ||
      email.length < 1 ||
      password.length < 1 ||
      repeatPassword.length < 1
    ) {
      setFormError(true);
    } else {
      setFormError(false);
    }
  }, [name, email, password, repeatPassword]);

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
            <h3 className="text-gray-50 text-5xl text-left">Welcome</h3>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <h3 className="w-11/12 mx-auto text-gray-600 font-bold my-2 ml-4 text-5xl text-left">
            Signup
          </h3>
          <div className="flex flex-col mt-8 pl-2 py-3">
            <h3 className="w-11/12 mx-auto font-light text-gray-500 my-2 text-left">
              Full name
            </h3>
            <input
              type="text"
              className="p-2 text-gray-600 font-light border-b border-gray-400 bg-transparent w-11/12 mx-auto mb-4"
              placeholder="Full name..."
              onInput={(e: any) => {
                setName(e.target.value);
              }}
              value={name}
            />
            <h3 className="w-11/12 mx-auto font-light text-gray-500 my-2 text-left">
              Email Adress
            </h3>
            <input
              type="email"
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
            <h3 className="w-11/12 mx-auto font-light text-gray-500 my-2 text-left">
              Repeat password
            </h3>
            <input
              type="password"
              className="p-2 text-gray-600 font-light border-b border-gray-400 bg-transparent w-11/12 mx-auto mb-4"
              placeholder="Password..."
              onInput={(e: any) => {
                setRepeatPassword(e.target.value);
              }}
              value={repeatPassword}
            />
          </div>
          <Link to="/login" className="text-black underline text-center">
            Already have an account? Sign in
          </Link>
          <button
            className={`w-11/12 bg-black text-gray-50 rounded-2xl mx-auto my-5 ${
              formError && "bg-gray-400"
            }`}
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
