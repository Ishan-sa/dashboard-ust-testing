import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

/** @typedef {import('../../../../backend/src/models/PO-Lookups')} PO */

/**
 * @param {object} params
 * @param {PO[]} params.poLookups
 * @return {*}
 */

export default function POLookupsTable({
  poLookups,
  onDelete = () => {},
  onEdit = () => {},
}) {
  const tableHeader = [
    "Year",
    "Month",
    "Activity",
    "PO",
    "Quantity",
    "Actual",
    "Actions",
  ];

  return (
    <>
      <table className="table table-bordered border-black">
        <thead>
          <tr className="uppercase text-center">
            {tableHeader.map((header, index) => {
              return <th key={index}>{header}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {poLookups.map((poLookup, index) => (
            <tr key={index} className="text-center">
              <td>{poLookup.year}</td>
              <td>{poLookup.month}</td>
              <td>{poLookup.activity}</td>
              <td>{poLookup.poNumber}</td>
              <td>{poLookup.quantity}</td>
              <td>{poLookup.actual}</td>
              <td className="actionContainer">
                <BiEdit
                  style={{ height: "30px", width: "30px", cursor: "pointer" }}
                  onClick={() => onEdit(poLookup.poNumber)}
                />
                <AiFillDelete
                  style={{ height: "30px", width: "30px", cursor: "pointer" }}
                  onClick={(event) => {
                    event.stopPropagation();
                    onDelete(poLookup.poNumber);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
