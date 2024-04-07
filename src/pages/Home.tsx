import { FormEvent, useEffect, useState } from "react";
import { getAllJobs, searchJobs } from "../utils/api";
import { JobAttributes } from "../interface/interface";
import JobCard from "../components/JobCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [joblist, setJobList] = useState<JobAttributes[]>([]);
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [isFulltime, setisFullTime] = useState(false);

  const filterJobs = async (query: any) => {
    const jwtToken = sessionStorage.getItem("jwtToken");
    if (!jwtToken) {
      navigate("/login"); // Navigate to the "/login" route if jwtToken doesn't exist
      return;
    }
    try {
      const queryParams = new URLSearchParams();
      if (desc) {
        queryParams.append("description", desc);
      }
      if (location) {
        queryParams.append("location", location);
      }
      if (isFulltime) {
        queryParams.append("type", "full time");
      } else {
        queryParams.append("type", "");
      }
      const res = await searchJobs(query);
      console.log(res);
      if (res.status === 200) {
        setJobList(res.data);
      } else {
        navigate("/login"); // Navigate to the "/login" route if jwtToken doesn't exist
        return;
      }
    } catch (error) {
      console.error("Error happened in:", error);
      alert("Session expired: " + error);
      navigate("/login"); // Navigate to the "/login" route if jwtToken doesn't exist
    }
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const query = {
      desc,
      location,
      fullTime: isFulltime ? "full time" : "",
    };
    filterJobs(query);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const loadJobs = async () => {
      const jwtToken = sessionStorage.getItem("jwtToken");
      if (!jwtToken) {
        navigate("/login"); // Navigate to the "/login" route if jwtToken doesn't exist
        return;
      }
      try {
        const res = await getAllJobs();
        console.log(res);
        if (res.status === 200) {
          setJobList(res.data);
        } else {
          navigate("/login"); // Navigate to the "/login" route if jwtToken doesn't exist
          return;
        }
      } catch (error) {
        console.error("Error happened in:", error);
        alert("Session expired: " + error);
        navigate("/login"); // Navigate to the "/login" route if jwtToken doesn't exist
      }
    };
    loadJobs();
  }, [navigate]);

  return (
    <div className="w-full">
      <div className="container mx-auto ">
        <form
          onSubmit={handleSubmit}
          className="w-full grid grid-cols-6 gap-x-6 place-items-center pt-6"
        >
          <input
            type="text"
            placeholder="Search by desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 mr-2 w-full col-span-2"
          />
          <input
            type="text"
            placeholder="Search by location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 mr-2 w-full col-span-2"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isFulltime}
              onChange={(e) => setisFullTime(e.target.checked)}
              className="form-checkbox border-gray-300 rounded-md"
            />

            <span className="text-sm">Full-time only</span>
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
          >
            Search
          </button>
        </form>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-2 my-6">
          {joblist.map((item, index) => (
            <JobCard
              key={index}
              id={item.id}
              logo="/dans-logo.png"
              title={item.title}
              company={item.company}
              location={item.location}
              type={item.type}
              created_at={item.created_at}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
