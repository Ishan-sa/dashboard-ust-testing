import { Button, Modal } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { PO } from "../../models/po-lookup";
import { BiSolidDownArrow } from "react-icons/bi";
import { POLookupsKeysToCheck } from "../../keysToCheck/keysToCheck";

export default function POLookupsModal({
  addPO,
  editingPo,
  show,
  handleClose,
  setPO,
}) {
  const [formData, setFormData] = useState(new PO());
  const [error, setError] = useState(false);

  const PORef = useRef(null);
  const QuantityRef = useRef(null);
  const ActualRef = useRef(null);

  const options = [
    { value: "Select", label: "Select" },
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" },
    { value: "2026", label: "2026" },
    { value: "2027", label: "2027" },
    { value: "2028", label: "2028" },
    { value: "2029", label: "2029" },
    { value: "2030", label: "2030" },
  ];

  const monthOptions = [
    { value: "Select", label: "Select" },
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  useEffect(() => {
    if (editingPo) {
      setFormData(editingPo);
    } else {
      setFormData(new PO());
    }
  }, [editingPo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // check validation
    if (POLookupsKeysToCheck.some((key) => formData[key] === "")) {
      setError(true);
      return;
    }

    const newPoData = {
      ...formData,
    };

    setPO((prevPO) => {
      if (editingPo) {
        const index = prevPO.findIndex((po) => po.po === editingPo.po);
        const updatedPO = [...prevPO];
        updatedPO[index] = newPoData;
        return updatedPO;
      } else {
        return [...prevPO, newPoData];
      }
    });

    setError(false);
    handleClose();

    // reset form data
    setFormData(new PO());
    console.log("handleSubmit", formData);
  };

  /* useEffect(() => {
    const po = PORef.current;
    const qnty = QuantityRef.current;
    const actual = ActualRef.current;

    const forceNumericInput = (event) => {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
    };

    if (po) {
      po.addEventListener("input", forceNumericInput);
    }

    if (qnty) {
      qnty.addEventListener("input", forceNumericInput);
    }

    if (actual) {
      actual.addEventListener("input", forceNumericInput);
    }

    // Cleanup
    return () => {
      if (po) {
        po.removeEventListener("input", forceNumericInput);
      }

      if (qnty) {
        qnty.removeEventListener("input", forceNumericInput);
      }

      if (actual) {
        actual.removeEventListener("input", forceNumericInput);
      }
    };
  }, [formData]); */

  return (
    <>
      <Button
        variant="custom"
        onClick={addPO}
        style={{
          backgroundColor: "#003c68",
          color: "white",
        }}
      >
        Add a PO{" "}
      </Button>

      <form onSubmit={handleSubmit}>
        <Modal show={show} onHide={handleClose} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>{editingPo ? "Edit PO" : "Add a PO"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className="table form-control">
              <tbody className="flex flex-col w-full">
                <tr className="flex w-full">
                  <td className="w-full">
                    <label htmlFor="Year" className="text-bold">
                      Year
                    </label>
                    <span className="text-danger">*</span>

                    <div className="custom-select-wrapper">
                      <select
                        className="form-control w-full"
                        value={formData.year}
                        onChange={(event) =>
                          setFormData((prev) => ({
                            ...prev,
                            year: event.target.value,
                          }))
                        }
                        required
                      >
                        {options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <BiSolidDownArrow className="dropdown-icon" />
                    </div>
                  </td>

                  <td className="w-full">
                    <label htmlFor="Months" className="text-bold">
                      Month
                    </label>
                    <span className="text-danger">*</span>

                    <div className="custom-select-wrapper">
                      <select
                        className="form-control w-full"
                        value={formData.month}
                        onChange={(event) =>
                          setFormData((prev) => ({
                            ...prev,
                            month: event.target.value,
                          }))
                        }
                        required
                      >
                        {monthOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <BiSolidDownArrow className="dropdown-icon" />
                    </div>
                  </td>

                  <td className="w-full">
                    <label htmlFor="Activity" className="text-bold">
                      Activity
                    </label>
                    <span className="text-danger">*</span>

                    <div className="custom-select-wrapper">
                      <select
                        className="form-control w-full"
                        value={formData.activity}
                        onChange={(event) =>
                          setFormData((prev) => ({
                            ...prev,
                            activity: event.target.value,
                          }))
                        }
                        required
                      >
                        <option value="Select">Select</option>
                        <option value="CAPEX">CAPEX</option>
                        <option value="OPEX">OPEX</option>
                      </select>
                      <BiSolidDownArrow className="dropdown-icon" />
                    </div>
                  </td>
                </tr>

                <tr className="flex w-full">
                  <td className="w-full">
                    <label htmlFor="PO" className="text-bold">
                      PO
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      type="text"
                      placeholder="PO"
                      className="form-control w-full"
                      value={formData.poNumber}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          poNumber: event.target.value,
                        }))
                      }
                      ref={PORef}
                      required
                    />
                  </td>
                  <td className="w-full">
                    <label htmlFor="Quantity" className="text-bold">
                      Quantity
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      type="text"
                      placeholder="Quantity"
                      className="form-control w-full"
                      value={formData.qnty}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          qnty: event.target.value,
                        }))
                      }
                      ref={QuantityRef}
                      required
                    />
                  </td>
                  <td className="w-full">
                    <label htmlFor="Actual" className="text-bold">
                      Actual
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      type="text"
                      placeholder="Actual"
                      className="form-control w-full"
                      value={formData.actual}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          actual: event.target.value,
                        }))
                      }
                      ref={ActualRef}
                      required
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
