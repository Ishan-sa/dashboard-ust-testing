import React from "react";
import { useState, useEffect } from "react";
import POLookupsTable from "../components/Table/POLookupsTable";
import POLookupsModal from "../components/Modal/POLookupsModal";

/** @typedef {import('../lib/models/po-lookup')} PO */

export default function POLookups() {
  const [poLookups, setPOLookups] = useState(/** @type {PO[]} */ ([]));
  const [showModal, setShowModal] = useState(false);
  const [editingPO, setEditingPO] = useState(/** @type {PO|null} */ (null));

  // fetch data from mongodb
  const fetchPOLookups = async () => {
    const response = await fetch("http://localhost:8888/po-lookups");
    const data = await response.json();
    setPOLookups(data);
  };

  useEffect(() => {
    fetchPOLookups();
  }, []);

  function addPO() {
    setShowModal(true);
    setEditingPO(null);
  }

  function handleEdit(poNumberToEdit) {
    const poLookupToEdit = poLookups.find(
      (poLookup) => poLookup.poNumber === poNumberToEdit
    );
    if (poLookupToEdit) {
      setEditingPO(poLookupToEdit);
      setShowModal(true);
    }
  }

  function handleDoneEditing() {
    setShowModal(false);
    fetchPOLookups();
  }

  function handleDelete(poNumber) {
    const poLookupToDelete = poLookups.find(
      (poLookup) => poLookup.poNumber === poNumber
    );
    if (poLookupToDelete !== undefined) {
      fetch(`http://localhost:8888/po-lookups/${poLookupToDelete.poNumber}`, {
        method: "DELETE",
      });
    }
    fetchPOLookups();
  }

  return (
    <>
      <div className="appContainer">
        <div className="button-container">
          <div>
            <POLookupsModal
              show={showModal}
              handleClose={handleDoneEditing}
              addPO={addPO}
              po={poLookups}
              editingPo={editingPO}
              setPO={setPOLookups}
            />
          </div>
        </div>
        <div className="flex">
          <POLookupsTable
            poLookups={poLookups}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </>
  );
}
