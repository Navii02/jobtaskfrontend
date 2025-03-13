import "./App.css";
import Excel from "./components/Excel";
import ExcelParser from "./components/ExcelParser";
import Table from "./components/Table";
import ThreeDCanvas from "./components/ThreeDCanvas";

function App() {
  return (
    <>
      <Table />

      <ThreeDCanvas />
      <ExcelParser/>
      {/* <Excel/> */}
    </>
  );
}

export default App;
