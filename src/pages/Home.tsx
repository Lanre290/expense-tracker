import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { GrPieChart, GrTransaction } from "react-icons/gr";
import { IoPieChart } from "react-icons/io5";
import { TbTransactionDollar } from "react-icons/tb";

const Home = () => {
    const [screen, setScreen] = useState<string>("chart");
    const [balanceShown, setBalanceShown] = useState<boolean>(true);


    const toggleBalanceShwon = () => {
        if(balanceShown == true){
            setBalanceShown(false);
        }
        else{
            setBalanceShown(true);
        }
    }

    return (
        <>
            <div className="flex flex-col fixed top-0 bottom-16 left-0 right-0 w-full bg-gray-50">
                <div className="h-36 bg-blue-500 flex items-center" style={{borderRadius: '0px 0px 0px 70px'}}>
                    <h3 className="text-gray-50 text-2xl ml-5 font-bold">Hello Sheriff</h3>
                </div>

                <div className="w-11/12 rounded-xl bg-blue-500 flex flex-col items-center justify-center h-28 my-3 mx-auto">
                    <div className="flex flex-row items-center justify-start w-full px-3">
                        <h3 className="text-gray-50">Available valance</h3>
                        <button className="w-auto h-auto flex items-center justify-center bg-transparent text-gray-50 ml-0" onClick={toggleBalanceShwon}>
                            {balanceShown == true ? <BsEye className="text-xl"></BsEye> : <BsEyeSlash className="text-xl"></BsEyeSlash>}
                        </button>
                    </div>
                    <h3 className="text-4xl text-gray-50 text-left w-full ml-5">
                        {balanceShown == true ? '₦1200' : '***'}
                    </h3>
                </div>


                <div className="bg-gray-200 rounded-2xl h-24 bg-opacity-50">

                </div>

            </div>




            <div className="flex flex-row fixed w-full bottom-0 left-0 right-0 h-16 bg-gray-50">
                <button className={`w-1/2 bg-gray-50 flex items-center justify-center active:bg-gray-100 rounded-none ${screen == 'transactions' ? 'text-blue-500': 'text-gray-400'}`} onClick={() => {setScreen('transactions')}}>
                    {screen == 'transactions' ? <GrTransaction className="text-3xl"></GrTransaction> : <TbTransactionDollar className="text-3xl"></TbTransactionDollar>}
                </button>
                <button className={`w-1/2 bg-gray-50 flex items-center justify-center active:bg-gray-100 rounded-none ${screen == 'chart' ? 'text-blue-500': 'text-gray-400'}`} onClick={() => {setScreen('chart')}}>
                    {screen == 'chart' ? <IoPieChart className="text-3xl"></IoPieChart> : <GrPieChart className="text-3xl"></GrPieChart>}
                </button>
            </div>
        </>
    )
}

export default Home;