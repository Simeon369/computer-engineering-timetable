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
  const node = document.getElementById("timetable");

  if (!node) {
    alert("Timetable not found.");
    return;
  }

  toPng(node, { cacheBust: true })
    .then((dataUrl) => {
      const pdf = new jsPDF("potrait", "pt", "a4");
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("timetable.pdf");
    })
    .catch((err) => {
      console.error("Failed to export PDF", err);
    });
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
