import React from "react";
import { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { useNavigate } from "react-router-dom";




const EmployerDash = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const navigate = useNavigate();

  const onHandleClick = () => {
    navigate("/dashboard/employer/profile");
  }

  

  

  return (
    <div>
      <div>
        <ul className="flex font-semibold items-center gap-5 p-4 justify-end mr-5">
          <li className="hover:cursor-pointer hover:text-xl " >Home</li>
          <li className="hover:cursor-pointer hover:text-xl " >Jobs</li>
          <li className="hover:cursor-pointer hover:text-xl " onClick={onHandleClick}>Profile</li>
        </ul>
      </div>
      

      <div className="flex flex-col items-center px-24 justify-center">
        <div className=" w-full my-20 p-4">
          <div className="flex flex-row justify-between ">
            <input
              className="p-3 border-gray-800 border-1"
              placeholder="Filter by name"
            />
            <button
              onClick={() => navigate("/dashboard/employer/create")}
              className="w-[200px] bg-gray-800 text-white rounded-lg"
            >
              New Job
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center w-full ">
          <table className=" w-full text-center">
            <tr className="bg-slate-200 ">
              <th className="p-4">S.No</th>
              <th>CompanyName</th>
              <th>Joining-Date</th>
              <th>Action</th>
            </tr>
            <tr className="bg-white">
              <td className="p-4">1</td>
              <td>Google</td>
              <td>17-08-2001</td>
              <td>
                <div
                  className="cursor-pointer flex justify-center"
                  onClick={togglePopover}
                >
                  <FiAlignJustify />
                </div>

                {isPopoverOpen && (
                  <div className="absolute z-10 bg-white border border-gray-300 p-2 rounded shadow-lg mt-2">
                    <div className="text-gray-700 hover:bg-gray-100 p-2 block w-full text-left text-sm">
                      Edit
                    </div>
                  </div>
                )}
              </td>
            </tr>
            <tbody></tbody>
          </table>
          <div className="text-gray-500 mb-10 mt-5">
            A list of your recent registered companies
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDash;
