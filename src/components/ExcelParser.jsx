import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

const ExcelParser = () => {
  const [fileName, setFileName] = useState("");
  const [MaterialfileName, setMaterialfileName] = useState("");
  const [parsedData, setParsedData] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [RetrivedData, setRetrivedData] = useState([]);
  const [materialdata, setmaterialdata] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setFileName(file.name);
    processFile(file);
  };

  const handleFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setMaterialfileName(file.name);

    setLoading(true);
    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = (e) => {
      const binaryString = e.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      if (jsonData.length === 0) {
        setAlertMessage("Invalid file format.");
        setLoading(false);
        return;
      }

      const extractedHeaders = jsonData[0];
      setHeaders(extractedHeaders);
      setmaterialdata(jsonData.slice(1));

      setTimeout(() => setLoading(false), 1000);
    };
  };

  const sendDataToBackend = async () => {
    if (!materialdata.length) {
      setAlertMessage("No data to save. Please upload and process a file first.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/uploadData", { materialdata });
      if (response.status === 200) {
        alert("Data uploaded successfully!");
      }
    } catch (error) {
      handleResponseError(error);
    }
    setLoading(false);
  };

  const handleShowData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/combineData");
      const sortedData = sortDataBySize(response.data.matchedData);
      setRetrivedData(sortedData);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleResponseError = (error) => {
    if (error.response) {
      if (error.response.status === 406) {
        alert("Some or all records already exist.");
      } else if (error.response.status === 500) {
        alert("Internal Server Error. Please try again later.");
      } else if (error.response.status === 404) {
        alert("Server not found. Check the backend connection.");
      } else {
        alert("An unexpected error occurred.");
      }
    } else {
      alert("Failed to connect to the server. Please try again later.");
    }
  };

  // Function to sort data based on Size1 (Headersize) within each Item Type
  const sortDataBySize = (data) => {
    const groupedData = data.reduce((acc, item) => {
      const type = item.ITEM_TYPE || "Unknown";
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(item);
      return acc;
    }, {});

    Object.keys(groupedData).forEach((type) => {
      groupedData[type].sort((a, b) => parseFloat(a.Headersize) - parseFloat(b.Headersize));
    });

    return Object.values(groupedData).flat();
  };

  return (
    <>
      <div className="container shadow">
        <div className="row justify-content-center mt-4">
          {/* Branch Details */}
          <div className="col-md-5 mt-5">
            <div className="container d-flex flex-column align-items-center p-4 bg-light shadow rounded">
              <h4 className="mb-3 text-center">Branch Details</h4>
              <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
              {fileName && <p className="text-success mt-2">Uploaded: {fileName}</p>}
              <button className="btn btn-primary mt-3" onClick={sendDataToBackend} disabled={loading}>
                {loading ? "Saving..." : "Save Branch Data"}
              </button>
            </div>
          </div>

          {/* Material Details */}
          <div className="col-md-5 mt-5">
            <div className="container d-flex flex-column align-items-center p-4 bg-light shadow rounded">
              <h4 className="mb-3 text-center">Material Details</h4>
              <input type="file" accept=".xlsx, .xls" onChange={handleFile} />
              {MaterialfileName && <p className="text-success mt-2">Uploaded: {MaterialfileName}</p>}
              <button className="btn btn-primary mt-3" onClick={sendDataToBackend} disabled={loading}>
                {loading ? "Uploading..." : "Save Material Data"}
              </button>
            </div>
          </div>
        </div>

        {/* Show Data Button */}
        <div className="container text-center d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
          <button className="btn btn-success m-5" onClick={handleShowData} disabled={loading}>
            {loading ? "Loading..." : "Show Material Details"}
          </button>
        </div>

        {/* Material Data List */}
        {RetrivedData.length > 0 && (
          <div className="container">
            <h2 className="mt-4 text-center">Material Data List</h2>
            <table className="table table-bordered table-hover rounded">
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>Size1</th>
                  <th>Size2</th>
                  <th>Item Type</th>
                  <th>Geometric Standard</th>
                  <th>VDS</th>
                  <th>End Connection 1</th>
                  <th>End Connection 2</th>
                  <th>Material Description</th>
                  <th>MDS</th>
                  <th>Rating</th>
                  <th>Schedule</th>
                  <th>Notes</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {RetrivedData.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.Headersize}</td>
                    <td>{item.branchSize}</td>
                    <td>{item.ITEM_TYPE}</td>
                    <td>{item.GEOMETRIC_STANDARD}</td>
                    <td>{item.VDS}</td>
                    <td>{item.END_CONN1}</td>
                    <td>{item.END_CONN2}</td>
                    <td>{item.MATERIAL_DESCR}</td>
                    <td>{item.MDS}</td>
                    <td>{item.RATING}</td>
                    <td>{item.SCHD}</td>
                    <td>{item.NOTES}</td>
                    <td>{item.Type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ExcelParser;
