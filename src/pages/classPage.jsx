import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Timetable from '../components/timetable';
import { MdOutlineFileDownload } from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import { toast } from 'react-toastify';
import { FaArrowLeft } from "react-icons/fa";
import { client } from "../lib/sanity";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // This registers the plugin onto jsPDF



export default function classPage() {
  const { classId } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate()

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy URL.");
        console.error(err);
      });
  }

const downloadTable = () => {
  const pdf = new jsPDF();
  autoTable(pdf, { html: '#table', theme: 'grid' }); // Pulls table directly from the DOM
  pdf.save(`${classId}_timetable.pdf`);
};

// Helper function to format each period
const formatPeriod = (period) => {
  if (!period) return "";
  const { course = "", venue = "", lecturer = "" } = period;
  return `${course}${venue ? " @ " + venue : ""}${lecturer ? " - " + lecturer : ""}`;
};
  

useEffect(() => {
  const fetchData = async () => {
    try {
      const query = `*[_type == "timetable" && classId == $classId][0]{
        monday,
        tuesday,
        wednesday,
        thursday,
        friday
      }`;

      const result = await client.fetch(query, { classId });

      if (!result) {
        setData([]);
        return;
      }

      // Convert object to array for easier rendering
      const structuredData = [
        { day: "MON", ...result.monday },
        { day: "TUE", ...result.tuesday },
        { day: "WED", ...result.wednesday },
        { day: "THUR", ...result.thursday },
        { day: "FRI", ...result.friday },
      ];

      setData(structuredData);
      console.log(structuredData);
      
    } catch (err) {
      console.error("Failed to fetch timetable:", err);
    }
  };

  fetchData();
}, [classId]);


  return (
    <div className="p-4 " id='timetable'>
      <nav className='px-4 flex items-center text-white/80 mb-10'>
      <div onClick={()=>navigate("/")} className='mr-6 w-[50px] h-[50px] flex justify-center items-center'>
        <FaArrowLeft />
      </div>
        
        <h2 className="text-xl font-bold">
          {classId.toUpperCase()} Computer Engineering Timetable
        </h2>

        <div className='flex ml-auto gap-5'>

          <div
           onClick={() => downloadTable()}
           className='text-2xl md:text-4xl  p-1 md:p-2 rounded-full hover:text-blue-500 '
          >
            <MdOutlineFileDownload />
          </div>
          <div
          onClick={handleCopy}
          className='text-2xl md:text-4xl  p-1 md:p-2 rounded-full hover:text-blue-500 '>
            <FiCopy />
          </div>

        </div>
      </nav>
      
      <Timetable data={data} />
    </div>
  );
}
