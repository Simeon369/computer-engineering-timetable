import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Timetable from '../components/timetable';
import { MdOutlineFileDownload } from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";



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

const handleDownload = () => {
  const timetableNode = document.getElementById("timetable");

  if (!timetableNode) {
    alert("Timetable not found.");
    return;
  }

  // Save original styles
  const originalWidth = timetableNode.style.width;
  const originalHeight = timetableNode.style.height;
  const originalOverflow = timetableNode.style.overflow;

  // Force full size
  timetableNode.style.width = timetableNode.scrollWidth + "px";
  timetableNode.style.height = timetableNode.scrollHeight + "px";
  timetableNode.style.overflow = "visible";

  // Wait for styles to apply before capturing
  setTimeout(() => {
    toPng(timetableNode, { cacheBust: true })
      .then((dataUrl) => {
        const pdf = new jsPDF("landscape", "pt", "a4");
        const img = new Image();
        img.src = dataUrl;

        img.onload = () => {
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (img.height * pdfWidth) / img.width;

          pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
          pdf.save(`${classId}-timetable.pdf`);

          // Restore original styles
          timetableNode.style.width = originalWidth;
          timetableNode.style.height = originalHeight;
          timetableNode.style.overflow = originalOverflow;
        };
      })
      .catch((err) => {
        console.error("Error generating PDF", err);
        timetableNode.style.width = originalWidth;
        timetableNode.style.height = originalHeight;
        timetableNode.style.overflow = originalOverflow;
      });
  }, 100); // Add small delay to ensure DOM has re-rendered
};
  

  useEffect(() => {
    import(`../data/${classId}.json`)
      .then(module => setData(module.default))
      .catch(err => console.error("Failed to load data:", err));
  }, [classId]);

  return (
    <div className="p-4" id='timetable'>
      <nav className='px-4 flex items-center'>
        <h2 className="text-xl font-bold">
          {classId.toUpperCase()} Computer Engineering Timetable
        </h2>

        <div className='flex ml-auto gap-5'>

          <div
           onClick={handleDownload}
           className='text-4xl p-2 rounded-full hover:text-blue-500 '
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
