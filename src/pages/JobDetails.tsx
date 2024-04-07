import { useEffect, useState } from "react";
import { JobAttributes } from "../interface/interface";
import { getJobData } from "../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import "./../css/stringParser.css";

const JobDetails = () => {
  const defaultJobData: JobAttributes = {
    id: "",
    type: "",
    url: "",
    created_at: "",
    company: "",
    company_url: "",
    location: "",
    title: "",
    description: "",
    how_to_apply: "",
  };
  const [jobdata, setJobData] = useState<JobAttributes>(defaultJobData);
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = sessionStorage.getItem("jwtToken");
    if (!jwtToken) {
      navigate("/login");
      return; // Exit early if token doesn't exist
    }

    const getDetail = async (id: string) => {
      try {
        const res = await getJobData(id);
        console.log(res);
        if (res.status === 200) {
          setJobData(res.data);
        } else {
          alert("error occured");
          navigate("/login"); // Navigate to the "/login" route if jwtToken doesn't exist
          return;
        }
      } catch (error) {
        alert("session expired" + error);
        navigate("/login"); // Navigate
      }
    };

    if (id) {
      getDetail(id);
    }
  }, [id, navigate]); 

  return (
    <div className="py-6">
      <div className="container mx-auto">
        <a className="text-blue-500 hover:underline" href="/">
          back
        </a>
        <div className="border-4 p-5 mt-2">
          <span className="text-gray-600 font-medium">
            {jobdata.location} / {jobdata.type}
          </span>
          <h1 className="text-3xl font-bold">{jobdata.title}</h1>
          <div className="border-t-2 my-8 py-3 grid grid-cols-3 gap-x-8">
            <div
              className="col-span-2 text-justify"
              dangerouslySetInnerHTML={{ __html: jobdata.description }}
            ></div>
            <div className="w-full">
              <div className="w-full border-4 p-5 rounded h-fit">
                <span>{jobdata.company}</span>
                <div className="border-t">
                  <img
                    src="/dans-logo.png"
                    alt="company logo"
                    className="w-full py-6"
                  />
                  <a href={jobdata.company_url}>{jobdata.company_url}</a>
                </div>
              </div>
              <div className="w-full border-4 p-5 rounded h-fit mt-6">
                <span>How to apply?</span>
                <div className="border-t">
                  <p
                    dangerouslySetInnerHTML={{ __html: jobdata.how_to_apply }}
                  ></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
