import { useState } from "react";
import EditCellModal from "./editCellModal";

const periods = ["Period_1", "Period_2", "Period_3", "Period_4"];
const periodLabels = ["8–10", "10–12", "12–2", "2–4"];

export default function TimetableEditable({ data, setData }) {
  const [selected, setSelected] = useState(null);

  const handleCellClick = (dayIndex, periodKey) => {
    const cell = data[dayIndex].periods[periodKey] || {
      course: "",
      venue: "",
      lecturer: ""
    };
    setSelected({ dayIndex, periodKey, ...cell });
  };

  const updateCell = (updated) => {
    setData((prev) => {
      const newData = [...prev];
      newData[updated.dayIndex].periods[updated.periodKey] = {
        course: updated.course,
        venue: updated.venue,
        lecturer: updated.lecturer
      };
      return newData;
    });
    setSelected(null);
  };

  return (
    <>
      <div className="overflow-x-auto backdrop-blur-md mb-6">
        <table className="w-full border-collapse text-sm text-white">
          <thead>
            <tr className="bg-white/10 text-xs uppercase tracking-wider text-gray-200">
              <th className="border border-white/10 text-center p-3 min-w-[100px]">Day</th>
              {periodLabels.map((label, idx) => (
                <th key={idx} className="border  border-white/10 p-3 min-w-[100px] text-center">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-white/5 transition">
                <td className="border border-white/10 p-3 text-center font-bold text-cyan-300">
                  {row.day}
                </td>
                {periods.map((key) => {
                  const cell = row.periods[key] || { course: "", venue: "", lecturer: "" };
                  return (
                    <td
                      key={key}
                      onClick={() => handleCellClick(i, key)}
                      className="border border-white/10 p-3 cursor-pointer hover:bg-cyan-700/30 transition"
                      title={`${cell.course} | ${cell.venue} | ${cell.lecturer}`}
                    >
                      <div className="text-center text-xs space-y-1">
                        <div className="text-gray-300">{cell.course || <span className="text-gray-400">—</span>}</div>
                        <div className="text-cyan-300 font-semibold">{cell.venue || <span className="text-gray-400">—</span>}</div>
                        <div className="text-gray-300">{cell.lecturer || <span className="text-gray-400">—</span>}</div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <EditCellModal
          data={selected}
          onSave={updateCell}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
