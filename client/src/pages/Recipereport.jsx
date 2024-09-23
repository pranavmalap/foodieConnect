import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import "../pages/report.css";
const Recipereport = () => {
  const userid = useGetUserID();
  const [report, setReport] = useState([]);
  const [counter, setCounter] = useState(1);

  const fetchreport = async () => {
    const recipeReport = await axios.get(
      "http://localhost:3001/recipes/recipereport"
    );
    setReport(recipeReport.data);
  };
  useEffect(() => {
    fetchreport();
  }, [userid]);
  return (
    <div className="reportcontainer">
      <h1 align="center"> Recipe Report</h1>

      <table className="reporttable" border={2}>
        <tr>
          <th>Sr. No.</th>
          <th>Recipe Name</th>
          <th> Ingridients</th>
          <th> Instruction</th>
          <th>Uploaded By</th>
          <th>Likes</th>
          <th>Comments</th>
          <th>UploadedAt</th>
        </tr>

        {report.map((report, index) => (
          <tr>
            <td>{counter + index}</td>
            <td> {report.name} </td>
            <td> {report.ingredients} </td>
            <td> {report.instructions} </td>
            <td> {report.userOwner.username} </td>
            <td> {report.likes.length} </td>
            <td> {report.commentId.length} </td>
            <td> {report.createdAt.split("", 10)} </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Recipereport;
