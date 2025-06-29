import { client } from "../lib/sanity";

const fetchTimetable = async (classId) => {
  const query = `*[_type == "timetable" && classId == $classId]{
    day,
    periods
  }`;
  const data = await client.fetch(query, { classId });
  return data;
};
