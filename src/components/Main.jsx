import { useEffect, useState } from "react";

const Main = () => {
  const [participants, setParticipants] = useState(1);
  const [task, setTask] = useState("");
  const [type, setType] = useState();

  const getTask = async () => {
    try {
      let apiUrl = "http://www.boredapi.com/api/activity";

      if (type) {
        apiUrl += `?type=${type}`;
      }

      if (participants) {
        apiUrl += `${type ? "&" : "?"}participants=${participants}`;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();

      setTask(data.activity);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch initial task on component mount
    getTask();
  }, []);
  return (
    <div className=" min-h-[400px] pt-36 grid p-12 justify-center  mt-">
      <div className=" h-[300px] w-[300px] sm:w-[500px] rounded-sm grid justify-center">
        <div className="glass py-10">
          <h1 className="sm:min-w-[500px] px-4 text-lg sm:text-4xl text-center task">
            {task}
          </h1>
        </div>
        <div className="glass sm:h-[70px] bg-red-800 my-2 py-1">
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between mx-4">
            <div>
              <input
                placeholder="Particpants"
                className="my-2 h-10 rounded-md text-cyan-400 border-2 focus:outline-none border-cyan-400 w-24 text-center"
                type="number"
                name="participant"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
              />
            </div>

            <div>
              <select
                onChange={(e) => setType(e.target.value)}
                className="text-cyan-400 border-2 focus:outline-none border-cyan-400 cursor-pointer my-2 h-10 rounded-md font-semibold text-center px-2"
                name="select"
                id=""
              >
                <option className="" value="" selected disabled>
                  --Type--
                </option>
                <option className="" value="education">
                  Education
                </option>
                <option className="" value="recreational">
                  Recreational
                </option>
                <option className="" value="social">
                  Social
                </option>
                <option className="" value="diy">
                  Diy
                </option>
                <option className="" value="charity">
                  Charity
                </option>
                <option className="" value="relaxation">
                  Relaxation
                </option>
                <option className="" value="music">
                  Music
                </option>
                <option className="" value="busywork">
                  Busywork
                </option>
                <option className="" value="cooking">
                  Cooking
                </option>
              </select>
            </div>
            <div>
              <button
                onClick={getTask}
                className="my-1 font-sans font-bold text-white text-3xl   border-2 focus:outline-none border-cyan-400 hover:bg-cyan-400 h-12 px-4    active:scale-90 rounded-md transition-all "
              >
                Get a task!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
