import { BiEdit } from "react-icons/bi";

export default function CapexReportTable({ sites, onEdit = () => {} }) {
  const tableHeader = [
    "INC Ticket #",
    "Status",
    "Date Created",
    "Aging",
    "Issue Owner",
    "Site ID",
    "GC",
    "Tech Affected",
    "Sector",
    "Category",
    "INC Assigned Group",
    "Work Log",
    "Go Back Date",
    "Notes",
    "Actions",
  ];

  return (
    <>
      <div>
        <h3 className="text-center">CAPEX Report</h3>
      </div>
      <table className="table table-bordered border-black">
        <thead>
          <tr className="uppercase text-center">
            {tableHeader.map((header, index) => {
              return <th key={index}>{header}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {sites?.map((site, index) => (
            <tr key={index} className="text-center">
              <td>{site.incTicketNumber}</td>
              <td>{site.status}</td>
              <td>{site.dateAssigned}</td>
              <td>{site.aging}</td>
              <td>{site.issueOwner}</td>
              <td>{site.siteID}</td>
              <td>{site.gc}</td>
              {site.techAffected.map((option) => option.label).join(", ")}
              <td>{site.sector.map((option) => option.label).join(", ")}</td>
              <td>{site.category}</td>
              <td>{site.assignedGroup}</td>
              <td>{site.workLog}</td>
              <td>{site.goBackDate}</td>
              <td>{site.notes}</td>
              <td>
                <BiEdit
                  style={{ height: "30px", width: "30px", cursor: "pointer" }}
                  onClick={() => onEdit(site.incTicketNumber)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
