import "./App.css";

import ExtracurricularsBox from "./components/ExtracurricularsBox";
import ScholarshipsBox from "./components/ScholarshipsBox";
import ExtraSpace from "./components/ExtraSpace";

function App() {
  return (
    <>
      <div className="cards">
        <ExtracurricularsBox />
        <ScholarshipsBox />
        <ExtraSpace />
      </div>
    </>
  );
}

export default App;
