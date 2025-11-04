import React, { useState, useEffect } from "react";
import SummaryCards from "../components/SummaryCards";
import FilterTabs from "../components/FilterTabs";
import ClientTable from "../components/ClientTable";

const Clients = () => {
  const [grievances, setGrievances] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGrievances = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://e-jansamvad-1.onrender.com/grievance/allGrievances", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setGrievances(data);
        } else {
          console.error("Error fetching grievances:", response.statusText);
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGrievances();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-xl font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ zoom: "0.9" }}>
      <SummaryCards grievances={grievances} />
      <ClientTable grievances={grievances} />
    </div>
  );
};

export default Clients;
