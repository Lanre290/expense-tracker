import { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import Dashboard from "../components/Dashboard";
import { ResponsiveBar } from '@nivo/bar';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Stat = () => {
  const [balanceShown, setBalanceShown] = useState<boolean>(true);
  const [colors, setColor] = useState<string[]>([]);

  const data_ = [
    { id: "JavaScript", label: "JavaScript", value: 55 },
    { id: "Python", label: "Python", value: 30 },
    { id: "Java", label: "Java", value: 15 },
  ];
  const navigate = useNavigate();

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
        setData(res.data.expensesData);
      } else {
        navigate('/dashboard');
        let res = await response.json();
        toast.error(res.error);
      }
    }

    load();
  },[]);


  return (
    <>
      <div className="flex flex-col fixed top-0 bottom-16 left-0 right-0 w-full bg-gray-50 overflow-y-auto md:bottom-0">
        <h3 className="text-gray-700 text-4xl ml-5 font-bold mt-12 md:text-5xl">
            Statistics
        </h3>
        <div className="flex flex-col w-full">
          {data.length == 0 ? (
            <div className="bg-gray-200 rounded-2xl h-36 bg-opacity-50 w-11/12 mx-auto flex justify-center items-center hover:bg-gray-300 px-2 gap-x-2 active:bg-gray-300">
              <h3 className="text-gray-500">No data to display chart.</h3>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row w-full md:w-11/12 mx-auto">
              <div className="w-11/12 h-48 my-10 md:h-64 md:w-1/2">
                <ResponsivePie
                  data={data}
                  arcLinkLabelsStraightLength={10}
                  arcLinkLabelsDiagonalLength={10}
                  colors={colors}
                  arcLabelsTextColor={"#ffffff"}
                />
              </div>
              <div className="w-11/12 h-48 my-10 md:h-64 md:w-1/2 flex mx-auto">
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
      </div>

      <Dashboard></Dashboard>
    </>
  );
};

export default Stat;
