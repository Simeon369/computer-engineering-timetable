import { Link } from 'react-router-dom';
import { client } from "../lib/sanity";
import { useEffect, useState } from "react";

export default function Home() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const query = `*[_type == "timetable"]{ classId }`;
        const result = await client.fetch(query);

        const uniqueClasses = [...new Set(result.map(item => item.classId))];
        setClasses(uniqueClasses);
      } catch (err) {
        console.error("Failed to load class list:", err);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className=" flex flex-col items-center justify-center px-6 py-10">
      <h1 className="text-4xl font-extrabold text-white/80 mb-8 tracking-tight">
        Select a Class
      </h1>

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
