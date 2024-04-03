import React from "react";

function AgencyPackageRoom({
  roomId,
  roomName,
  image,
  description,
  price,
  isSelected,
  onSelect,
  showCheckbox,
}) {
  const handleClick = () => {
    onSelect(roomId); // Call the onSelect function with the roomId when the room is clicked
  };

  return (
    <div>
      <div
        className={`mx-auto bg-white rounded-3xl border-[#4CAF50] border-t border-b max-w-[800px] ${
          isSelected ? "bg-green-200" : ""
        }`}
        onClick={handleClick} // Call handleClick when the room is clicked
      >
        <div className="container flex flex-col mx-10 ">
          <div className="flex items-start my-5 ">
            <img
              className="w-40 my-auto border rounded-3xl"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/792c7ac941d0eed14463449a48a7e8eab3826f850bd35b8183438d15e0b42ad8?apiKey=bd6dc691d3624fe581379f78a6e48c90&"
              alt=""
            />

            <div className="flex flex-col items-start">
              <div className="flex pl-5 text-xl">
                <div>
                  <h1 className="pb-2 text-2xl">{roomName}</h1>
                  <p className="pb-2">{description}</p>
                  <p className="pb-2">{price}</p>
                </div>
              </div>
            </div>

            {showCheckbox && (
              <div className="relative ml-auto my-auto mr-20 flex flex-col text-gray-700 bg-white shadow-md rounded-xl bg-clip-border w-[130px]">
                <nav className="flex flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
                  <div
                    role="button"
                    className={`flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 ${
                      isSelected ? "bg-green-200" : ""
                    }`}
                    onClick={handleClick} // Clicking anywhere on the row should toggle selection
                  >
                    <label
                      htmlFor="vertical-list-react"
                      className="flex items-center w-full px-3 py-2 cursor-pointer"
                    >
                      <div className="grid mr-3 place-items-center">
                        <div className="inline-flex items-center">
                          <label
                            className="relative flex items-center p-0 rounded-full cursor-pointer"
                            htmlFor="vertical-list-react"
                          >
                            <input
                              id={`checkbox-${roomId}`}
                              type="checkbox"
                              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-300 checked:bg-green-500 checked:before:bg-gray-900 hover:before:opacity-0"
                              checked={isSelected}
                              onChange={() => {}}
                            />
                            <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="1"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </span>
                          </label>
                        </div>
                      </div>
                      <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                        Select
                      </p>
                    </label>
                  </div>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgencyPackageRoom;
