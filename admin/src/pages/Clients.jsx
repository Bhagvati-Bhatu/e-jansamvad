// import React, { useState, useEffect } from "react";
// import SummaryCards from "../components/SummaryCards";
// import FilterTabs from "../components/FilterTabs";
// import ClientTable from "../components/ClientTable";

// const Clients = () => {
//   const [grievances, setGrievances] = useState([]);

//   // useEffect(() => {
//   //   const fetchGrievances = async () => {
//   //     try {
//   //       const response = await fetch("https://line-host-rt77.onrender.com/grievance/allGrievances", {
//   //         method: "GET",
//   //         headers: { "Content-Type": "application/json" },
//   //         // credentials: "include",
//   //       });
//   //       if (response.ok) {
//   //         const data = await response.json();
//   //         setGrievances(data);
//   //       } else {
//   //         console.error("Error fetching grievances:", response.statusText);
//   //       }
//   //     } catch (error) {
//   //       console.error("Network error:", error);
//   //     }
//   //   };
//   //   fetchGrievances();
//   // }, []);

//   useEffect(() => {
//   const fetchGrievances = async () => {
//     try {
//       const response = await fetch("https://line-host-rt77.onrender.com/grievance/allGrievances", {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//       });
//       if (!response.ok) throw new Error(response.statusText);
//       const result = await response.json();
//       console.log("Fetched grievances:", result);
//       setGrievances(result.data || result || []);
//     } catch (err) {
//       console.error("Error fetching grievances:", err);
//     }
//   };
//   fetchGrievances();
// }, []);


//   return (
//     <div>
//       <SummaryCards grievances={grievances} />
//       <ClientTable grievances={grievances} /> {/* ✅ Pass grievances as a prop */}
//     </div>
//   );
// };

// export default Clients;

import React, { useState, useEffect } from "react";
import SummaryCards from "../components/SummaryCards";
import ClientTable from "../components/ClientTable";

const Clients = () => {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await fetch(
          "https://line-host-rt77.onrender.com/grievance/allGrievances",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            // credentials: "include", // Uncomment only if backend supports cookies
          }
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        console.log("Fetched grievances:", result);

        // Handle both plain array and wrapped response
        setGrievances(result.data || result || []);
      } catch (err) {
        console.error("Failed to fetch grievances:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGrievances();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="ml-4 text-gray-700">Loading grievances...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        ❌ Error fetching grievances: {error}
      </div>
    );
  }

  // No grievances
  if (!grievances.length) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        ⚠️ No grievances found.
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Summary Cards showing total grievances */}
      <SummaryCards grievances={grievances} />

      {/* Grievances Table */}
      <ClientTable grievances={grievances} />
    </div>
  );
};

export default Clients;

