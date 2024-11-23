import { CiCalendar } from "react-icons/ci";
import Dashboard from "../components/Dashboard";
import HistoryCard from "../components/HistoryCard";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [events, setEvents] = useState([
    { title: "Bill Payment", date: "2024-11-10" },
    { title: "Salary Received", date: "2024-11-25" },
    // Add more finance events here
  ]);
  const [history, setHistory] = useState<{}[]>([]);
  const navigate = useNavigate();

  var date = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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
        setHistory(res.data.expenses);
        setEvents(res.data.expenses);
      } else {
        navigate('/dashboard');
        let res = await response.json();
        toast.error(res.error);
      }
    }

    load();
  },[]);

  return (
   <div className="flex flex-col fixed top-0 bottom-16 left-0 right-0 w-full bg-gray-50 overflow-y-auto md:bottom-0 md:w-screen md:overflow-x-hidden">
      <h3 className="text-3xl ml-5 my-5 text-gray-700 text-left md:ml-10 w-screen md:text-4xl">History</h3>

      <div className="flex flex-row">
        {(showCalendar || screen.width > 768) && (
            <>
              <div
                className="fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-gray-900 bg-opacity-70 md:static md:bg-transparent md:items-start md:pt-24 md:w-2/5 lg:w-1/3 h-full"
                onClick={() => {
                  setShowCalendar(false);
                }}
              >
                <div className="p-5 bg-gray-50 rounded-2xl h-full md:w-4/5">
                  <FullCalendar
                    plugins={[
                      dayGridPlugin,
                      timeGridPlugin,
                      interactionPlugin,
                      bootstrapPlugin,
                    ]}
                    initialView="dayGridMonth"
                    events={events}
                    editable={true} // allows drag-and-drop for events
                    selectable={true} // allows selection of dates
                    dateClick={(info: any) => alert(`Date: ${info.dateStr}`)}
                    dayCellClassNames={`border-0 flex items-center justify-center bg-gray-50 w-1/5 m-1 text-center `}
                    eventClassNames={`bg-blue-600 p-2 rounded-xl w-fit`}
                    dayHeaderClassNames={`border-0 text-gray-600 bg-transparent`}
                    nowIndicatorClassNames={`text-gray-900`}
                    viewClassNames={`flex flex-row flex-wrap text-gray-900`}
                    allDayClassNames={`flex justify-center items-center text-gray-700`}
                    moreLinkClassNames={`rounded-full p-5 m-2`}
                    slotLaneClassNames={`flex flex-row`}
                    slotLabelClassNames={`text-gray-900`}
                    weekNumberClassNames={`text-gray-700`}
                  />
                </div>
              </div>
            </>
          )}


        <div className="flex flex-col bg-gray-50 w-full md:w-3/5 lg:1/3">
          <div className="w-full flex flex-row h-16 bg-gray-50">
            <select
              id=""
              className="w-1/2 text-gray-600 font-light h-full bg-gray-50 px-4"
            >
              <option
                value="all"
                className="h-12 font-light text-gray-500 rounded-none bg-gray-50"
              >
                All Categories
              </option>
            </select>
            <select
              id=""
              className="w-1/2 text-gray-600 font-light h-full bg-gray-50 px-4"
            >
              <option value="all">All Categories</option>
            </select>
          </div>

          <button
            className="flex flex-row gap-x-2 my-3 w-11/12 mx-auto bg-transparent"
            onClick={() => {
              setShowCalendar(true);
            }}
          >
            <CiCalendar className="text-blue-500 text-2xl"></CiCalendar>
            <h3 className="text-gray-700 font-light">
              {months[date.getMonth()]}
            </h3>
          </button>

          <div className="flex flex-col w-full gap-y-2">
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
      </div>

      <Dashboard></Dashboard>
   </div>
  );
};

export default History;
