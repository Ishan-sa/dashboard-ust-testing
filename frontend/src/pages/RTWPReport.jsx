import { useState, useEffect } from "react";
import DashboardTable from "../components/DashboardTable";
import {
  countsForOPEXTable,
  countsForCAPEXTable,
} from "../components/DashboardTable/constants";

export default function RTWPReport() {
  const [overallView, setOverallView] = useState(false);
  const [monthlyView, setMonthlyView] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [allTicketsData, setAllTicketsData] = useState([]);
  const [opexData, setOpexData] = useState([]);
  const [capexData, setCapexData] = useState([]);

  const aggregateData = (data) => {
    /* prettier-ignore */
    const counts = {
      "All Tickets": { rtwpAnalysis: data.length, open: 0, closed: 0 },
      "OPEX": { rtwpAnalysis: 0, open: 0, closed: 0 },
      "CAPEX": { rtwpAnalysis: 0, open: 0, closed: 0 },
      "No Issues": { rtwpAnalysis: 0, open: 0, closed: 0 },
      "PIM - Internal": { rtwpAnalysis: 0, open: 0, closed: 0 },
      "PIM - External": { rtwpAnalysis: 0, open: 0, closed: 0 },
      "External Interference": { rtwpAnalysis: 0, open: 0, closed: 0 },
      "PIM - External / External Interference": { rtwpAnalysis: 0, open: 0, closed: 0 },
      "PIM - Internal / External Interference": { rtwpAnalysis: 0, open: 0, closed: 0 },
      "PIM Internal / PIM External": { rtwpAnalysis: 0, open: 0, closed: 0 },
    };

    const categories = [
      "No Issues",
      "PIM - Internal",
      "PIM - External",
      "External Interference",
      "PIM - External / External Interference",
      "PIM - Internal / External Interference",
      "PIM Internal / PIM External",
    ];

    categories.forEach((category) => {
      counts[category] = { rtwpAnalysis: 0, open: 0, closed: 0 };
    });

    // Iterate over your data to populate the counts
    data.forEach((ticket) => {
      // Increment open/closed counts for "All Tickets"
      counts["All Tickets"][ticket.status.toLowerCase()]++;
      // If the ticket has a recognized xPEX value, increment the appropriate counts
      if (counts[ticket.xPEX]) {
        counts[ticket.xPEX].rtwpAnalysis++;
        counts[ticket.xPEX][ticket.status.toLowerCase()]++;
      }

      // If the ticket has a recognized category, increment the appropriate counts
      if (counts[ticket.category]) {
        counts[ticket.category].rtwpAnalysis++;
        counts[ticket.category][ticket.status.toLowerCase()]++;
      }
    });

    return Object.entries(counts).map(([key, value]) => ({
      ticketType: key,
      ...value,
    }));
  };

  const aggregateDataForOPEX = (data) => {
    const counts = countsForOPEXTable;

    // Filter data for OPEX and populate counts
    data
      .filter((ticket) => ticket.xPEX === "OPEX")
      .forEach((ticket) => {
        // Increment the total RTWP Analysis count for OPEX categories
        if (counts[ticket.category]) {
          counts[ticket.category].rtwpAnalysis++;
          counts[ticket.category][ticket.status.toLowerCase()]++;
        }
      });

    // Transform counts into an array of objects for rendering in the OPEX table
    return Object.entries(counts).map(([category, value]) => ({
      ticketType: category,
      ...value,
    }));
  };

  const aggregateDataForCAPEX = (data) => {
    const counts = countsForCAPEXTable;

    // Filter data for CAPEX and populate counts
    data
      .filter((ticket) => ticket.xPEX === "CAPEX")
      .forEach((ticket) => {
        // Increment the total RTWP Analysis count for CAPEX categories
        if (counts[ticket.category]) {
          counts[ticket.category].rtwpAnalysis++;
          counts[ticket.category][ticket.status.toLowerCase()]++;
        }
      });

    // Transform counts into an array of objects for rendering in the CAPEX table
    return Object.entries(counts).map(([category, value]) => ({
      ticketType: category,
      ...value,
    }));
  };

  const fetchData = async () => {
    const url = "http://localhost:8888/tmo-main";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, options);
    const rawData = await response.json();
    const aggregatedData = aggregateData(rawData);
    const opexTableData = aggregateDataForOPEX(rawData);
    setOpexData(opexTableData);
    const capexTableData = aggregateDataForCAPEX(rawData);
    setCapexData(capexTableData);
    console.log("aggregatedData", aggregatedData);
    setTableData(aggregatedData);
    setAllTicketsData(aggregateData(rawData));
  };

  const handleSelectChange = (event) => {
    setOverallView(event.target.value === "overallView");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const headers = ["Ticket Type", "", "Ticket Status"];
  const subHeadersForOverllView = ["Totals", "RTWP Analysis", "Open", "Closed"];
  const subHeadersForOPEX = ["OPEX", "RTWP Analysis", "Open", "Closed"];
  const subHeadersForCAPEX = ["CAPEX", "RTWP Analysis", "Open", "Closed"];

  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1>RTWP Report</h1>
      </div>
      <div
        className="custom-select-wrapper"
        style={{
          padding: "20px",
        }}
      >
        <div className="flex flex-col">
          <div className="w-full flex">
            <select
              name=""
              id=""
              className="form-control w-full"
              onChange={handleSelectChange}
            >
              <option value="">Select</option>
              <option value="overallView">Overall View</option>
              <option value="monthlyView">Monthly View</option>
            </select>
          </div>

          {/* overall view inception to date */}
          {overallView && (
            <div className="flex justify-start items-start gap-1 mt-2 flex-col">
              <div className="flex flex-col justify-center items-center w-full">
                <h2>Overall View</h2>
                <h4>Inception to Date</h4>
              </div>
              <div className="flex gap-1">
                <DashboardTable
                  subHeaders={subHeadersForOverllView}
                  data={allTicketsData}
                  headers={headers}
                />
                <DashboardTable
                  subHeaders={subHeadersForOPEX}
                  data={opexData}
                  headers={headers}
                  excludeRows={["All Tickets", "CAPEX", "OPEX"]}
                />
                <DashboardTable
                  subHeaders={subHeadersForCAPEX}
                  data={capexData}
                  headers={headers}
                  excludeRows={["All Tickets", "CAPEX", "OPEX"]}
                />
              </div>
            </div>
          )}

          {/* monthly view */}
        </div>
      </div>
    </>
  );
}
