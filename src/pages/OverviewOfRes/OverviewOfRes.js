import React from "react";
import AdminPage from "../../components/AdminPage/adminpage.component";
import Chart from "../../components/Chart/Chart";
import Widget from "../../components/Widget/Widget";
import "./OverviewOfRes.style.scss";
const OverviewOfRes = () => {
  return (
    <AdminPage>
      <div className="overviewOfResContainer">
        <div className="widgets">
          <Widget />
          <Widget />
          <Widget />
          <Widget />
        </div>
        <div className="chart">
          <Chart />
        </div>
      </div>
    </AdminPage>
  );
};

export default OverviewOfRes;
