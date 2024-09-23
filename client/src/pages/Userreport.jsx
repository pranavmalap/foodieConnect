import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import "../pages/report.css";
const Userreport = () => {
  const userid = useGetUserID();
  const [report, setReport] = useState([]);
  const [counter, setCounter] = useState(1);

  const fetchreport = async () => {
    const recipeReport = await axios.get(
      "http://localhost:3001/auth/report/user"
    );
    setReport(recipeReport.data);
  };
  useEffect(() => {
    fetchreport();
  }, [userid]);
  return (
    <div className="reportcontainer">
      <h1 align="center"> User Report</h1>
      <table className="reporttable" border={2}>
        <tr>
          <th>Sr. No.</th>
          <th>Username</th>
          <th> Name</th>
          <th> Email</th>
          <th>Phone</th>
          <th>CreatedAt</th>
        </tr>

        {report.map((report, index) => (
          <tr>
            <td>{counter + index}</td>
            <td> {report.username} </td>
            <td> {report.name} </td>
            <td> {report.email} </td>
            <td> {report.phone} </td>
            <td> </td>
            {/* <td> {report.createdAt.split("",10)} </td> */}
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Userreport;
