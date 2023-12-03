import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { capexReportEditStuff } from "../../models/capex-report";
import { BiSolidDownArrow } from "react-icons/bi";

/** @typedef {import('../../lib/models/CapexReport').CapexReport} CapexReport */

/**
 * @param {object} params
 * @param {CapexReport|null} params.editingCapexReport
 * @return {*}
 */

export default function CapexReportModal({ show, handleClose }) {
  const [formData, setFormData] = useState(new capexReportEditStuff());

  // write a handleSubmit function that will send the data to the backend, the name of the mongodb collection is called "capex-report-editstuff"
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8888/capex-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <Modal show={show} onHide={handleClose} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Edit CAPEX Report</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className="table form-control flex justify-center">
              <tbody className="flex">
                <tr className="flex w-full justify-center">
                  <td className="w-full">
                    <label htmlFor="issueOwner" className="text-bold">
                      Issue Owner
                    </label>
                    <div className="custom-select-wrapper">
                      <select
                        className="form-control w-full"
                        required
                        value={formData.issueOwner}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            issueOwner: e.target.value,
                          })
                        }
                      >
                        <option value="">Select</option>
                        <option value="UMLAUT">TMO</option>
                        <option value="GC">GC</option>
                        <option value="FYI- SR Only">FYI - SR Only</option>
                        <option value="RF">RF</option>
                      </select>
                      <BiSolidDownArrow className="dropdown-icon" />
                    </div>
                  </td>

                  <td className="w-full">
                    <label htmlFor="goBackDate" className="text-bold">
                      Go Back Date
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Go Back Date"
                      required
                      value={formData.goBackDate}
                      onChange={(e) =>
                        setFormData({ ...formData, goBackDate: e.target.value })
                      }
                    />
                  </td>

                  <td className="w-full">
                    <label htmlFor="notes" className="text-bold">
                      Notes
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Notes"
                      required
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
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
