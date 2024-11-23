
import { useState } from "react";
import { CiHome, CiViewList } from "react-icons/ci";
import { IoPieChartOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';


const Dashboard = () => {
    const [screen, setScreen] = useState<string>("transactions");
    return(
        <div className="flex flex-row fixed w-full bottom-0 left-0 right-0 h-16 bg-gray-50 md:w-28 md:shadow-lg md:flex md:flex-col md:gap-y-3 md:top-1/3 md:bottom-auto md:my-auto md:h-72 md:rounded-tr-3xl md:rounded-br-3xl md:p-6 md:backdrop-blur-lg md:bg-opacity-30 md:items-center md:justify-center md:bg-gray-200 z-50" style={{backdropFilter: 'blur(5px)'}}>
        <Link
        to="/dashboard"
          className={`w-1/3 bg-gray-50 flex items-center justify-center active:bg-gray-100 rounded-none focus:outline-none focus:border-0  md:w-full md: h-20 md:bg-gray-300 md:bg-opacity-0 ${
            screen == "transactions" ? "text-blue-500" : "text-gray-400"
          }`}
          onClick={() => {
            setScreen("transactions");
          }}
        >
        <CiHome className={`text-3xl ${screen == 'transactions' ? 'text-blue-500' : 'text-gray-400'} md:text-7xl md:hover:text-blue-500 md:bg-transparent md:active:bg-transparent`}></CiHome>
        </Link>


        <Link
          to='/stats'
          className={`w-1/3 bg-gray-50 flex items-center justify-center active:bg-gray-100 rounded-none focus:outline-none focus:border-0  md:w-full md: h-20 md:bg-gray-300 md:bg-opacity-0 ${
            screen == "chart" ? "text-blue-500" : "text-gray-400"
          }`}
          onClick={() => {
            setScreen("chart");
          }}
        >
          <IoPieChartOutline className={`text-3xl ${screen == 'chart' ? 'text-blue-500' : 'text-gray-400'} md:text-7xl md:hover:text-blue-500 md:bg-transparent md:active:bg-transparent`}></IoPieChartOutline>
        </Link>

        <Link
        to="/history"
          className={`w-1/3 bg-gray-50 flex items-center justify-center active:bg-gray-100 rounded-none focus:outline-none focus:border-0  md:w-full md: h-20 md:bg-gray-300 md:bg-opacity-0 ${
            screen == "history" ? "text-blue-500" : "text-gray-400"
          }`}
          onClick={() => {
            setScreen("history");
          }}
        >
        <CiViewList className={`text-3xl ${screen == 'history' ? 'text-blue-500' : 'text-gray-400'} md:text-7xl md:hover:text-blue-500 md:bg-transparent md:active:bg-transparent`}></CiViewList>
        </Link>
      </div>
    )
}

export default Dashboard;