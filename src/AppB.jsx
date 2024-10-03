import FChecklist from "./components/FChecklist";
import SoChecklist from "./components/SoChecklist";
import JChecklist from "./components/JChecklist";
import SeChecklist from "./components/SeChecklist";
import "./AppB.css";

function AppB() {
  return (
    <>
      <div className="checklistBoxesContainer">
        <div className="checklistChildren">
          <FChecklist />
        </div>
        <div className="checklistChildren">
          <SoChecklist />
        </div>
        <div className="checklistChildren">
          <JChecklist />
        </div>
        <div className="checklistChildren">
          <SeChecklist />
        </div>
      </div>
    </>
  );
}

export default AppB;
