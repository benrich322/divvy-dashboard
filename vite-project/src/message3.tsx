import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
//import { getSelectedOptionsText } from "../js/map"; // Update the path accordingly

// Define your jsonData here (replace with your actual data)
const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 40 },
    {
      field: "city",
      headerName: "City",
      width: 150,
      editable: true,
    },
    {
      field: "community_area",
      headerName: "Community Area",
      width: 150,
      editable: true,
    },
    {
      field: "lat",
      headerName: "Latitude",
      type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "lng",
      headerName: "Longitude",
      type: "number",
      width: 120,
      editable: true,
    },
    {
      field: "neighborhood",
      headerName: "Neighborhood",
      width: 150,
      editable: true,
    },
    {
      field: "ride_count",
      headerName: "Ride Count",
      type: "number",
      width: 120,
      editable: true,
    },
    {
      field: "station_name",
      headerName: "Station Name",
      width: 200,
      editable: true,
    },
    {
      field: "ward",
      headerName: "Ward",
      width: 80,
      editable: true,
    },
  ];
  export default function Message3() {
    const [jsonData, setJsonData] = useState([]);
  
    // Function to generate a unique ID based on the _id field
    const getRowId = (row) => row._id;
  
    useEffect(() => {
      // Fetch data from the URL when the component mounts
      fetch("https://divvy-db-public-5f412972abe3.herokuapp.com/api/v1.0/stations")
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
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={jsonData}
        columns={columns}
        pagination
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
        getRowId={getRowId} // Specify the custom ID function
      />
    </Box>
  );
}


  
  
  
  
  
