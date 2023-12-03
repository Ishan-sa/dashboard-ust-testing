import React from "react";
import CapexReportTable from "../components/Table/CapexReportTable";
import { useState, useEffect } from "react";
import CapexReportModal from "../components/Modal/CapexReportModal";

export default function CapexReport() {
  const [sites, setSites] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const getCapexReportData = async () => {
    const response = await fetch("http://localhost:8888/tmo-main");
    const data = await response.json();

    // get only those with status set to Open and xPEX of CAPEX
    const capexReportData = data.filter(
      (site) => site.status === "Open" && site.xPEX === "CAPEX"
    );

    // today's date in the format of YYYY-MM-DD
    const today = new Date();
    const todayDate = today.toISOString().slice(0, 10);

    // get the creation date of each site (dateAssigned)
    const creationDate = capexReportData.map((site) => site.dateAssigned);

    // get the difference between today's date and the creation date of each site in a number of days
    const aging = creationDate.map((date) => {
      const date1 = new Date(date);
      const date2 = new Date(todayDate);
      const diffInTime = date2.getTime() - date1.getTime();
      const diffInDays = diffInTime / (1000 * 3600 * 24);
      return Math.round(diffInDays);
    });

    // Update the capexReportData with the aging values
    const updatedCapexReportData = capexReportData.map((site, index) => ({
      ...site,
      aging: aging[index], // Add the aging value to each site object
    }));

    setSites(updatedCapexReportData); // Update the state with the new data
    console.log(
      "Updated CAPEX Report Data with Aging Values",
      updatedCapexReportData
    );
  };

  useEffect(() => {
    getCapexReportData();
  }, []);

  function editSite(incTicketNumber) {
    const siteToEdit = sites.find(
      (site) => site.incTicketNumber === incTicketNumber
    );
    if (siteToEdit) {
      setShowModal(true);
    }
  }

  const closeModal = () => setShowModal(false);

  return (
    <>
      <div className="appContainer">
        <div>
          <CapexReportModal show={showModal} handleClose={closeModal} />
          <CapexReportTable sites={sites} onEdit={editSite} />
        </div>
      </div>
    </>
  );
}
