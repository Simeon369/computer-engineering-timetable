import React from 'react';

const Timetable = ({ data }) => {
  return (
    <div className="w-full overflow-scroll border-white/10">
        <table className="overflow-x-scroll text-sm text-gray-800">
          <thead className=''>
            <tr className="bg-white/10 text-white text-xs uppercase tracking-wide">
              <th className="border border-white/10 py-3 px-2 text-center  min-w-[100px]">Day</th>
              <th className="border border-white/10 py-3 px-2  min-w-[100px]">8 – 10</th>
              <th className="border border-white/10 py-3 px-2  min-w-[100px]">10 – 12</th>
              <th className="border border-white/10 py-3 px-2  min-w-[100px]">12 – 2</th>
              <th className="border border-white/10 py-3 px-2  min-w-[100px]">2 – 4</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className=""
              >
                <td className="border border-white/10 py-2 px-3 font-semibold text-cyan-300 text-center">
                  {row.day}
                </td>
                {[1, 2, 3, 4].map((p) => {
                  const period = row[`period_${p}`];
                  return (
                    <td
                      key={p}
                      className="border border-white/10 p-3 text-center whitespace-pre-wrap text-xs leading-snug"
                    >
                      <div className="text-gray-300">{period.course}</div>
                      <div className="font-bold text-cyan-300">{period.venue}</div>
                      <div className="text-gray-300">{period.lecturer}</div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
};

export default Timetable;
