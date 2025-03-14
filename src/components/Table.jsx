import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

function Table() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    orderListId: "",
    buildingId: "",
    buildingName: "",
    buildingAddress: "",
    orderDescription: "",
    remarks: "",
    prepBy: "",
    prepDate: "",
    chkBy: "",
    chkDate: "",
    approvedBy: "",
    approvedDate: "",
  });

  const [rows, setRows] = useState([
    {
      id: 1,
      orderId: "",
      itemNr: "",
      materialid:"",
      materialDesc: "",
      currentQty: "",
      prevQty: "",
      diff: "",
      comments: "",
    },
  ]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleRowChange = (id, field, value) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        orderId: "",
        itemNr: "",
        materialid: "",
        materialDesc: "",
        currentQty: "",
        prevQty: "",
        diff: "",
        comments: "",
      },
    ]);
  };
  
  const removeSelectedRows = () => {
    const updatedRows = rows.filter((row) => !selectedRows.includes(row.id));
    setRows(updatedRows);
    setSelectedRows([]); // Clear selection
  };

  // Toggle checkbox selection
  const handleCheckboxChange = (id) => {
    setSelectedRows(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((rowId) => rowId !== id) // Deselect if already selected
          : [...prevSelected, id] // Select if not selected
    );
  };

  const handleSendForCheck = () => {
    alert("Order sent for check!");
    setStep(2); // Enable "SEND FOR APP"
  };

  const handleSendForApp = () => {
    alert("Order sent for approval!");
    setStep(3); // Enable "APPROVE"
  };
  const setClear = () => {
    setFormData({
      orderListId: "",
      buildingId: "",
      buildingName: "",
      buildingAddress: "",
      orderDescription: "",
      remarks: "",
      prepBy: "",
      prepDate: "",
      chkBy: "",
      chkDate: "",
      approvedBy: "",
      approvedDate: "",
    });
    setRows([
      {
        id: 1,
        orderId: "",
        itemNr: "",
        materialid: "",
        materialDesc: "",
        currentQty: "",
        prevQty: "",
        diff: "",
        comments: "",
      },
    ]);
  };
  


  const handleApprove = () => {

    alert("Order approved!");
  };
  const handleDelete = () => {
    setClear()
    alert("All data deleted!");
  };

  const handleCancel = () => {
    setClear()
    alert("Operation canceled!");
  };

  const handleSave = () => {
    setClear()
    alert("Order saved successfully!");
  
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
            <input
              type="text"
              className="form-control"
              placeholder="XXXX"
              name="orderListId"
              value={formData.orderListId}
              onChange={handleInputChange}
            />
          </div>
          <label className="col-sm-1 col-form-label fw-bold">BUILDING ID</label>
          <div className="col-sm-1">
            <input
              type="text"
              className="form-control"
              placeholder="XXXX"
              name="buildingId"
              value={formData.buildingId}
              onChange={handleInputChange}
            />
          </div>
          <label className="col-sm-1 col-form-label fw-bold">
            BUILDING NAME
          </label>
          <div className="col-sm-1">
            <input
              type="text"
              className="form-control"
              placeholder="XXXX"
              name="buildingName"
              value={formData.buildingName}
              onChange={handleInputChange}
            />
          </div>
          <label className="col-sm-1 col-form-label fw-bold">
            BUILDING ADDRESS
          </label>
          <div className="col-sm-2">
            <input
              type="text"
              className="form-control"
              placeholder="XXXX"
              name="buildingAddress"
              value={formData.buildingAddress}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="my-3 row align-items-center">
          <label className="col-sm-2 col-form-label fw-bold">
            ORDER DESCRIPTION
          </label>
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control"
              placeholder="XXXX"
              name="orderDescription"
              value={formData.orderDescription}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="my-3 row align-items-center border rounded shadow">
          <div className="mt-3">
            <div className="row text-dark fw-bold text-uppercase">
              <div className="col-1 "></div>
              <div className="col-1">orderList tenNr/UID</div>
              <div className="col-1">ITEM NR.</div>
              <div className="col-1 ">MATERIAL ID</div>
              <div className="col-2 ">MAT. DESCRIPTION</div>
              <div className="col-1">CURRENT QTY</div>
              <div className="col-1">PREVIOUS QTY</div>
              <div className="col-1">QTY DIFF</div>
              <div className="col-1">Order Comment</div>
              <div className="col-1 text-end">
                <FaPlus
                  className="me-2 text-primary"
                  onClick={addRow}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="col-1 ">
                <FaMinus
                  className="me-2 text-danger"
                  onClick={removeSelectedRows}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
          <div>
            {rows?.map((row, index) => (
              <div
                key={index}
                className=" my-3 row align-items-center mt-2 p-2"
              >
                <div
                  className="col-1 d-flex justify-content-center align-items-center"
                  style={{ position: "relative" }}
                >
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleCheckboxChange(row.id)}
                    style={{
                      width: "30px",
                      height: "30px",
                      border: "2px solid rgb(255, 255, 255)",
                      borderRadius: "4px",
                      backgroundColor: "white",
                      cursor: "pointer",
                      position: "relative",
                      display: "inline-block",
                    }}
                  />
                </div>

                <div className="col-1">
                  <input
                    type="text"
                    name="orderId"
                    className="form-control"
                    placeholder="XXXX"
                    value={row.orderId}
                    onChange={(e) =>
                      handleRowChange(row.id, "orderId", e.target.value)
                    }
                  />
                </div>
                <div className="col-1">
                  <input
                    type="text"
                    className="form-control"
                    value={index + 1}
                    onChange={(e) =>
                      handleRowChange(row.id, "itemNr", e.target.value)
                    }
                    readOnly
                  />
                </div>

                <div className="col-1">
                  <input
                    type="text"
                    className="form-control text-danger"
                    placeholder="XXXX"
                    name="materialid"
                    value={row.materialid}
                    onChange={(e) =>
                      handleRowChange(row.id, "materialid", e.target.value)
                    }
                  />
                </div>
                <div className="col-2">
                  <input
                    type="text"
                    className="form-control text-danger"
                    placeholder="XXXX"
                    name="materialDesc"
                    value={row.materialDesc}
                    onChange={(e) =>
                      handleRowChange(row.id, "materialDesc", e.target.value)
                    }
                  />
                </div>
                <div className="col-1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="XXXX"
                    name="currentQty"
                    value={row.currentQty}
                    onChange={(e) =>
                      handleRowChange(row.id, "currentQty", e.target.value)
                    }
                  />
                </div>
                <div className="col-1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="XXXX"
                    name="prevQty"
                    value={row.prevQty}
                    onChange={(e) =>
                      handleRowChange(row.id, "prevQty", e.target.value)
                    }
                  />
                </div>
                <div className="col-1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="XXXX"
                    name="diff"
                    value={row.diff}
                    onChange={(e) =>
                      handleRowChange(row.id, "diff", e.target.value)
                    }
                  />
                </div>
                <div className="col-1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="XXXX"
                    name="comments"
                    value={row.comments}
                    onChange={(e) =>
                      handleRowChange(row.id, "comments", e.target.value)
                    }
                  />
                </div>
                <div className="col-1"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="my-4 row align-items-center mb-5">
          <label className="col-sm-1 col-form-label fw-bold">REMARKS</label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              placeholder="XXXX"
              name="remarks"
              value={formData.remarks}
              onChange={handleInputChange}
            />
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
              name="prepBy"
              value={formData.prepBy}
              onChange={handleInputChange}
            />
            <label className="fw-bold">DATE</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="XXXX"
              name="prepDate"
              value={formData.prepDate}
              onChange={handleInputChange}
            />
            <button
              className="btn btn-primary mt-3 w-100"
              onClick={handleSendForCheck}
            >
              SEND FOR CHK
            </button>
          </div>

          {/* CHK By */}
          <div className="col-md-2">
            <label className="fw-bold">CHK BY</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="XXXX"
              name="chkBy"
              value={formData.chkBy}
              onChange={handleInputChange}
            />
            <label className="fw-bold">DATE</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="XXXX"
              name="chkDate"
              value={formData.chkDate}
              onChange={handleInputChange}
            />
            <button
              className="btn btn-primary mt-3 w-100"
              onClick={handleSendForApp}
              disabled={step < 2}
            >
              SEND FOR APP
            </button>
          </div>

          {/* Approved By */}
          <div className="col-md-2">
            <label className="fw-bold">APPROVED BY</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="XXXX"
              name="approvedBy"
              value={formData.approvedBy}
              onChange={handleInputChange}
            />
            <label className="fw-bold">DATE</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="XXXX"
              name="approvedDate"
              value={formData.approvedDate}
              onChange={handleInputChange}
              F
            />
            <button
              className="btn btn-primary mt-3 w-100"
              onClick={handleApprove}
              disabled={step < 3}
            >
              APPROVE
            </button>
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
            <button className="btn btn-danger me-4" onClick={handleDelete}>
              DELETE
            </button>
            <button className="btn btn-warning me-4" onClick={handleCancel}>
              CANCEL
            </button>
            <button className="btn btn-success" onClick={handleSave}>
              SAVE
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
