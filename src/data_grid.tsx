import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// Define a TypeScript interface for your row data
interface RowData {
  _id: string;
  city: string;
  neighborhood: string;
  station_name: string;
  ride_count: number;
}
//import { getSelectedOptionsText } from "../js/map"; // Update the path accordingly

// Define your jsonData here (replace with your actual data)
const columns: GridColDef[] = [
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "neighborhood",
    headerName: "Neighborhood",
    width: 150,
  },
  {
    field: "station_name",
    headerName: "Station Name",
    width: 150,
  },
  {
    field: "ride_count",
    headerName: "Ride Count",
    type: "number",
    width: 150,
  },
];
export default function DataGridContainer() {
  const [jsonData, setJsonData] = useState([]);

  // Function to generate a unique ID based on the _id field
  const getRowId = (row: RowData) => row._id;

  useEffect(() => {
    // Fetch data from the URL when the component mounts
    fetch(
      "https://divvy-db-public-5f412972abe3.herokuapp.com/api/v1.0/stations"
    )
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched data
        setJsonData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // The empty array [] ensures this effect runs only once
  return (
    <Box sx={{ height: "75vh", width: "78vh" }}>
      <DataGrid
        rows={jsonData}
        columns={columns}
        pagination
        //pageSize={5}
        //checkboxSelection
        //disableSelectionOnClick
        getRowId={getRowId} // Specify the custom ID function
      />
    </Box>
  );
}
