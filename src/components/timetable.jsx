import React from 'react'


const timetable = ({ data }) => {
  return (
    <div className="p-4 overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-100 text-xs">
          <tr>
            <th className="border p-2">Day</th>
            <th className="border p-2">8 – 10</th>
            <th className="border p-2">10 – 12</th>
            <th className="border p-2">12 – 2</th>
            <th className="border p-2">2 – 4</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="border p-2 text-center">{row.day}</td>
              <td className="border p-2 ">
                <div className='text-center text-xs'>
                    <div>{row.Period_1.course}</div>
                    <div className='font-bold'>{row.Period_1.venue}</div>
                    <div>{row.Period_1.lecturer}</div>
                </div>
              </td>
              <td className="border p-2 whitespace-pre-wrap">
                <div className='text-center text-xs'>
                    <div>{row.Period_2.course}</div>
                    <div className='font-bold'>{row.Period_2.venue}</div>
                    <div>{row.Period_2.lecturer}</div>
                </div>
              </td>
              <td className="border p-2 whitespace-pre-wrap">
                <div className='text-center text-xs'>
                    <div>{row.Period_3.course}</div>
                    <div className='font-bold'>{row.Period_3.venue}</div>
                    <div>{row.Period_3.lecturer}</div>
                </div>
              </td>
              <td className="border p-2 whitespace-pre-wrap">
                <div className='text-center text-xs'>
                    <div>{row.Period_4.course}</div>
                    <div className='font-bold'>{row.Period_4.venue}</div>
                    <div>{row.Period_4.lecturer}</div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default timetable
