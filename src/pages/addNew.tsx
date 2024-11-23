import { useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddNew = () => {
    const [title, setTitle] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [group, setGroup] = useState<string>('food');

    const navigate = useNavigate();
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
    
        try {
          if(title.length < 1 || amount.toString().length < 1 || group.length < 1){
            throw new Error('Fill in all fields.');
          }
    
          toast.info('Processing, Please wait...');
          const body = {
            title: title,
            amount: amount,
            group: group
          }
    
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/expenses`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify(body),
          });
      
          console.log(response);
      
          if (response.ok) {
            navigate('/dashboard');
          } else {
            let res = await response.json();
            toast.error(res.error);
          }
    
        } catch (error :any) {
          toast.error(error as string);
        }
    
      };
    
    return(
        <div className="fixed top-0 bottom-0 right-0 left-0 bg-gray-50">
            <div className="w-full flex flex-row h-20 items-center gap-x-5 p-3">
                <Link to={'/dashboard'} className="p-2 rounded-full bg-transparent">
                    <BiChevronLeft className="text-3xl text-gray-500"></BiChevronLeft>
                </Link>
            </div>

            <h3 className="text-gray-700 text-3xl font-light flex items-center ml-5 my-2">Add new expense</h3>

            <div className="flex flex-col gap-y-2 items-center mt-16">
                <select name="" id="" onInput={(e: any) => {setGroup(e.target.value)}} value={group} className="w-11/12 h-14 rounded-xl bg-transparent border border-gray-600 text-gray-600">
                    <option value="food">Food</option>
                    <option value="shopping">shopping</option>
                    <option value="misc">Misc</option>
                </select>
                <input type="text" className="p-2 px-4 bg-gray-200 w-11/12 text-gray-800 rounded-xl h-14 font-light focus:outline-none" onInput={(e: any) => {setTitle(e.target.value)}} value={title}  placeholder="Title..." />
                <input type="number" className="p-2 px-4 bg-gray-200 w-11/12 text-gray-800 rounded-xl h-14 font-light focus:outline-none" onInput={(e: any) => {setAmount(e.target.value)}} value={amount}  placeholder="Amount..." />

                <button className="w-11/12 bg-blue-500 text-gray-50 mt-14" onClick={handleSubmit}>Proceed</button>
            </div>
        </div>
    )
}


export default AddNew;