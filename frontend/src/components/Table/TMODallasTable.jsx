import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";
import ModalView from "../Modal/ModalView";

export default function TMODallasTable({
  sites,
  onDelete = () => {},
  onEdit = () => {},
}) {
  const tableHeader = [
    "INC Ticket #",
    "Status",
    "Site ID",
    "xPEX",
    "GC",
    "Tech Affected",
    "Sector",
    "Category",
    "MCPS Eng",
    "Work Log",
    "Case",
    "INC Assigned To",
    "Assigned Group",
    "Assignee",
    "Date Assigned",
    "Date Reassigned",
    "Pier Status",
    "Resolution",
    "Actions",
  ];

  const [show, setShow] = useState(false);
  const [selectedWorkLog, setSelectedWorkLog] = useState("");

  function resetModal() {
    window.location.reload();
  }

  function handleShow() {
    setShow(true);
  }

  function handleClose() {
    resetModal();
    setShow(false);
  }

  return (
    <>
      <table className="table table-bordered border-black">
        <thead>
          <tr className="uppercase text-center">
            {tableHeader.map((header, index) => {
              return <th key={index}>{header}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {sites.map((site, index) => (
            <tr key={index} className="text-center">
              <td>{site.incTicketNumber}</td>
              <td>{site.status}</td>
              <td>{site.siteID}</td>
              <td>{site.xPEX}</td>
              <td>{site.gc}</td>
              <td>
                {site.techAffected.map((option) => option.label).join(", ")}
              </td>
              <td>{site.sector.map((option) => option.label).join(", ")}</td>
              <td>{site.category}</td>
              <td>{site.mcpsEng}</td>
              <td
                onClick={() => {
                  setSelectedWorkLog(site.workLog);
                  handleShow();
                }}
              >
                {site.workLog.length > 50
                  ? site.workLog.substring(0, 50) + "..."
                  : site.workLog}
              </td>
              <ModalView
                modalTitle="Work Log"
                modalBody={selectedWorkLog}
                show={show}
                handleClose={handleClose}
                handleShow={handleShow}
              />
              <td>{site.case.map((option) => option.label).join(", ")}</td>
              <td>{site.incAssignedTo}</td>
              <td>{site.assignedGroup}</td>
              <td>{site.assignee}</td>
              <td>{site.dateAssigned}</td>
              <td>{site.dateReassigned}</td>
              <td>{site.pierStatus}</td>
              <td>{site.resolution}</td>
              <td className="actionContainer">
                <BiEdit
                  style={{ height: "30px", width: "30px", cursor: "pointer" }}
                  onClick={() => onEdit(site.incTicketNumber)}
                />
                <AiFillDelete
                  style={{ height: "30px", width: "30px", cursor: "pointer" }}
                  onClick={(event) => {
                    event.stopPropagation();
                    onDelete(site.incTicketNumber);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
