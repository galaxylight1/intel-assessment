import React, { useState, useEffect } from "react";

export default function App() {
  const [jsonData, setJsonData] = useState([]);
  useEffect(() => {
    fetch("/API_DATA.json")
      .then((response) => response.json())
      .then((data) => setJsonData(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);
  console.log(jsonData);
  return <div>Hello world</div>;
}
