import { useEffect, useState } from "react";

// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {
  getFirestore,
  getDoc,
  setDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA16yaAxO3TOHviedgcYEFK8W53zCk8emA",
  authDomain: "intellect-25f8c.firebaseapp.com",
  projectId: "intellect-25f8c",
  storageBucket: "intellect-25f8c.appspot.com",
  messagingSenderId: "830660117047",
  appId: "1:830660117047:web:a3d2d45284a70ad1c7f5b2",
};

// Initialize
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const username = localStorage.getItem("username");

function FChecklist() {
  let fObj = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  };

  let fitems = [
    "Familiarize yourself with your teachers.",
    "Explore clubs and pick out ones to stick to for all four years.",
    "Take up AP classes and the AP tests.",
    "Take up summer extracurriculars and/or college courses. (Best if related to intended major)",
    "Freshman year counts! Do not slack.",
  ];
  //hey follow my cursor
  const [bools, setBools] = useState([]);

  async function fetchData() {
    const docRef = doc(db, "checklists", username);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const values = Object.values(data.fchecklist);
      console.log(values);
      setBools(values);
    } else {
      await setDoc(docRef, { fchecklist: fObj }, { merge: true });
      setBools([false, false, false, false, false]);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = async (index) => {
    try {
      // Get the current value of the item
      const currentValue = bools[index];

      // Toggle the value
      const newValue = !currentValue;

      // Update the Firestore document
      const docRef = doc(db, "checklists", username);
      await updateDoc(docRef, {
        [`fchecklist.${index}`]: newValue,
      });

      // Update the local state
      setBools((prevBools) => {
        const updatedBools = [...prevBools];
        updatedBools[index] = newValue;
        return updatedBools;
      });
    } catch (err) {
      console.log("Error updating document: " + err);
    }
  };

  return (
    <>
      <div className="checklistContent">
        <h1>Freshman</h1>
        <ul>
          {bools.map((item, index) => (
            <li
              key={index}
              onClick={() => handleClick(index)}
              style={{
                textDecoration: item ? "line-through" : "none",
                color: item ? "red" : "black",
              }}
            >
              {fitems[index]}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default FChecklist;
