import { useState } from "react";

export default function EditCellModal({ data, onSave, onClose }) {
  const [course, setCourse] = useState(data.course || "");
  const [venue, setVenue] = useState(data.venue || "");
  const [lecturer, setLecturer] = useState(data.lecturer || "");

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white/10 border border-white/20 text-white p-6 rounded-xl shadow-2xl w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-cyan-300 text-center">
          Edit Period
        </h2>

        <div className="space-y-4">
          <input
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Course"
            className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 p-2 rounded outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            placeholder="Venue"
            className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 p-2 rounded outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            value={lecturer}
            onChange={(e) => setLecturer(e.target.value)}
            placeholder="Lecturer"
            className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 p-2 rounded outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-white/10 border border-white/20 text-gray-300 hover:bg-red-600/30 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              onSave({
                ...data,
                course,
                venue,
                lecturer,
              })
            }
            className="px-4 py-2 rounded bg-cyan-600 hover:bg-cyan-500 text-white transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
