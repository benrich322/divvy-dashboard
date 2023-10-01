import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// Define the filterDataByCommunityArea function
function filterDataByCommunityArea(table_content, data) {
    // Check if data is null or undefined before filtering
    if (data == null) {
        return [];
    }
    
    // Use the Array.prototype.filter() method to filter the data
    const new_data = data.filter(item => {
      // Log the value of item.community_area
  
      // Check the value of table_content.option0
      switch (table_content.option0) {
        case 'city':
          return item.city === table_content.option1;
        case 'neighborhood':
          return item.neighborhood === table_content.option1;
        case 'community_area':
          return item.community_area === table_content.option1;
        case 'ward':
          return item.ward === table_content.option1;
        // Add more cases for other options if needed
        default:
          // If option0 doesn't match any cases, return true (no filtering)
          return true;
      }
    });
  
    // Return the filtered data
    return new_data;
}

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

// Define table_content with your actual data
const table_content = {/* Your table_content data here */};

// Assuming you have the filterDataByCommunityArea function working correctly
const new_data = filterDataByCommunityArea(table_content, jsonData); // Assign the filtered data to new_data

export default function Message3() {
  // Function to generate a unique ID based on the _id field
  const getRowId = (row) => row._id;

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={new_data}
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

  
  
  
  
  
