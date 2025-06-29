// pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { client } from "../../lib/sanity";
import { useNavigate } from "react-router-dom";
import { FaTools } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

export default function AdminDashboard() {
  const [classes, setClasses] = useState([]);
  const [newClassId, setNewClassId] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

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

    setLoading(true);
    const emptySlot = { course: "", venue: "", lecturer: "" };

    const newDoc = {
      _id: `timetable-${newClassId}`,
      _type: "timetable",
      classId: newClassId,
      monday: { period_1: emptySlot, period_2: emptySlot, period_3: emptySlot, period_4: emptySlot },
      tuesday: { period_1: emptySlot, period_2: emptySlot, period_3: emptySlot, period_4: emptySlot },
      wednesday: { period_1: emptySlot, period_2: emptySlot, period_3: emptySlot, period_4: emptySlot },
      thursday: { period_1: emptySlot, period_2: emptySlot, period_3: emptySlot, period_4: emptySlot },
      friday: { period_1: emptySlot, period_2: emptySlot, period_3: emptySlot, period_4: emptySlot },
    };

    try {
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
      <div className="flex flex-col items-center  p-8">
        <h1 className="text-3xl font-bold mb-6 text-center flex items-center gap-4 tracking-wide"><FaTools className="text-cyan-300" /> Admin Dashboard</h1>

        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-500  hover:bg-blue-600 transition-all duration-300 text-white px-5 py-2 rounded-lg shadow"
          >
            + New Timetable
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
              className="flex justify-between items-center w-[80vw] bg-white/5 border border-white/10 p-4 rounded-xl shadow backdrop-blur-sm"
            >
              <button
                className="text-cyan-300 hover:text-cyan-100 transition text-lg font-medium"
                onClick={() => navigate(`/admin/view/${classId}`)}
              >
                {classId.toUpperCase()}
              </button>
              <button
                onClick={() => handleDelete(_id)}
                className="text-red-600 hover:text-red-700  px-4 py-1 rounded text-2xl transition"
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
