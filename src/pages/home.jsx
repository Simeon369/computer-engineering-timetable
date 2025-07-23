import { Link } from "react-router-dom";
import { client } from "../lib/sanity";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdAdminPanelSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const query = `*[_type == "timetable"]{ classId }`;
        const result = await client.fetch(query);

        const uniqueClasses = [...new Set(result.map((item) => item.classId))];
        setClasses(uniqueClasses);
      } catch (err) {
        toast.error("Failed to load class list:", err);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className=" flex flex-col items-center justify-center px-6 py-10">
      <div className="relative flex w-full justify-center items-center mb-8">
        <h1 className="text-4xl font-extrabold text-white/80 tracking-tight">
          Select a Class
        </h1>
        <div onClick={()=>navigate('/admin')} className="absolute right-0 text-3xl p-2 hover:text-cyan-400">
          <MdAdminPanelSettings />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-md">
        {classes.length > 0 ? (
          classes.map((id) => (
            <Link
              key={id}
              to={`/class/${id}`}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl shadow-md text-lg font-semibold text-center transition-all duration-300"
            >
              {id.toUpperCase()}
            </Link>
          ))
        ) : (
          <div className="text-gray-500 col-span-full text-center">
            Loading classes...
          </div>
        )}
      </div>
    </div>
  );
}
