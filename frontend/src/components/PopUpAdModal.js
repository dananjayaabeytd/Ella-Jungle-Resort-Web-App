import React from 'react'

export default function PopUpAdModal() {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 overflow-y-auto h-full w-full" id="my-modal">
                  <div className="relative top-28   mx-auto p-5 w-2/5 h-4/6 shadow-lg rounded-3xl bg-white border-secondary-green " 
                 >
                    <div className="mx-16 my-14 text-center items-center bg-gray-500 opacity-70 rounded-3xl border-8 border-black border-double">
                      
                      <div className="px-7 py-1 pt-2">
                        
                        
                      </div>
                      <div className="text-lg font-semibold text-blue-600 text-center flex justify-between items-center mx-12 mt-1">
                       

                        <p className="text-sm font-mclaren text-black">
                        @Ella Jungle Resort</p>
                      </div>
                      <div className="items-center px-4 pb-5 mt-3 flex justify-between mx-6">
                        <button id="delete-btn" 
                        className="px-4 py-2  font-mclaren bg-black text-white text-base font-medium rounded-lg w-24 shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" 
                        >
                          Buy
                        </button>

                        <button 
                        className="px-4 py-2 font-mclaren bg-black text-white text-base font-medium rounded-lg w-24 shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" 
                        
                        >
                          Next
                        </button>

                        <button 
                        className="px-4 py-2 font-mclaren bg-black text-white text-base font-medium rounded-lg w-24 shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" 
                       >
                          Skip
                        </button>
                      </div>

                      

                    </div>
                  </div>
                </div>
  )
}
