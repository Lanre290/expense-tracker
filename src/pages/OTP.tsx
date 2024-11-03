import { useEffect, useState } from "react";
import otpImage from "./../assets/OTP 1.png";

const OTP = () => {
  const [figure_1, setFigure1] = useState<string>("");
  const [figure_2, setFigure2] = useState<string>("");
  const [figure_3, setFigure3] = useState<string>("");
  const [figure_4, setFigure4] = useState<string>("");
  const [otp, setOTP] = useState<string>("");
  const [formError, setFormError] = useState<boolean>(true);

  const otpInput = (e: any) => {
    if (e.target.value.length > 0) {
      try {
        e.target.nextElementSibling.focus();
      } catch (error) {}
    } else {
      try {
        e.target.previousElementSibling.focus();
      } catch (error) {}
    }
  };

  useEffect(() => {
    const total = `${figure_1}${figure_2}${figure_3}${figure_4}`;
    
    if(figure_1.length < 1 || figure_2.length < 1 || figure_3.length < 1 || figure_4.length < 1){
        setFormError(true);
    }
    else{
        setFormError(false);
        setOTP(total)
    }
  }, [figure_1, figure_2, figure_3, figure_4]);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col justify-evenly bg-gray-50">
      <img src={otpImage} alt="otp image" className="w-44 h-44 mx-auto" />
      <div className="flex flex-col w-full gap-y-3">
        <h3 className="text-4xl text-gray-700 font-bold">OTP Verification</h3>
        <h3 className="text-gray-700">
          Enter the OTP we sent to lanre2967@gmail.com
        </h3>
        <div className="flex flex-row justify-evenly">
          <input
            type="text"
            className={`border-b w-1/5 bg-transparent text-5xl p-4 text-black focus:outline-none ${
              figure_1.length > 0 ? "border-blue-400" : "border-gray-500"
            }`}
            value={figure_1}
            maxLength={1}
            onInput={(e: any) => {
              setFigure1(e.target.value);
              otpInput(e);
            }}
          />
          <input
            type="text"
            className={`border-b w-1/5 bg-transparent text-5xl p-4 text-black focus:outline-none ${
              figure_2.length > 0 ? "border-blue-400" : "border-gray-500"
            }`}
            value={figure_2}
            maxLength={1}
            onInput={(e: any) => {
              setFigure2(e.target.value);
              otpInput(e);
            }}
          />
          <input
            type="text"
            className={`border-b w-1/5 bg-transparent text-5xl p-4 text-black focus:outline-none ${
              figure_3.length > 0 ? "border-blue-400" : "border-gray-500"
            }`}
            value={figure_3}
            maxLength={1}
            onInput={(e: any) => {
              setFigure3(e.target.value);
              otpInput(e);
            }}
          />
          <input
            type="text"
            className={`border-b w-1/5 bg-transparent text-5xl p-4 text-black focus:outline-none ${
              figure_4.length > 0 ? "border-blue-400" : "border-gray-500"
            }`}
            value={figure_4}
            maxLength={1}
            onInput={(e: any) => {
              setFigure4(e.target.value);
              otpInput(e);
            }}
          />
        </div>
        <a className="text-black underline mt-10">
          Didn't receive OTP? Resend OTP
        </a>
      </div>
      <button
        className={`w-11/12 bg-black text-gray-50 rounded-2xl mx-auto my-5 ${
          formError && "bg-gray-400"
        }`}
      >
        Verify
      </button>
    </div>
  );
};

export default OTP;
