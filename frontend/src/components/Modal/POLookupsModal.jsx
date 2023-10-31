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
}) {
  const [formData, setFormData] = useState(new PO());
  const [error, setError] = useState(false);
  const [years, setYears] = useState([]);
  const [combo, setCombo] = useState([]);
  const [actualVal, setActualVal] = useState(0);

  const PORef = useRef(null);
  const QuantityRef = useRef(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check validation
    if (POLookupsKeysToCheck.some((key) => formData[key] === "")) {
      setError(true);
      return;
    }

    try {
      if (editingPo !== null) {
        // editing logic
        const response = await fetch(
          `http://localhost:8888/po-lookups/${editingPo.poNumber}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const responseData = await response.json();
        console.log("responseData from PO LOOKUP", responseData);
      } else {
        // adding logic
        let month = monthToNumber(formData.month);
        const tmoArray = await (
          await fetch("http://localhost:8888/tmo-main/lookup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              dateAssigned: formData.year + "-" + month,
              xPEX: formData.activity,
            }),
          })
        ).json();
        formData.actual = tmoArray.length.toString();
        const response = await fetch("http://localhost:8888/po-lookups", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        console.log("Added a PO", formData);
      }
    } catch (error) {
      console.log("Error saving data", error);
    }

    setError(false);
    handleClose();

    // reset form data
    setFormData(new PO());
  };

  // handleSubmit ends here

  async function getYearMonthXPEX() {
    const response = await fetch("http://localhost:8888/tmo-main");
    const data = await response.json();
    const dateAssigned = data.map((item) => item.dateAssigned);
    const months = dateAssigned.map((item) => item.slice(5, 7));
    const xPEX = data.map((item) => item.xPEX);

    // Create a Set to remove duplicates
    const uniqueYears = new Set(dateAssigned.map((item) => item.slice(0, 4)));

    // Convert Set back to an array
    const yearsArray = [...uniqueYears];

    setYears(yearsArray);
  }

  const monthToNumber = (monthName) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return String(months.indexOf(monthName) + 1).padStart(2, "0");
  };

  useEffect(() => {
    getYearMonthXPEX();
  }, []);

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
                        <option value="Select">Select</option>
                        {years.map((year, index) => (
                          <option key={index} value={year}>
                            {year}
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
                      value={formData.quantity}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          quantity: event.target.value,
                        }))
                      }
                      ref={QuantityRef}
                      required
                    />
                  </td>
                  {/* <td className="w-full">
                    <label htmlFor="Actual" className="text-bold">
                      Actual
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      readOnly
                      type="text"
                      placeholder="Read Only"
                      className="form-control w-full"
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          actual: event.target.value,
                        }))
                      }
                      value={formData.actual}
                      ref={ActualRef}
                      required
                    />
                  </td> */}
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
