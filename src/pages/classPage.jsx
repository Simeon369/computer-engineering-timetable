import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Timetable from '../components/timetable';
import { MdOutlineFileDownload } from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import { client } from "../lib/sanity";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";



export default function classPage() {
  const { classId } = useParams();
  const [data, setData] = useState([]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        alert("Failed to copy URL.");
        console.error(err);
      });
  }

const exportToExcel = (timetableData, classId) => {
  const rows = [];

  timetableData.forEach((row) => {
    const newRow = {
      Day: row.day || "",
      "8 – 10": formatPeriod(row?.periods?.Period_1),
      "10 – 12": formatPeriod(row?.periods?.Period_2),
      "12 – 2": formatPeriod(row?.periods?.Period_3),
      "2 – 4": formatPeriod(row?.periods?.Period_4),
    };
    rows.push(newRow);
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Timetable");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, `${classId}_timetable.xlsx`);
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
        <h2 className="text-xl font-bold">
          {classId.toUpperCase()} Computer Engineering Timetable
        </h2>

        <div className='flex ml-auto gap-5'>

          <div
           onClick={() => exportToExcel(data, classId)}
           className='text-4xl hidden p-2 rounded-full hover:text-blue-500 '
          >
            <MdOutlineFileDownload />
          </div>
          <div
          onClick={handleCopy}
          className='text-4xl p-2 rounded-full hover:text-blue-500 '>
            <FiCopy />
          </div>

        </div>
      </nav>
      
      <Timetable data={data} />
    </div>
  );
}
