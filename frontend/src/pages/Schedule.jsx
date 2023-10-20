import { useEffect, useState } from "react";
import Papa from "papaparse";
import { Button } from "react-bootstrap";

import SiteModal from "../components/Modal/SiteModal";
import ScheduleTable from "../components/Table/ScheduleTable";

/** @typedef {import('../lib/models/Schedule').Schedule} Schedule */

export default function Schedule() {
  const [sites, setSites] = useState(/** @type {Schedule[]} */ ([]));
  const [showModal, setShowModal] = useState(false);
  const [editingSite, setEditingSite] = useState(
    /** @type {Schedule|null} */ (null)
  );
  const [sortOrder, setSortOrder] = useState("desc");

  // fetch data from mongodb
  const fetchSites = async () => {
    const response = await fetch("http://localhost:8888/sites");
    /** @type {Schedule[]} */
    const data = await response.json();
    console.log(data);
    setSites(data);
  };

  // componentDidMount
  useEffect(() => {
    fetchSites();
  }, []);

  function addSite() {
    setShowModal(true);
    setEditingSite(null);
  }

  function handleEdit(incTicketNumber) {
    const siteToEdit = sites.find(
      (site) => site.incTicketNumber === incTicketNumber
    );
    setEditingSite(siteToEdit ?? null);
    setShowModal(true);
  }

  function handleDoneEditing() {
    setShowModal(false);
    fetchSites();
  }

  async function handleDelete(incTicketNumber) {
    const siteToDelete = sites.find(
      (site) => site.incTicketNumber === incTicketNumber
    );
    if (siteToDelete !== undefined) {
      const response = await fetch(
        `http://localhost:8888/sites/${siteToDelete.siteNumber}`,
        {
          method: "DELETE",
        }
      );
      fetchSites();
    }
  }

  function toggleSortOrder() {
    setSortOrder((prevOrder) => (prevOrder === "desc" ? "asc" : "desc"));
  }

  const sortedSites =
    sortOrder === "desc" //
      ? [...sites]
          .sort((a, b) => a.incTicketNumber.localeCompare(b.incTicketNumber))
          .reverse()
      : [...sites].sort((a, b) =>
          a.incTicketNumber.localeCompare(b.incTicketNumber)
        );

  const currentDate = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;
    return formattedDate;
  };

  const sitesWithTicketNumberAndDateAssigned = sites.map((site, index) => ({
    ...sortedSites[index],
    ticketNumber: 10001 + index,
    dateAssigned: currentDate(),
  }));

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          // console.log(result.data);
          const currentDate = new Date();
          const formattedDate = `${currentDate.getDate()}/${
            currentDate.getMonth() + 1
          }/${currentDate.getFullYear()}`;
          const parsedData = result.data.map((row, index) => ({
            ...row,
            incTicketNumber: 10001 + index,
            dateAssigned: formattedDate,
          }));

          setSites((prevSites) => [...parsedData, ...prevSites]);
        },
        header: true,
      });
    }
  };

  return (
    <>
      <div className="appContainer">
        <div className="button-container ">
          <div>
            <Button variant="secondary" onClick={toggleSortOrder}>
              {sortOrder === "desc" ? "Sort Oldest First" : "Sort Latest First"}
            </Button>
          </div>
          <div>
            <SiteModal
              setSites={setSites}
              editingSite={editingSite}
              show={showModal}
              handleClose={handleDoneEditing}
              addSite={addSite}
            />
          </div>
          <div>
            <input
              type="file"
              accept=".csv"
              className="form-control"
              onChange={handleCSVUpload}
            />
          </div>
        </div>
        <div className="flex">
          <ScheduleTable
            // sites={sortedSites}
            sites={sitesWithTicketNumberAndDateAssigned}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </>
  );
}
