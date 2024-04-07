import { stringifyCreated } from "../utils/utils";
import { FaLocationDot } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { JobCardprops } from "../interface/interface";
import { useNavigate } from "react-router-dom";

const JobCard = ({
  id,
  logo,
  title,
  company,
  location,
  type,
  created_at,
}: JobCardprops) => {
  const navigate = useNavigate();
  const goToDetails = (id: string) => {
    navigate("/jobdetails/" + id);
  };

  return (
    <button onClick={() => goToDetails(id)}>
      <div className="group w-full h-auto border rounded-md shadow hover:shadow-lg">
        <div className="p-5 ">
          <div className="grid grid-cols-3 pb-3 place-items-center gap-x-6">
            <div className="px-1 w-36 h-28 border rounded-lg grid place-items-center">
              <img src={logo} alt="company logo" />
            </div>
            <div className="col-span-2">
              <p className="text-left text-[#427FBE] font-bold text-xl group-hover:underline">
                {title}
              </p>
              <p className="text-left text-sm text-gray-700">{company}</p>
            </div>
          </div>
          <div className="grid gap-y-2 text-gray-500">
            <div className="flex items-center">
              <FaLocationDot className="mr-3" />
              <span>{location}</span>
            </div>
            <div className="flex items-center">
              <MdWork className="mr-3" />
              <span>{type}</span>
            </div>
            <div className="flex items-center">
              <FaSearch className="mr-3" />
              <span>Open for recruitement</span>
            </div>
          </div>
        </div>
        <div className="w-full text-sm bg-gray-100 rounded-b-md py-1 px-5 text-gray-500">
          created at {stringifyCreated(created_at)}
        </div>
      </div>
    </button>
  );
};

export default JobCard;
