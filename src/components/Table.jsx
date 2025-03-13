import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

function Table() {
  const [rows, setRows] = useState([{ id: 1 }]);

  const addRow = () => {
    setRows([...rows, { id: rows.length + 1 }]);
  };

  const removeRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };
  return (
    <>
      <div className="container p-5 shadow  ">
        <div className="border shadow rounded top p-2 bg-info text-center">
          <h1>ORDER MATERIALS</h1>
        </div>
        <div className="my-3 row align-items-center">
          <label className="col-sm-2 col-form-label fw-bold">
            ORDER LIST ID
          </label>
          <div className="col-sm-2">
            <input type="text" className="form-control" placeholder="XXXX" />
          </div>
          <label className="col-sm-1 col-form-label fw-bold">BUILDING ID</label>
          <div className="col-sm-1">
            <input type="text" className="form-control" placeholder="XXXX" />
          </div>
          <label className="col-sm-1 col-form-label fw-bold">
            BUILDING NAME
          </label>
          <div className="col-sm-1">
            <input type="text" className="form-control" placeholder="XXXX" />
          </div>
          <label className="col-sm-1 col-form-label fw-bold">
            BUILDING ADDRESS
          </label>
          <div className="col-sm-2">
            <input type="text" className="form-control" placeholder="XXXX" />
          </div>
        </div>

        <div className="my-3 row align-items-center">
          <label className="col-sm-2 col-form-label fw-bold">
            ORDER DESCRIPTION
          </label>
          <div className="col-sm-6">
            <input type="text" className="form-control" placeholder="XXXX" />
          </div>
        </div>
        <div className="my-3 row align-items-center border rounded shadow">
          <div className="mt-3">
            <div className="row text-dark fw-bold text-uppercase">
              <div className="col-1">orderList tenNr/UID</div>
              <div className="col-1">ITEM NR.</div>
              <div className="col-2 ">MATERIAL ID</div>
              <div className="col-2 ">MAT. DESCRIPTION</div>
              <div className="col-1">CURRENT QTY</div>
              <div className="col-1">PREVIOUS QTY</div>
              <div className="col-1">QTY DIFF</div>
              <div className="col-2">Order Comment</div>
              <div className="col-1 text-end">
                <FaPlus
                  className="me-2 text-primary"
                  onClick={addRow}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
          <div>
            {rows.map((row, index) => (
              <div
                key={index}
                className=" my-3 row align-items-center mt-2 p-2"
              >
                <div className="col-1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="XXXX"
                  />
                </div>
                <div className="col-1">
                  <input
                    type="text"
                    className="form-control"
                    value={index + 1}
                    readOnly
                  />
                </div>

                <div className="col-2">
                  <input
                    type="text"
                    className="form-control text-danger"
                    placeholder="XXXX"
                  />
                </div>
                <div className="col-2">
                  <input
                    type="text"
                    className="form-control text-danger"
                    placeholder="XXXX"
                  />
                </div>
                <div className="col-1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="XXXX"
                  />
                </div>
                <div className="col-1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="XXXX"
                  />
                </div>
                <div className="col-1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="XXXX"
                  />
                </div>
                <div className="col-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="XXXX"
                  />
                </div>
                <div className="col-1">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeRow(index)}
                  >
                    <FaMinus />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="my-4 row align-items-center mb-5">
          <label className="col-sm-1 col-form-label fw-bold">REMARKS</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" placeholder="XXXX" />
          </div>
        </div>
        <div className="row mt-5">
          {/* Prep By */}
          <div className="col-md-2">
            <label className="fw-bold">PREP BY</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="XXXX"
            />
            <label className="fw-bold">DATE</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="XXXX"
            />
            <button className="btn btn-primary mt-3 w-100">SEND FOR CHK</button>
          </div>

          {/* CHK By */}
          <div className="col-md-2">
            <label className="fw-bold">CHK BY</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="XXXX"
            />
            <label className="fw-bold">DATE</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="XXXX"
            />
            <button className="btn btn-primary mt-3 w-100">SEND FOR APP</button>
          </div>

          {/* Approved By */}
          <div className="col-md-2">
            <label className="fw-bold">APPROVED BY</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="XXXX"
            />
            <label className="fw-bold">DATE</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="XXXX"
            />
            <button className="btn btn-primary mt-3 w-100">APPROVE</button>
          </div>
          <div className="col-md-3 "></div>
          {/* Building Info */}
          <div className="col-md-3 mt-3 text-center">
            <label className="fw-bold">BUILDING ID</label>
            <div className=" p-2">-----</div>
            <label className="fw-bold">BUILDING NAME</label>
            <div className="p-2">-----</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="row mt-5 text-center">
          <div className="col mt-3">
            <button className="btn btn-danger me-4">DELETE</button>
            <button className="btn btn-warning me-4">CANCEL</button>
            <button className="btn btn-success">SAVE</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
