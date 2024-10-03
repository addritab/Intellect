// React Imports
import { useEffect, useState } from "react";
import "./ComponentStyle.css";
// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {
	getFirestore,
	getDoc,
	setDoc,
	doc,
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

function ExtracurricularsBox() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [ecList, setEcList] = useState(["(Click on entry to remove item)"]);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		const fetchData = () => {
			const docRef = doc(db, "data", username);
			getDoc(docRef)
				.then((docSnap) => {
					if (docSnap.exists()) {
						const userData = docSnap.data();
						console.log("Array from firestore: " + userData.extracurriculars);
						setData(userData.extracurriculars);
						localStorage.setItem(
							"data_extracurriculars",
							userData.extracurriculars.join(","),
						);
						localStorage.setItem("dataAvail", true);
					} else {
						setDoc(docRef, { extracurriculars: [] })
							.then(() => {
								console.log("Extracurriculars array created!");
							})
							.catch((error) => {
								console.log("FIREBASE ERROR: " + error);
							});
					}
				})
				.catch((error) => {
					console.error("Error fetching document:", error);
				})
				.finally(() => {
					setLoading(false);
				});
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (localStorage.getItem("dataAvail")) {
			const data = localStorage.getItem("data_extracurriculars");
			const dataArr = data ? data.split(",") : [];
			console.log("array from local storage: " + dataArr);
			setEcList(dataArr);
		}
	}, [data]);

	const updateData = (arg) => {
		const docRef = doc(db, "data", username);
		setDoc(docRef, { extracurriculars: [...arg] }, { merge: true })
			.then(() => {
				console.log("Info saved");
			})
			.catch((error) => {
				console.log("FIREBASE ERROR:" + error);
			});
	};

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const removeItem = (indexToRemove) => {
		setEcList((prevItems) =>
			prevItems.filter((item, index) => index !== indexToRemove),
		);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const updatedList = [...ecList, inputValue];
		setEcList(updatedList);
		updateData(updatedList);
		setInputValue("");
		console.log("array from state: " + updatedList);
	};

	const saveChanges = () => {
		updateData(ecList);
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<div className="boxStyling">
				<h1 style={{ paddingLeft: "10px", paddingTop: "10px" }}>
					Extracurriculars:
				</h1>
				<form onSubmit={handleSubmit} style={{ height: "100px" }}>
					<ul
						style={{
							paddingTop: "20px",
							paddingLeft: "20px",
						}}
					>
						{ecList.map((item, index) => (
							<li
								onClick={() => removeItem(index)}
								key={index}
								style={{ paddingBottom: "5px", fontSize: "18px" }}
							>
								{item}
							</li>
						))}
					</ul>
					<div className="bottomHalf">
						<input
							type="text"
							className="inputBox"
							value={inputValue}
							onChange={handleInputChange}
							style={{
								width: "90%",
								height: "20px",
								display: "block",
								margin: "0",
								margin: "auto",
								marginBottom: "15px",
							}}
						/>
						<div className="buttonStyle">
							<button type="submit">ADD TO LIST</button>
							<button type="button" onClick={saveChanges}>
								SAVE CHANGES
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}

export default ExtracurricularsBox;
