import React, { useState, useEffect } from "react";
import SummaryCards from "../components/SummaryCards";
import FilterTabs from "../components/FilterTabs";
import ClientTable from "../components/ClientTable";

const Clients = () => {
  const [grievances, setGrievances] = useState([]);

  // useEffect(() => {
  //   const fetchGrievances = async () => {
  //     try {
  //       const response = await fetch("https://line-host-rt77.onrender.com/grievance/allGrievances", {
  //         method: "GET",
  //         headers: { "Content-Type": "application/json" },
  //         // credentials: "include",
  //       });
  //       if (response.ok) {
  //         const data = await response.json();
  //         setGrievances(data);
  //       } else {
  //         console.error("Error fetching grievances:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Network error:", error);
  //     }
  //   };
  //   fetchGrievances();
  // }, []);

  useEffect(() => {
  const fetchGrievances = async () => {
    try {
      const response = await fetch("https://line-host-rt77.onrender.com/grievance/allGrievances", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error(response.statusText);
      const result = await response.json();
      console.log("Fetched grievances:", result);
      setGrievances(result.data || result || []);
    } catch (err) {
      console.error("Error fetching grievances:", err);
    }
  };
  fetchGrievances();
}, []);


  return (
    <div>
      <SummaryCards grievances={grievances} />
      <ClientTable grievances={grievances} /> {/* ✅ Pass grievances as a prop */}
    </div>
  );
};

export default Clients;
