import React from "react";

export default function index({
  title,
  subTitle,
  subHeaders,
  data,
  headers,
  excludeRows = [],
}) {
  return (
    <>
      <div>
        <div className="flex justify-center items-center flex-col rtwp-report-heading-container">
          <div>{title && <h3>{title}</h3>}</div>
          <div>{subTitle && <h4>{subTitle}</h4>}</div>
        </div>
        <table className="w-full table table-bordered border-black">
          <thead>
            <tr className="uppercase text-center">
              {headers.map((header) => (
                <th key={header} colSpan={header === "Ticket Status" ? 2 : 1}>
                  {header}
                </th>
              ))}
            </tr>
            <tr className="uppercase text-center">
              {subHeaders.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item) => !excludeRows.includes(item.ticketType))
              .map((item, key) => (
                <tr key={key}>
                  <td>{item.ticketType}</td>
                  <td>{item.rtwpAnalysis}</td>
                  <td>{item.open}</td>
                  <td>{item.closed}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
