import React from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import ModalView from "../Modal/ModalView";
import { useState } from "react";

function ScheduleTable({ sites, onDelete = () => {}, onEdit = () => {} }) {
  const tableHeader = [
    "# Ticket",
    "Date Assigned",
    "Site",
    "Analysis Status",
    "INC Ticket",
    "xPEX",
    "Bridge Support",
    "Assigned To",
    "Shift",
    "HO required",
    "Notes",
    "HO Engineer",
    "Date Complete",
    "Actions",
  ];

  const [show, setShow] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState("");

  function handleShow() {
    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }

  function truncateNotes(notes) {
    return notes?.length > 50 ? notes?.substring(0, 50) + "..." : notes;
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
              <td>{site.ticketNumber}</td>
              <td>{site.dateAssigned}</td>
              <td>{site.siteNumber}</td>
              <td>{site.analysisStatus}</td>
              <td>{site.incTicketNumber}</td>
              <td>{site.xPEX}</td>
              <td>{site.bridgeSupport}</td>
              <td>{site.assignedTo}</td>
              <td>{site.shift}</td>
              <td>{site.hoRequired}</td>
              <td
                onClick={() => {
                  setSelectedNotes(site.notes);
                  handleShow();
                }}
                className="cursor-pointer notes-td"
              >
                {/* <br /> */}
                <div
                  className="text-center notes-div "
                  dangerouslySetInnerHTML={{
                    __html: truncateNotes(site.notes),
                  }}
                ></div>
              </td>

              <ModalView
                modalTitle="Notes"
                modalBody={selectedNotes}
                show={show}
                // handleShow={handleShow}
                handleClose={handleClose}
              />

              <td>{site.hoEngineer}</td>
              <td>{site.dateComplete}</td>
              <td className="actionContainer">
                <div>
                  <BiEdit
                    onClick={() => onEdit(site.ticketNumber)}
                    style={{ height: "30px", width: "30px", cursor: "pointer" }}
                  />
                </div>
                <div>
                  <AiFillDelete
                    onClick={(event) => {
                      event.stopPropagation();
                      onDelete(site.ticketNumber);
                    }}
                    style={{ height: "30px", width: "30px", cursor: "pointer" }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ScheduleTable;
