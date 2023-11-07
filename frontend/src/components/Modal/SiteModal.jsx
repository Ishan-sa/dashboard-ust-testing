import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BiSolidDownArrow } from "react-icons/bi";
import { ScheduleKeysToCheck } from "../../keysToCheck/keysToCheck";
import { makeEmptySchedule } from "../../lib/models/Schedule";

/** @typedef {import('../../lib/models/Schedule').Schedule} Schedule */

/**
 * @param {object} params
 * @param {Schedule|null} params.editingSite
 * @return {*}
 */

function SiteModal({ setSites, editingSite, show, handleClose, addSite }) {
  const [formData, setFormData] = useState(makeEmptySchedule());
  const [incTicketNumbers, setIncTicketNumbers] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (editingSite !== null) {
      setFormData(editingSite);
    } else {
      setFormData(makeEmptySchedule());
    }
  }, [editingSite]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (ScheduleKeysToCheck.some((key) => formData[key] === "")) {
      setError(true);
      return;
    }

    if (!event.target.checkValidity()) {
      return;
    }

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;

    try {
      if (editingSite !== null) {
        // Editing logic
        const response = await fetch(
          `http://localhost:8888/sites/${editingSite.siteNumber}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const responseData = await response.json();
        console.log(responseData);
      } else {
        // Adding a new site logic
        const response = await fetch(`http://localhost:8888/sites`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const responseData = await response.json();
        console.log(responseData);
      }
    } catch (error) {
      console.log("Error saving data:", error);
    }

    handleClose();

    // Reset the form data
    setFormData({
      siteNumber: "",
      analysisStatus: "Pending",
      incTicketNumber: "",
      xPEX: "OPEX",
      bridgeSupport: "Yes",
      assignedTo: "",
      shift: "Day",
      hoRequired: "Yes",
      notes: "",
      hoEngineer: "",
      dateComplete: "",
    });

    setError(false);
  };

  // async function getIncTicketNumbersFromRTWP() {
  //   const response = await fetch(`http://localhost:8888/tmo-main`);
  //   const responseData = await response.json();
  //   const incTicketNumbersFromMainTracker = responseData.map(
  //     (site) => site.incTicketNumber
  //   );
  //   console.log(incTicketNumbersFromMainTracker);
  //   setIncTicketNumbers(incTicketNumbersFromMainTracker);
  // }

  // useEffect(() => {
  //   getIncTicketNumbersFromRTWP();
  // }, []);

  async function getIncTicketNumbersFromRTWP() {
    const response = await fetch(`http://localhost:8888/tmo-main`);
    const responseData = await response.json();
    // if the status is set to closed, then don't fetch the inc ticket number of that site from the main tracker

    const incTicketNumbersFromMainTracker = responseData.map(
      (site) => site.incTicketNumber
    );
    console.log(incTicketNumbersFromMainTracker);
    setIncTicketNumbers(incTicketNumbersFromMainTracker);
  }

  useEffect(() => {
    getIncTicketNumbersFromRTWP();
  }, []);

  return (
    <>
      <Button
        variant="custom"
        onClick={addSite}
        style={{
          backgroundColor: "#003c68",
          color: "white",
        }}
      >
        Add a site{" "}
      </Button>

      <form onSubmit={handleSubmit} className="w-full">
        <Modal show={show} onHide={handleClose} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>
              {editingSite ? "Edit Site" : "Add a New Site"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className="table form-control">
              <tbody>
                <tr className="flex w-full">
                  <td className="w-full">
                    <label htmlFor="siteNumber" className="text-bold">
                      <span className="text-danger">*</span>
                      Site
                    </label>
                    <input
                      type="text"
                      placeholder="Site Number"
                      className="form-control"
                      value={formData.siteNumber}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          siteNumber: e.target.value,
                        }))
                      }
                    />
                  </td>

                  {/* Analysis Status */}
                  <td className="w-full">
                    <label htmlFor="analysisStatus" className="text-bold">
                      <span className="text-danger">*</span>
                      Analysis Status
                    </label>
                    <div className="custom-select-wrapper">
                      <select
                        className="form-control w-full"
                        required
                        value={formData.analysisStatus}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            analysisStatus: e.target.value,
                          }))
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <BiSolidDownArrow className="dropdown-icon" />
                    </div>
                  </td>

                  {/* INC Ticket */}
                  <td className="w-full">
                    <label htmlFor="incTicket" className="text-bold">
                      <span className="text-danger">*</span>
                      INC Ticket
                    </label>
                    <div className="custom-select-wrapper">
                      {/* <select
                        className="form-control w-full"
                        required
                        value={formData.incTicketNumber}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            incTicketNumber: e.target.value,
                          }))
                        }
                      >
                        <option value="Select">Select</option>
                        {incTicketNumbers.map((incTicketNumber, i) => (
                          <option value={incTicketNumber} key={i}>
                            {incTicketNumber}
                          </option>
                        ))}
                      </select> */}
                      <select
                        className="form-control w-full"
                        required
                        value={formData.incTicketNumber}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            incTicketNumber: e.target.value,
                          }))
                        }
                      >
                        <option value="Select">Select</option>
                        {incTicketNumbers.map((incTicketNumber, i) => (
                          <option value={incTicketNumber} key={i}>
                            {incTicketNumber}
                          </option>
                        ))}
                      </select>
                      <BiSolidDownArrow className="dropdown-icon" />
                    </div>
                  </td>
                </tr>

                <tr className="flex w-full">
                  {/* xPEX */}
                  <td className="w-full">
                    <label htmlFor="xPEX" className="text-bold">
                      <span className="text-danger">*</span>
                      xPEX
                    </label>
                    <div className="custom-select-wrapper">
                      <select
                        className="form-control w-full"
                        required
                        value={formData.xPEX}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            xPEX: e.target.value,
                          }))
                        }
                      >
                        <option value="OPEX" className="text-muted w-full">
                          OPEX
                        </option>
                        <option value="CAPEX" className="text-muted">
                          CAPEX
                        </option>
                      </select>
                      <BiSolidDownArrow className="dropdown-icon" />
                    </div>
                  </td>

                  {/* Bridge Support */}
                  <td className="w-full">
                    <label htmlFor="bridgeSupport" className="text-bold">
                      <span className="text-danger">*</span>
                      Bridge Support
                    </label>
                    <div className="custom-select-wrapper">
                      <select
                        className="form-control"
                        required
                        value={formData.bridgeSupport}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            bridgeSupport: e.target.value,
                          }))
                        }
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      <BiSolidDownArrow className="dropdown-icon" />
                    </div>
                  </td>

                  {/* Assigned To */}
                  <td className="w-full">
                    <label htmlFor="assignedTo" className="text-bold">
                      <span className="text-danger">*</span>
                      Assigned To
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Assigned To"
                      className="form-control"
                      value={formData.assignedTo}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          assignedTo: e.target.value,
                        }))
                      }
                    />
                  </td>
                </tr>

                <tr className="w-full flex">
                  {/* Shift */}
                  <td className="w-full">
                    <label htmlFor="shift" className="text-bold">
                      <span className="text-danger">*</span>
                      Shift
                    </label>
                    <div className="custom-select-wrapper">
                      <select
                        className="form-control"
                        required
                        value={formData.shift}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            shift: e.target.value,
                          }))
                        }
                      >
                        <option value="Day">Day</option>
                        <option value="MW">MW</option>
                      </select>
                      <BiSolidDownArrow className="dropdown-icon" />
                    </div>
                  </td>

                  {/* HO Required */}
                  <td className="w-full">
                    <label htmlFor="hoRequired" className="text-bold">
                      <span className="text-danger">*</span>
                      HO Required
                    </label>
                    <div className="custom-select-wrapper">
                      <select
                        className="form-control"
                        required
                        value={formData.hoRequired}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            hoRequired: e.target.value,
                          }))
                        }
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      <BiSolidDownArrow className="dropdown-icon" />
                    </div>
                  </td>
                </tr>
                {/* Notes */}

                <tr className="flex w-full">
                  <td className="w-full">
                    <label htmlFor="notes" className="text-bold">
                      Notes
                    </label>
                    <textarea
                      cols={400}
                      rows={3}
                      className="form-control"
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          notes: e.target.value,
                        }))
                      }
                    ></textarea>
                  </td>
                </tr>

                <tr className="flex w-full">
                  {/* HO Engineer */}
                  <td className="w-full">
                    <label htmlFor="hoEngineer" className="text-bold">
                      HO Engineer
                    </label>
                    <input
                      type="text"
                      placeholder="HO Engineer"
                      className="form-control"
                      value={formData.hoEngineer}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          hoEngineer: e.target.value,
                        }))
                      }
                    />
                  </td>

                  {/* Date Complete */}
                  <td className="w-full">
                    <label htmlFor="dateComplete" className="text-bold">
                      Date Complete
                    </label>
                    <input
                      type="date"
                      placeholder="Date Complete"
                      className="form-control"
                      value={formData.dateComplete}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          dateComplete: e.target.value,
                        }))
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            {error && (
              <div>
                <p className="text-danger text-bold">
                  Fields marked with an asterisk (*) are required.
                </p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </>
  );
}

export default SiteModal;
