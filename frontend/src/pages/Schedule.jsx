import ScheduleTable from "../components/Table/ScheduleTable";
import { useState } from "react";
import SiteModal from "../components/Modal/SiteModal";
import { Button } from "react-bootstrap";
import Papa from "papaparse";

export default function Schedule() {
  const [sites, setSites] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingSite, setEditingSite] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");

  function addSite() {
    setShowModal(true);
    setEditingSite(null);
  }

  function handleEdit(ticketNumber) {
    const siteToEdit = sites.find((site) => site.ticketNumber === ticketNumber);
    setEditingSite(siteToEdit);
    setShowModal(true);
  }

  function handleDelete(ticketNumber) {
    setSites((prevSites) =>
      prevSites.filter((site) => site.ticketNumber !== ticketNumber)
    );
  }

  function toggleSortOrder() {
    setSortOrder((prevOrder) => (prevOrder === "desc" ? "asc" : "desc"));
  }

  const sortedSites = [...sites].sort((a, b) => {
    if (sortOrder === "desc") {
      return b.ticketNumber - a.ticketNumber;
    } else {
      return a.ticketNumber - b.ticketNumber;
    }
  });

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
            ticketNumber: 10001 + index,
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
              siteCount={sites.length}
              editingSite={editingSite}
              show={showModal}
              handleClose={() => setShowModal(false)}
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
            sites={sortedSites}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </>
  );
}
