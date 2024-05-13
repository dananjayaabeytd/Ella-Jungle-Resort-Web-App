import TotalEarningsCustomPkgBooking from "./TotalEarningsCustomPkgBooking";
import TotalEarningsHotelPkgBooking from "./TotalEarningsHotelPackages";
import TotalEarningsSpa from "./TotalEarningsSpa";
import TotalEarningsSpecialActivity from "./TotalEarningsSpecialActivity";
import React from 'react';

const FinanceReport = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Finance Report</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <TotalEarningsSpecialActivity />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <TotalEarningsSpa />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <TotalEarningsHotelPkgBooking />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <TotalEarningsCustomPkgBooking />
        </div>
      </div>
    </div>
  );
};

export default FinanceReport;
