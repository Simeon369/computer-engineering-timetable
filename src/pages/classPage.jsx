import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Timetable from '../components/timetable';

export default function classPage() {
  const { classId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    import(`../data/${classId}.json`)
      .then(module => setData(module.default))
      .catch(err => console.error("Failed to load data:", err));
  }, [classId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-center mb-4">
        {classId.toUpperCase()} Computer Engineering Timetable
      </h2>
      <Timetable data={data} />
    </div>
  );
}
