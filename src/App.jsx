import "./App.css";
import Excel from "./components/Excel";
import ExcelParser from "./components/ExcelParser";
import Table from "./components/Table";
import ThreeDCanvas from "./components/ThreeDCanvas";

function App() {
  return (
    <>
      <Table />
      <div className="mt-5">
        
        <ThreeDCanvas />
      </div>

      <ExcelParser />
      {/* <Excel/> */}
    </>
  );
}

export default App;
