import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { CgArrowRight } from "react-icons/cg";
import { ResponsivePie } from "@nivo/pie";
import Dashboard from "../components/Dashboard";
import HistoryCard from "../components/HistoryCard";
import { ResponsiveBar } from '@nivo/bar';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [balanceShown, setBalanceShown] = useState<boolean>(true);
  const [colors, setColor] = useState<string[]>([]);
  const [history, setHistory] = useState<{}[]>([]);
  const [name, setName] = useState<string>('');
  const navigate = useNavigate();

  const data_ = [
    { id: "JavaScript", label: "JavaScript", value: 55 },
    { id: "Python", label: "Python", value: 30 },
    { id: "Java", label: "Java", value: 15 },
  ];

  const [data, setData] = useState<{}[]>(data_);

  const chooseColors = () => {
    const colorList = [
      "#3B82F6",
      "#2563EB",
      "#1D4ED8",
      "#1E40AF",
      "#38BDF8",
      "#0EA5E9",
      "#0284C7",
      "#0369A1",
      "#22D3EE",
      "#06B6D4",
      "#0891B2",
      "#0D9488",
      "#10B981",
      "#059669",
      "#16A34A",
      "#4ADE80",
      "#84CC16",
      "#A3E635",
      "#F59E0B",
      "#F97316",
    ];

    for (let i = 0; i < data.length; i++) {
      let preColor: string[] = colors;
      let color =
        colorList[Math.floor(Math.random() * colorList.length) as number];

      if (preColor.includes(color)) {
        color =
          colorList[Math.floor(Math.random() * colorList.length) as number];
      } else {
        preColor.push(color);
        setColor(preColor);
      }
    }
  };

  chooseColors();

  const toggleBalanceShwon = () => {
    if (balanceShown == true) {
      setBalanceShown(false);
    } else {
      setBalanceShown(true);
    }
  };

  

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });

      if (response.ok){
        const res = await response.json();
        console.log(res);
        setName(res.data.user.name.split(' ').length > 1 ?  res.data.user.name.split(' ')[1] : res.data.user.name.split(' ')[0]);
        setHistory(res.data.user.Expenses);
        setData(res.data.expensesData);
      } else {
        navigate('/signup');
        let res = await response.json();
        toast.error(res.error);
      }
    }

    load();
  },[]);


  return (
    <>
      <div className="flex flex-col fixed top-0 bottom-16 left-0 right-0 w-full bg-gray-50 overflow-y-auto md:bottom-0">
        <div
          className="h-36 bg-blue-500 flex items-center md:bg-transparent min-h-36"
          style={{ borderRadius: "0px 0px 0px 70px",
            minHeight: '144px'
           }}
        >
          <h3 className="text-gray-50 text-2xl ml-5 font-bold md:text-gray-700 md:text-5xl">
            Hello {name}
          </h3>
        </div>

        <div className="flex flex-col w-full">
          <div className="w-11/12 rounded-xl bg-blue-500 flex flex-col items-center justify-center h-28 my-3 mx-auto md:w-96 md:mx-10 gap-y-3 p-3">
            <div className="flex flex-row items-center justify-start w-full px-3">
              <h3 className="text-gray-50">Total expenses</h3>
              <button
                className="w-auto h-auto flex items-center justify-center bg-transparent text-gray-50 ml-0 focus:outline-none focus:border-0 md:ml-4"
                onClick={toggleBalanceShwon}
              >
                {balanceShown == true ? (
                  <BsEye className="text-xl"></BsEye>
                ) : (
                  <BsEyeSlash className="text-xl"></BsEyeSlash>
                )}
              </button>
            </div>
            <div className="flex flex-row justify-between items-center w-full">
              <h3 className="text-4xl text-gray-50 text-left ml-5">
                {balanceShown == true ? "₦1200" : "***"}
              </h3>
              <Link to={'/add'} className="bg-gray-50 h-7 w-36 md:w-36 rounded-2xl font-light text-sm flex flex-row items-center justify-center text-blue-500 mr-5">
                {" "}
                <BiPlus></BiPlus> Add expenses
              </Link>
            </div>
          </div>

          {data.length == 0 ? (
            <div className="bg-gray-200 rounded-2xl h-36 bg-opacity-50 w-11/12 mx-auto flex justify-center items-center hover:bg-gray-300 px-2 gap-x-2 active:bg-gray-300">
              <h3 className="text-gray-500">No data to display chart.</h3>
            </div>
          ) : (
            <div className="flex flex-row w-full md:w-11/12">
              <div className="w-11/12 h-48 my-10 md:h-64 md:w-1/2">
                <ResponsivePie
                  data={data}
                  arcLinkLabelsStraightLength={10}
                  arcLinkLabelsDiagonalLength={10}
                  colors={colors}
                  arcLabelsTextColor={"#ffffff"}
                />
              </div>
              <div className="w-11/12 h-48 my-10 md:h-64 md:w-1/2 hidden md:flex">
                <ResponsiveBar
                  data={data}
                  keys={["value"]} // Replace with the actual keys from your data
                  indexBy="label" // Replace with the key you want to use as labels
                  margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
                  padding={0.3}
                  colors={colors}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "spending", // Customize as needed
                    legendPosition: "middle",
                    legendOffset: 32,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Value", // Customize as needed
                    legendPosition: "middle",
                    legendOffset: -40,
                  }}
                  enableLabel={true} // Enable labels on the bars if needed
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                />
              </div>
            </div>
          )}
        </div>

        <div className="w-full md:w-11/12 flex flex-row justify-center items-center mt-10">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-center">
            <div className="flex flex-row justify-between px-3 w-full">
              <h3 className="text-gray-600 text-2xl font-bold my-3 text-left ml-3 md:text-4xl">
                Recent expenses
              </h3>
              <Link
                to="/history"
                className="text-blue-500 text-sm flex flex-row items-center justify-center"
              >
                View all <CgArrowRight></CgArrowRight>
              </Link>
            </div>
            <div className="flex flex-col gap-y-2 w-full">
              {
                history.map((element: any, index: any) => {
                  return (
                    <HistoryCard
                    key={index}
                      amount={element.amount}
                      date={element.date}
                      title={element.title}
                      for={element.group}
                    ></HistoryCard>
                  )
                })
              }
            </div>
          </div>


          <div className="flex-col w-full md:w-2/5 justify-center items-center hidden md:flex">
            {/* content */}
          </div>
        </div>
      </div>

      <Dashboard></Dashboard>
    </>
  );
};

export default Home;
