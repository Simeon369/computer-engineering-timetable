import { Link } from 'react-router-dom';

export default function home() {
  const classes = ['nd1', 'nd2', 'hnd1', 'hnd2'];

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-6">Select a Class</h1>
      <div className="grid gap-4 justify-center">
        {classes.map(cls => (
          <Link
            to={`/class/${cls}`}
            key={cls}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
          >
            {cls.toUpperCase()}
          </Link>
        ))}
      </div>
    </div>
  );
}
