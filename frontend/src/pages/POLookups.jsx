import React from "react";
import { useState } from "react";
import POLookupsTable from "../components/Table/POLookupsTable";
import POLookupsModal from "../components/Modal/POLookupsModal";

export default function POLookups() {
  const [poLookups, setPOLookups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPO, setEditingPO] = useState(null);

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

  function handleDelete(poNumber) {
    setPOLookups((prevPOLookups) => {
      return prevPOLookups.filter((poLookup) => poLookup.poNumber !== poNumber);
    });
  }

  return (
    <>
      <div className="appContainer">
        <div className="button-container">
          <div>
            <POLookupsModal
              show={showModal}
              handleClose={() => setShowModal(false)}
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
