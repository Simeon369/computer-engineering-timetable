// pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { client } from "../../lib/sanity";
import { useNavigate } from "react-router-dom";
import { FaTools } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { useAuth } from "../../authContext"
import { MdLogout } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

export default function AdminDashboard() {
  const [classes, setClasses] = useState([]);
  const [newClassId, setNewClassId] = useState("");
  const [newClassRep, setNewClassRep] = useState("")
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useAuth();

  const handleLogout = () => {
    setLoggedIn(false); // 🔁 Triggers useEffect below
    localStorage.removeItem("loggedIn"); // optional
  };

  // 🔁 When loggedIn becomes false, redirect
  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn]);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const query = `*[_type == "timetable"]{_id, classId}`;
      const result = await client.fetch(query);
      const unique = [];
      const seen = new Set();
    

      for (const item of result) {
        if (!seen.has(item.classId)) {
          unique.push(item);
          seen.add(item.classId);
        }
      }

      setClasses(unique);
      
    } catch (err) {
      console.error("Failed to fetch classes:", err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newClassId.trim()) return alert("Please enter a class ID");
    if(newClassRep === ('') || !(/^234[0-9]{10}$/.test(newClassRep)) ) return alert("Please enter a class rep's number")

    setLoading(true);
    const emptySlot = { course: "", venue: "", lecturer: "" };

    const newDoc = {
      _id: `timetable-${newClassId}`,
      classRepNumber: newClassRep,
      _type: "timetable",
      classId: newClassId,
      monday: { period_1: emptySlot, period_2: emptySlot, period_3: emptySlot, period_4: emptySlot },
      tuesday: { period_1: emptySlot, period_2: emptySlot, period_3: emptySlot, period_4: emptySlot },
      wednesday: { period_1: emptySlot, period_2: emptySlot, period_3: emptySlot, period_4: emptySlot },
      thursday: { period_1: emptySlot, period_2: emptySlot, period_3: emptySlot, period_4: emptySlot },
      friday: { period_1: emptySlot, period_2: emptySlot, period_3: emptySlot, period_4: emptySlot },
    };

    try {
      //check if classId already exists
      const query = `*[_type == "timetable" && classId == $classId][0]`
      const existing = await client.fetch(query, {classId: newClassId})
      

      if(existing){
        alert('Class Id already exists');
        return
      }
      



      await client.createIfNotExists(newDoc);
      alert("Timetable created successfully.");
      setNewClassId("");
      setShowForm(false);
      fetchClasses();
    } catch (err) {
      console.error("Error creating timetable:", err);
      alert("Failed to create timetable.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this timetable?")) return;

    try {
      await client.delete(id);
      alert("Timetable deleted.");
      fetchClasses();
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Failed to delete timetable.");
    }
  };

  return (
    <div className="  font-sans">
      <div className="flex flex-col items-right  p-8">
        <div className="flex items-center gap-3 w-[100%] mb-6">
          <h1 className="text-xl md:text-3xl font-bold text-center flex justify-start items-center gap-4 tracking-wide "><FaTools className="text-cyan-300" /> Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-2xl ml-auto font-bold flex flex-col items-center hover:bg-cyan-400"
          >
            <MdLogout />
            
          </button>
          <button
            
            className="text-2xl flex font-bold flex-col items-center hover:bg-cyan-400"
          >
            <IoMdSettings />
            
          </button>
        </div>

        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500  hover:bg-blue-600 transition-all flex items-center gap-2 duration-300 text-white px-5 py-2 rounded-lg shadow"
          >
            <CiCirclePlus className="font-extrabold text-lg" /> New Timetable
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleCreate} className="bg-white/10 border border-white/20 p-6 rounded-xl mb-6">
            <label className="block mb-2 font-semibold text-gray-200">Class ID</label>
            <input
              type="text"
              value={newClassId}
              onChange={(e) => setNewClassId(e.target.value)}
              placeholder="e.g. nd1, hnd2"
              className="bg-white/10 border border-white/20 text-white placeholder-gray-400 p-2 w-full rounded mb-4 outline-none"
            />
            <label className="block mb-2 font-semibold text-gray-200">Class Rep Phone Number</label>
            <input
              type="text"
              value={newClassRep}
              onChange={(e) => setNewClassRep(e.target.value)}
              placeholder="2348012345678"
              className="bg-white/10 border border-white/20 text-white placeholder-gray-400 p-2 w-full rounded mb-4 outline-none"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 transition px-4 py-2 rounded text-white"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Timetable"}
            </button>
          </form>
        )}

        <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-4"><FaBookmark className="text-cyan-300" /> Existing Classes</h2>
        <ul className="space-y-4">
          {classes.map(({ classId, _id }) => (
            <li
              key={_id}
              className="flex justify-between items-center w-[100%] bg-white/5 border border-white/10 p-4 rounded-xl shadow backdrop-blur-sm"
            >
              <button
                className="text-cyan-300 hover:text-cyan-100 transition text-lg font-medium"
                onClick={() => navigate(`/admin/view/${classId}`)}
              >
                {classId.toUpperCase()}
              </button>
              <button
                onClick={() => handleDelete(_id)}
                className="text-red-500 hover:text-red-400  px-4 py-1 rounded text-xl transition"
              >
                <FaTrashAlt />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
