import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import TMODallasTable from "../components/Table/TMODallasTable";
import TMODallasModal from "../components/Modal/TMODallasModal";
import readXlsxFile from "read-excel-file";

export default function TMODallas() {
  const [sites, setSites] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingSite, setEditingSite] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [editMode, setEditMode] = useState(false);

  function addSite() {
    setEditMode(true);
    setShowModal(true);
    setEditingSite(null);
  }

  function handleEdit(incTicketNumber) {
    setEditMode(false);
    const siteToEdit = sites.find(
      (site) => site.incTicketNumber === incTicketNumber
    );
    setEditingSite(siteToEdit ?? null);
    setShowModal(true);
  }

  function handleDelete(incTicketNumber) {
    setSites((prevSites) =>
      prevSites.filter((site) => site.incTicketNumber !== incTicketNumber)
    );
  }

  function toggleSortOrder() {
    setSortOrder((prevOrder) => (prevOrder === "desc" ? "asc" : "desc"));
  }

  const sortedSites =
    sortOrder === "desc"
      ? [...sites]
          .sort((a, b) => a.incTicketNumber.localeCompare(b.incTicketNumber))
          .reverse()
      : [
          ...sites.sort((a, b) =>
            a.incTicketNumber.localeCompare(b.incTicketNumber)
          ),
        ];

  function transformArrayToObjects(data) {
    const headers = data[0];
    const rows = data.slice(2);
    return rows.map((row) => {
      let obj = {};
      row.forEach((value, index) => {
        obj[headers[index]] = value;
      });
      // console.log("Headers", headers);
      return obj;
    });
  }

  function handleExcelUpload(event) {
    readXlsxFile(event.target.files[0]).then((rows) => {
      const parsedExcelData = transformArrayToObjects(rows);
      const updatedSites = updateTableDataWithExcel(parsedExcelData);
      setSites(updatedSites);
      console.log("Transformed data from excel", parsedExcelData);
    });
  }

  function updateTableDataWithExcel(excelData) {
    // Clone the current sites data
    let updatedSites = [...sites];

    // Iterate through each row of the excelData
    excelData.forEach((excelRow) => {
      // Find the corresponding site in sites by matching the INC Ticket #
      const siteIndex = updatedSites.findIndex(
        (site) => site.incTicketNumber === excelRow["Record ID"]
      );

      console.log(
        "Matching INC Ticket #:",
        excelRow["INC Ticket #"],
        "found at index:",
        siteIndex
      );

      if (siteIndex !== -1) {
        updatedSites[siteIndex].assignee = excelRow["Assigned To"];
        updatedSites[siteIndex].pierStatus = excelRow["Status"];
        updatedSites[siteIndex].assignedGroup = excelRow["Assignee Group"];
        updatedSites[siteIndex].dateReassigned = excelRow["Modified Date"];
        updatedSites[siteIndex].isUpdated = true; // Add a temporary flag to know which rows are updated
      }
    });

    // After processing all excel data, iterate over updatedSites and set pierStatus to "Closed" for the sites that weren't updated
    updatedSites = updatedSites.map((site) => {
      if (!site.isUpdated) {
        return {
          ...site,
          pierStatus: "Closed",
        };
      }
      return site;
    });

    return updatedSites;
  }

  return (
    <>
      <div className="appContainer">
        <div className="button-container">
          <div>
            <Button variant="secondary" onClick={toggleSortOrder}>
              {sortOrder === "desc" ? "Sort Oldest First" : "Sort Latest First"}
            </Button>
          </div>
          <div>
            <TMODallasModal
              show={showModal}
              handleClose={() => setShowModal(false)}
              addSite={addSite}
              sites={sites}
              setSites={setSites}
              editingSite={editingSite}
              isEditMode={editMode}
            />
          </div>
          <div>
            <input
              type="file"
              accept=".xlsx"
              className="form-control"
              onChange={handleExcelUpload}
            />
          </div>
        </div>
        <div className="flex">
          <TMODallasTable
            sites={sortedSites}
            onDelete={handleDelete}
            onEdit={handleEdit}
            isEditMode={editMode}
          />
        </div>
      </div>
    </>
  );
}
