import { useState, useEffect } from "react";

export default function RTWPReport() {
  const tableHeader = ["Ticket Type", "", "Ticket Status"];
  const tableSubHeader = ["Totals", "RTWP Analysis", "Open", "Closed"];

  const [tableData, setTableData] = useState([]);

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

    // Iterate over your data to populate the counts
    data.forEach((ticket) => {
      // Increment open/closed counts for "All Tickets"
      counts["All Tickets"][ticket.status.toLowerCase()]++;
      // If the ticket has a recognized xPEX value, increment the appropriate counts
      if (counts[ticket.xPEX]) {
        counts[ticket.xPEX].rtwpAnalysis++;
        counts[ticket.xPEX][ticket.status.toLowerCase()]++;
      }
    });

    return Object.entries(counts).map(([key, value]) => ({
      category: key,
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
    console.log("aggregatedData", aggregatedData);
    setTableData(aggregatedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          <div>
            <select name="" id="" className="form-control">
              <option value="">Select</option>
              <option value="overallView">Overall View</option>
            </select>
          </div>

          <div className="flex">
            <table className="w-full table table-bordered border-black">
              <thead>
                <tr className="uppercase text-center">
                  {tableHeader.map((header) => (
                    <>
                      <th
                        key={header}
                        colSpan={header === "Ticket Status" ? 2 : 1}
                      >
                        {header}
                      </th>
                    </>
                  ))}
                </tr>
                <tr className="uppercase text-center">
                  {tableSubHeader.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {tableData.map((item, key) => (
                  <tr key={key}>
                    <td>{item.category}</td>
                    <td>{item.rtwpAnalysis}</td>
                    <td>{item.open}</td>
                    <td>{item.closed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
