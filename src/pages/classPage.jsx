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

  // Store original styles
  const originalStyle = {
    width: node.style.width,
    height: node.style.height,
    overflow: node.style.overflow,
  };

  // Force element to show full content
  node.style.width = node.scrollWidth + "px";
  node.style.height = node.scrollHeight + "px";
  node.style.overflow = "visible";

  // Wait for DOM to reflow
  setTimeout(() => {
    // Higher pixel ratio to increase quality
    toPng(node, {
      cacheBust: true,
      pixelRatio: 2, // this boosts quality
    })
      .then((dataUrl) => {
        const img = new Image();
        img.src = dataUrl;

        img.onload = () => {
          const pdf = new jsPDF("landscape", "pt", "a4");

          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();

          const imgWidth = img.width;
          const imgHeight = img.height;

          // Scale image to fit inside PDF
          let scaledWidth = pdfWidth;
          let scaledHeight = (imgHeight * pdfWidth) / imgWidth;

          // If image is too tall, shrink to fit height
          if (scaledHeight > pdfHeight) {
            scaledHeight = pdfHeight;
            scaledWidth = (imgWidth * pdfHeight) / imgHeight;
          }

          // Center the image on the page
          const x = (pdfWidth - scaledWidth) / 2;
          const y = (pdfHeight - scaledHeight) / 2;

          pdf.addImage(dataUrl, "PNG", x, y, scaledWidth, scaledHeight);
          pdf.save(`${classId}-timetable.pdf`);

          // Restore original styles
          Object.assign(node.style, originalStyle);
        };
      })
      .catch((err) => {
        console.error("Error generating PDF", err);
        Object.assign(node.style, originalStyle);
      });
  }, 100);
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
