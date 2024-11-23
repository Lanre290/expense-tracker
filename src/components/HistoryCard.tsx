import { CgArrowRight } from "react-icons/cg";
import { CiBurger, CiMoneyBill, CiShoppingTag } from "react-icons/ci";

interface historyData {
    for: 'food' | 'misc' | 'shopping';
    title:string;
    date:string;
    amount:string | number;
}

const HistoryCard = (data:historyData) => {
    return (
        <div className="bg-gray-200 rounded-2xl h-20 bg-opacity-50 w-11/12 mx-auto flex items-center px-2 gap-x-2 active:bg-gray-300 cursor-pointer md:hover:bg-gray-300">
            {
                data.for == 'food' && <CiBurger className="p-3 rounded-full bg-gray-200 text-blue-400 font-light text-6xl"></CiBurger>
            }
            {
                data.for == 'shopping' && <CiShoppingTag className="p-3 rounded-full bg-gray-200 text-blue-400 font-light text-6xl"></CiShoppingTag>
            }
            {
                data.for == 'misc' && <CiMoneyBill className="p-3 rounded-full bg-gray-200 text-blue-400 font-light text-6xl"></CiMoneyBill>
            }
            <div className="flex flex-col h-full justify-center  items-start flex-grow">
                <h3 className="text-black text-xl font-light">{data.title}</h3>
                <h3 className="text-gray-500 font-light">{data.date}</h3>
            </div>
            <div className="flex flex-row gap-x-2 items-center mr-4">
                <h3 className="text-gray-500 text-xl">₦{data.amount}</h3>
                <CgArrowRight className="text-xl text-gray-500"></CgArrowRight>
            </div>
        </div>
    )
}

export default HistoryCard;