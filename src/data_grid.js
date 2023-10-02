"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const x_data_grid_1 = require("@mui/x-data-grid");
//import { getSelectedOptionsText } from "../js/map"; // Update the path accordingly
// Define your jsonData here (replace with your actual data)
const columns = [
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
function DataGridContainer() {
    const [jsonData, setJsonData] = (0, react_1.useState)([]);
    // Function to generate a unique ID based on the _id field
    const getRowId = (row) => row._id;
    (0, react_1.useEffect)(() => {
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
    return (react_1.default.createElement(Box_1.default, { sx: { height: "75vh", width: "78vh" } },
        react_1.default.createElement(x_data_grid_1.DataGrid, { rows: jsonData, columns: columns, pagination: true, 
            //pageSize={5}
            //checkboxSelection
            //disableSelectionOnClick
            getRowId: getRowId })));
}
exports.default = DataGridContainer;
