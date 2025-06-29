import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "../../lib/sanity";
import TimetableEditable from "../../components/timetableEditable";

export default function AdminEditClass() {
  const { classId } = useParams();
  const [data, setData] = useState([]);
  const [docId, setDocId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "timetable" && classId == $classId][0]{
          _id,
          monday,
          tuesday,
          wednesday,
          thursday,
          friday
        }`;

        const result = await client.fetch(query, { classId });

        if (!result) {
          const newDoc = await client.create({
            _type: "timetable",
            classId,
            monday: {},
            tuesday: {},
            wednesday: {},
            thursday: {},
            friday: {}
          });

          setDocId(newDoc._id);
          setData([
            { day: "MON", periods: {} },
            { day: "TUE", periods: {} },
            { day: "WED", periods: {} },
            { day: "THUR", periods: {} },
            { day: "FRI", periods: {} }
          ]);
          return;
        }

        setDocId(result._id);

        const structuredData = [
          { day: "MON", periods: result.monday || {} },
          { day: "TUE", periods: result.tuesday || {} },
          { day: "WED", periods: result.wednesday || {} },
          { day: "THUR", periods: result.thursday || {} },
          { day: "FRI", periods: result.friday || {} }
        ].map((row) => ({
          day: row.day,
          periods: {
            Period_1: row.periods?.period_1 || { course: "", venue: "", lecturer: "" },
            Period_2: row.periods?.period_2 || { course: "", venue: "", lecturer: "" },
            Period_3: row.periods?.period_3 || { course: "", venue: "", lecturer: "" },
            Period_4: row.periods?.period_4 || { course: "", venue: "", lecturer: "" },
          }
        }));

        setData(structuredData);
      } catch (err) {
        console.error("Failed to fetch timetable:", err.message || err);
      }
    };

    fetchData();
  }, [classId]);

  const handleSave = async () => {
    if (!docId) {
      alert("❌ Error: No document ID found for this class.");
      return;
    }

    try {
      const updated = {
        monday: {
          period_1: data[0]?.periods?.Period_1,
          period_2: data[0]?.periods?.Period_2,
          period_3: data[0]?.periods?.Period_3,
          period_4: data[0]?.periods?.Period_4
        },
        tuesday: {
          period_1: data[1]?.periods?.Period_1,
          period_2: data[1]?.periods?.Period_2,
          period_3: data[1]?.periods?.Period_3,
          period_4: data[1]?.periods?.Period_4
        },
        wednesday: {
          period_1: data[2]?.periods?.Period_1,
          period_2: data[2]?.periods?.Period_2,
          period_3: data[2]?.periods?.Period_3,
          period_4: data[2]?.periods?.Period_4
        },
        thursday: {
          period_1: data[3]?.periods?.Period_1,
          period_2: data[3]?.periods?.Period_2,
          period_3: data[3]?.periods?.Period_3,
          period_4: data[3]?.periods?.Period_4
        },
        friday: {
          period_1: data[4]?.periods?.Period_1,
          period_2: data[4]?.periods?.Period_2,
          period_3: data[4]?.periods?.Period_3,
          period_4: data[4]?.periods?.Period_4
        }
      };

      await client.patch(docId).set(updated).commit();
      alert("✅ Timetable updated successfully.");
    } catch (err) {
      console.error("❌ Error saving:", err.message || err);
      alert("❌ Error saving timetable.");
    }
  };

  return (
    <div className="max-w-[90vw] mx-auto  py-8">
      <div className="">
        <h1 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-6 text-center tracking-wide">
          EDIT TIMETABLE: <span className="">{classId.toUpperCase()}</span>
        </h1>

        <TimetableEditable data={data} setData={setData} />

        <div className="text-center mt-8">
          <button
            onClick={handleSave}
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-6 py-2 rounded shadow transition duration-200"
          >
            💾 Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
}
