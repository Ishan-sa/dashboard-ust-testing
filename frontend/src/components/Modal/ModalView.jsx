import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function ModalView({
  modalBody,
  modalTitle,
  handleClose = () => {},
  show,
}) {
  const formattedDate = new Date().toLocaleDateString("en-GB"); // DD/MM/YYYY format

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle || "Modal Title"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-bold">John Doe | {formattedDate}</div>
          <br />
          <div className="modalBodyContainer">
            {modalBody || "Nothing here yet :("}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
