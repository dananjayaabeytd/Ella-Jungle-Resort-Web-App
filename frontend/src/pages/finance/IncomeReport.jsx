import TotalEarningsCustomPkgBooking from "./TotalEarningsCustomPkgBooking";
import TotalEarningsHotelPkgBooking from "./TotalEarningsHotelPackages";
import TotalEarningsSpa from "./TotalEarningsSpa";
import TotalEarningsSpecialActivity from "./TotalEarningsSpecialActivity";
import React from 'react';


const FinanceReport = () => {
  return (
    <div>
      <h1>Finance Report</h1>
      <TotalEarningsSpecialActivity />
      <TotalEarningsSpa />
      <TotalEarningsHotelPkgBooking />
      <TotalEarningsCustomPkgBooking />
    </div>
  );
};

export default FinanceReport;