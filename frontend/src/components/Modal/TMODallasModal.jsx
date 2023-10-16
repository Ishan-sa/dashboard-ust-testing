import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { BiSolidDownArrow } from "react-icons/bi";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Site } from "../../models/tmo-dallas";
import { TMODallasKeysToCheck } from "../../keysToCheck/keysToCheck";

export default function TMODallasModal({
  addSite,
  show,
  handleClose,
  editingSite,
  setSites,
  isEditMode,
}) {
  const [formData, setFormData] = useState(new Site());
  const [error, setError] = useState(false);
  const [resError, setResError] = useState(false);
  const [astrik, setAstrik] = useState(false);
  const [errorLine, setErrorLine] = useState(
    "Resolution (*) field is mandatory when Status is changed to Closed."
  );

  const animatedComponents = makeAnimated();

  useEffect(() => {
    if (editingSite) {
      setFormData(editingSite);
    } else {
      setFormData({
        incTicketNumber: "",
        status: "Open",
        siteID: "",
        xPEX: "CAPEX",
        gc: "",
        techAffected: "",
        sector: [],
        category: "PIM - Internal",
        mcpsEng: "",
        workLog: "",
        case: [],
        incAssignedTo: "PAG",
        assignedGroup: "",
        assignee: "",
        dateAssigned: "",
        dateReassigned: "",
        pierStatus: "Assigned",
        resolution: "",
      });
    }
  }, [editingSite]);

  useEffect(() => {
    if (formData.status === "Closed") {
      setAstrik(true);
    } else {
      setAstrik(false);
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // check validation
    if (TMODallasKeysToCheck.some((key) => formData[key] === "")) {
      setError(true);
      return;
    }

    if (!event.target.checkValidity()) {
      return;
    }

    if (formData.status === "Closed" && !formData.resolution.trim()) {
      setResError(true);
      setAstrik(true);
      return;
    }

    if (editingSite && !formData.resolution.trim()) {
      setErrorLine(
        "Resolution (*) can't be left blank, if it was previously filled."
      );
      setResError(true);
      setAstrik(true);
      return;
    }

    const newSiteData = {
      ...formData,
    };

    setSites((prevSites) => {
      if (editingSite) {
        // Editing logic
        return prevSites.map((site) =>
          site.incTicketNumber === editingSite.incTicketNumber
            ? { ...editingSite, ...formData }
            : site
        );
      } else {
        // Adding a new site logic
        return [newSiteData, ...prevSites];
      }
    });

    handleClose();

    // reset form data
    setFormData({
      incTicketNumber: "",
      status: "Open",
      siteID: "",
      xPEX: "CAPEX",
      gc: "",
      techAffected: "",
      sector: [],
      category: "PIM - Internal",
      mcpsEng: "",
      workLog: "",
      case: [],
      incAssignedTo: "PAG",
      assignedGroup: "",
      assignee: "",
      dateAssigned: "",
      dateReassigned: "",
      pierStatus: "Assigned",
      resolution: "",
    });

    setError(false);

    console.log(formData);
  };

  useEffect(() => {
    // if user starts typing in the resolution field, remove the error
    if (formData.resolution.trim()) {
      setResError(false);
      setAstrik(false);
    }
  });

  const options = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
  ];

  const sectorOptions = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
    { value: "E", label: "E" },
    { value: "F", label: "F" },
  ];

  const techAffectedOptions = [
    { value: "L600", label: "L600" },
    { value: "L700", label: "L700" },
    { value: "L1900", label: "L1900" },
    { value: "L2100", label: "L2100" },
  ];

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
                  {/* INC Ticket # */}
                  <td className="w-full">
                    <label htmlFor="incTicketNumber" className="text-bold">
                      INC Ticket #
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      readOnly={!isEditMode}
                      type="text"
                      placeholder="INC Ticket #"
                      className="form-control"
                      value={formData.incTicketNumber}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          incTicketNumber: event.target.value,
                        }))
                      }
                      required
                    />
                  </td>

                  {/* Status */}
                  <td className="w-full">
                    <label htmlFor="status" className="text-bold">
                      STATUS
                    </label>
                    <span className="text-danger">*</span>
                    <div className="custom-select-wrapper">
                      <select
                        className="form-control w-full"
                        value={formData.status}
                        onChange={(event) =>
                          setFormData((prev) => ({
                            ...prev,
                            status: event.target.value,
                          }))
                        }
                        required
                      >
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                      </select>
                      <BiSolidDownArrow className="dropdown-icon" />
                    </div>
                  </td>

                  {/* Site ID */}
                  <td className="w-full">
                    <label htmlFor="siteID" className="text-bold">
                      SITE ID
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      readOnly={!isEditMode}
                      type="text"
                      placeholder="Site ID"
                      className="form-control"
                      value={formData.siteID}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          siteID: event.target.value,
                        }))
                      }
                      required
                    />
                  </td>

                  {/* xPEX */}
                  <td className="w-full">
                    <label htmlFor="xPEX" className="text-bold">
                      xPEX
                    </label>
                    <span className="text-danger">*</span>

                    <div className="custom-select-wrapper">
                      <select
                        className="form-control w-full"
                        value={formData.xPEX}
                        onChange={(event) =>
                          setFormData((prev) => ({
                            ...prev,
                            xPEX: event.target.value,
                          }))
                        }
                        required
                      >
                        <option value="CAPEX">CAPEX</option>
                        <option value="OPEX">OPEX</option>
                      </select>
                      <BiSolidDownArrow className="dropdown-icon" />
                    </div>
                  </td>

                  {/* GC */}
                  <td className="w-full">
                    <label htmlFor="gc" className="text-bold">
                      GC
                    </label>
                    <span className="text-danger">*</span>

                    <input
                      type="text"
                      placeholder="GC"
                      className="form-control"
                      value={formData.gc}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          gc: event.target.value,
                        }))
                      }
                      required
                    />

                    {/* <div className="custom-select-wrapper">
                      <select
                        className="form-control w-full"
                        value={formData.gc}
                        onChange={(event) =>
                          setFormData((prev) => ({
                            ...prev,
                            gc: event.target.value,
                          }))
                        }
                        required
                      >
                        <option value="NA">NA</option>
                        <option value="Manage GC">Manage GC</option>
                      </select>
                      <BiSolidDownArrow className="dropdown-icon" />
                    </div> */}
                  </td>
                </tr>

                <tr className="flex w-full">
                  {/* Tech Affected */}
                  <td className="w-full">
                    <label htmlFor="techAffected" className="text-bold">
                      TECH AFFECTED
                    </label>
                    <span className="text-danger">*</span>

                    {/* <input
                      type="text"
                      placeholder="Tech Affected"
                      className="form-control"
                      value={formData.techAffected}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          techAffected: event.target.value,
                        }))
                      }
                      required
                    /> */}

                    <Select
                      options={techAffectedOptions}
                      components={animatedComponents}
                      isMulti
                      closeMenuOnSelect={false}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: "1px solid #dee2e6",
                        }),
                      }}
                      value={formData.techAffected}
                      onChange={(selectedOptions) =>
                        setFormData((prev) => ({
                          ...prev,
                          techAffected: selectedOptions,
                        }))
                      }
                      required
                    />

                    {/* <div className="custom-select-wrapper">
                      <select
                        className="form-control"
                        value={formData.techAffected}
                        onChange={(event) =>
                          setFormData((prev) => ({
                            ...prev,
                            techAffected: event.target.value,
                          }))
                        }
                        required
                      >
                        <option value="Manage Tech">Manage Tech</option>
                        <option value="NA">NA</option>
                      </select>
                      <BiSolidDownArrow className="dropdown-icon" />
                    </div> */}
                  </td>

                  {/* Sector */}
                  <td className="w-full">
                    <label htmlFor="sector" className="text-bold">
                      SECTOR
                    </label>
                    <span className="text-danger">*</span>

                    <Select
                      options={sectorOptions}
                      components={animatedComponents}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: "1px solid #dee2e6",
                        }),
                      }}
                      isMulti
                      closeMenuOnSelect={false}
                      value={formData.sector}
                      onChange={(selectedOptions) =>
                        setFormData((prev) => ({
                          ...prev,
                          sector: selectedOptions,
                        }))
                      }
                      required
                    />

                    {/* <div className="custom-select-wrapper">
                      <select
                        className="form-control"
                        value={formData.sector}
                        onChange={(event) =>
                          setFormData((prev) => ({
                            ...prev,
                            sector: event.target.value,
                          }))
                        }
                        required
                      >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                      </select>
                      <BiSolidDownArrow className="dropdown-icon" />
                    </div> */}
                  </td>

                  {/* Category */}
                  <td className="w-full">
                    <label htmlFor="category" className="text-bold">
                      CATEGORY
                    </label>
                    <span className="text-danger">*</span>

                    <div className="custom-select-wrapper">
                      <select
                        className="form-control"
                        value={formData.category}
                        onChange={(event) =>
                          setFormData((prev) => ({
                            ...prev,
                            category: event.target.value,
                          }))
                        }
                        required
                      >
                        <option value="PIM - Internal">PIM - Internal</option>
                        <option value="PIM - External">PIM - External</option>
                        <option value="External Interference">
                          External Interference
                        </option>
                        <option value="PIM Internal / External Interference">
                          PIM Internal / External Interference
                        </option>
                        <option value="PIM Internal / PIM External">
                          PIM Internal / PIM External
                        </option>
                        <option value="No Issues">No Issues</option>
                        <option value="PIM - External / External Interference">
                          PIM - External / External Interference
                        </option>
                      </select>
                      <BiSolidDownArrow className="dropdown-icon" />
                    </div>
                  </td>

                  {/* MCPS Eng */}
                  <td className="w-full">
                    <label htmlFor="mcpsEng" className="text-bold">
                      MCPS ENG
                    </label>
                    <span className="text-danger">*</span>

                    <input
                      type="text"
                      placeholder="MCPS Eng"
                      className="form-control"
                      value={formData.mcpsEng}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          mcpsEng: event.target.value,
                        }))
                      }
                      required
                    />

                    {/* <div className="custom-select-wrapper">
                      <select
                        className="form-control"
                        value={formData.mcpsEng}
                        onChange={(event) =>
                          setFormData((prev) => ({
                            ...prev,
                            mcpsEng: event.target.value,
                          }))
                        }
                        required
                      >
                        <option value="Engineers">Engineers</option>
                      </select>
                      <BiSolidDownArrow className="dropdown-icon" />
                    </div> */}
                  </td>
                </tr>

                <tr className="flex w-full">
                  {/* Work Log */}
                  <td className="w-full">
                    <label htmlFor="workLog" className="text-bold">
                      WORK LOG
                    </label>
                    <span className="text-danger">*</span>

                    <textarea
                      cols="400"
                      rows="3"
                      className="form-control"
                      placeholder="Work Log"
                      value={formData.workLog}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          workLog: event.target.value,
                        }))
                      }
                    ></textarea>
                  </td>
                </tr>

                <tr className="flex w-full">
                  {/* Case */}
                  <td className="w-full">
                    <label htmlFor="case" className="text-bold">
                      CASE
                    </label>
                    <span className="text-danger">*</span>

                    <Select
                      options={options}
                      components={animatedComponents}
                      isMulti
                      required
                      closeMenuOnSelect={false}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: "1px solid #dee2e6",
                        }),
                      }}
                      value={formData.case}
                      onChange={(selectedOptions) =>
                        setFormData((prev) => ({
                          ...prev,
                          case: selectedOptions,
                        }))
                      }
                    />
                  </td>

                  {/* INC Assigned To */}
                  <td className="w-full">
                    <label htmlFor="incAssignedTo" className="text-bold">
                      INC ASSIGNED TO
                    </label>
                    <span className="text-danger">*</span>

                    <div className="custom-select-wrapper">
                      <select
                        className="form-control"
                        value={formData.incAssignedTo}
                        onChange={(event) =>
                          setFormData((prev) => ({
                            ...prev,
                            incAssignedTo: event.target.value,
                          }))
                        }
                        required
                      >
                        <option value="PAG">PAG</option>
                        <option value="UMLAUT">UMLAUT</option>
                        <option value="FOPS">FOPS</option>
                        <option value="TMO-RF">TMO-RF</option>
                      </select>
                      <BiSolidDownArrow className="dropdown-icon" />
                    </div>
                  </td>

                  {/* Assigned Group */}
                  <td className="w-full">
                    <label htmlFor="assignedGroup" className="text-bold">
                      ASSIGNED GROUP
                    </label>
                    <span className="text-danger">*</span>

                    <input
                      type="text"
                      placeholder="Assigned Group"
                      className="form-control"
                      value={formData.assignedGroup}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          assignedGroup: event.target.value,
                        }))
                      }
                      required
                    />
                  </td>

                  {/* Assignee */}
                  <td className="w-full">
                    <label htmlFor="assignee" className="text-bold">
                      ASSIGNEE
                    </label>
                    <span className="text-danger">*</span>

                    <input
                      type="text"
                      placeholder="Assignee"
                      className="form-control"
                      value={formData.assignee}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          assignee: event.target.value,
                        }))
                      }
                      required
                    />
                  </td>
                </tr>

                <tr className="flex w-full">
                  {/* Date Assigned */}
                  <td className="w-full">
                    <label htmlFor="dateAssigned" className="text-bold">
                      DATE ASSIGNED
                    </label>
                    <span className="text-danger">*</span>

                    <input
                      type="date"
                      placeholder="Date Assigned"
                      className="form-control"
                      value={formData.dateAssigned}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          dateAssigned: event.target.value,
                        }))
                      }
                      required
                    />
                  </td>

                  {/* Date Reassigned */}
                  <td className="w-full">
                    <label htmlFor="dateReassigned" className="text-bold">
                      DATE REASSIGNED
                    </label>

                    <input
                      type="date"
                      placeholder="Date Reassigned"
                      className="form-control"
                      value={formData.dateReassigned}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          dateReassigned: event.target.value,
                        }))
                      }
                      required
                    />
                  </td>

                  {/* Pier Status */}
                  <td className="w-full">
                    <label htmlFor="pierStatus" className="text-bold">
                      PIER STATUS
                    </label>
                    <span className="text-danger">*</span>

                    <div className="custom-select-wrapper">
                      <select
                        className="form-control"
                        value={formData.pierStatus}
                        onChange={(event) =>
                          setFormData((prev) => ({
                            ...prev,
                            pierStatus: event.target.value,
                          }))
                        }
                        required
                      >
                        <option value="Assigned">Assigned</option>
                        <option value="Closed">Closed</option>
                        <option value="Waiting">Waiting</option>
                        <option value="Working">Working</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                      <BiSolidDownArrow className="dropdown-icon" />
                    </div>
                  </td>
                </tr>
                <tr className="flex w-full">
                  {/* Resolution */}
                  <td className="w-full">
                    <label htmlFor="resolution" className="text-bold">
                      RESOLUTION
                    </label>
                    {astrik && <span className="text-danger">*</span>}

                    <textarea
                      cols="400"
                      rows="3"
                      className="form-control"
                      placeholder="Resolution"
                      value={formData.resolution}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          resolution: event.target.value,
                        }))
                      }
                    ></textarea>
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
            {resError && (
              <div>
                <p className="text-danger text-bold">{errorLine}</p>
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
