import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, FormControlLabel, LinearProgress, Switch } from "@mui/material";
import customToolbar from "./CustomToolbar";
import Snackbar from "@mui/material/Snackbar";
import { SnackbarContent, Typography } from "@mui/material";
import Slide from "@mui/material/Slide";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import MemoryIcon from "@mui/icons-material/Memory";
import { useTheme } from "@mui/material/styles";

const columns = [
  {
    field: "id",
    headerName: "ID",
    minWidth: 100,
    renderCell: (cellValues) => {
      return cellValues.row.id + 1;
    },
  },
  {
    field: "name",
    headerName: "Product Name",
    minWidth: 500,
    renderCell: (cellValues) => {
      return cellValues.row.name;
    },
  },
  {
    field: "productCollection",
    headerName: "Product Collection",
    minWidth: 300,
    valueGetter: (val) => {
      return val;
    },
    renderCell: (cellValues) => {
      return cellValues.row.productCollection;
    },
  },
  {
    field: "cores",
    headerName: "# of Cores",
    minWidth: 100,
    renderCell: (cellValues) => {
      return cellValues.row.cores === 0 ? "-" : cellValues.row.cores;
    },
  },
  {
    field: "processorBaseFreq",
    headerName: "Processor Base Frequency",
    minWidth: 150,
    renderCell: (cellValues) => {
      return cellValues.row.processorBaseFreq;
    },
  },
  {
    field: "status",
    headerName: "Product Status",
    minWidth: 150,
    renderCell: (cellValues) => {
      return cellValues.row.status;
    },
  },
  {
    field: "segment",
    headerName: "Vertical Segment",
    minWidth: 150,
    renderCell: (cellValues) => {
      return cellValues.row.segment;
    },
  },
];

let comparisonProductsArr = [];
const pageSize = 100;
let pageIdx = 0;
let startIdx = 0;
let newJsonData = [];

function preProcessing(data, startIdx) {
  const newData = data.map((item, idx) => ({
    id: startIdx + idx, // TODO: id: 27076 + idx,
    name: item.name,
    productCollection: item.Essentials["Product Collection"]
      ? item.Essentials["Product Collection"]
      : "-",
    status: item.Essentials.Status ? item.Essentials.Status : "-",
    cores: item.Performance ? parseInt(item.Performance["# of Cores"]) : 0,
    segment: item.Essentials["Vertical Segment"]
      ? item.Essentials["Vertical Segment"]
      : "-",
    processorBaseFreq: item.Performance
      ? item.Performance["Processor Base Frequency"]
        ? item.Performance["Processor Base Frequency"]
        : "-"
      : "-",
  }));
  return newData;
}

export default function Table({
  // jsonData,
  open,
  matches,
  customFilterModel,
  handleSetCustomFilterModel,
}) {
  const theme = useTheme();
  const navigate = useNavigate();

  const [checkboxSelection, setCheckboxSelection] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [isSnackbarVisible, setIsSnackBarVisible] = useState(false);
  const [rows, setRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: pageIdx,
    pageSize: pageSize,
  });
  const [isLoading, setIsLoading] = useState(true);

  // pre-processing, TODO: explore useEffect here
  // useEffect(() => {
  //   newJsonData = jsonData;
  //   const tempJsonData = preProcessing(jsonData, startIdx);
  //   setRows(tempJsonData);
  // }, [jsonData]);

  // const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    fetch("https://intel-assessment-backend.vercel.app/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: startIdx,
        to: startIdx + 100,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // data = Object.values(data).slice(0, 100);
        data = data.filter((item) => {
          if (item.name && item.Essentials["Status"]) return true;
        });
        newJsonData = data;
        comparisonProductsArr = [];
        const tempJsonData = preProcessing(data, startIdx);
        setIsLoading(false);
        setRows(tempJsonData);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  useEffect(() => {
    fetch("https://intel-assessment-backend.vercel.app/totalCount")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRowCountState((prevRowCountState) =>
          data?.totalCount !== undefined ? data?.totalCount : prevRowCountState
        );
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const [rowCountState, setRowCountState] = useState(
    // pageInfo?.totalRowCount || 0,
    0
  );

  const handlePageChange = async (newPaginationModel) => {
    setIsLoading(true);

    // note: here startIdx will be either +100 or -100 depending on if we are moving to next page or moving to previous page
    startIdx =
      newPaginationModel.page > paginationModel.page
        ? startIdx + 100
        : startIdx - 100;

    if (startIdx < 0) startIdx = 0;

    fetch("https://intel-assessment-backend.vercel.app/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: startIdx,
        to: startIdx + 100,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        newJsonData = data;
        const tempJsonData = preProcessing(data, startIdx);
        setIsLoading(false);
        setRows(tempJsonData);
      })
      .catch((error) => console.error("Error fetching data: ", error));

    pageIdx = newPaginationModel.page;
    setPaginationModel(newPaginationModel);
  };

  const handleOnSnackbarClick = () => {
    const passOnProductsArr = [...comparisonProductsArr];
    comparisonProductsArr = []; // reset
    navigate(`/compare`, { state: passOnProductsArr });
  };

  const handleRowSelectionModel = (newRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel);
  };

  // const rows = () => [...newJsonData];

  return (
    <Box sx={{ height: "100%" }}>
      <Typography
        variant="h6"
        noWrap
        sx={{
          marginLeft: matches
            ? open
              ? { xs: "12.5rem", md: "200px" }
              : { xs: "50px", md: "50px" }
            : { xs: "50px", md: "50px" },
          marginTop: "5rem",
          marginBottom: "1rem",
          fontSize: "2rem",
          color: "#0067B4",
          display: "flex",
          alignItems: "center",
          transition: theme.transitions.create("margin-left", {
            easing: theme.transitions.easing.easeOut,
            duration: 300,
          }),
        }}
      >
        <MemoryIcon sx={{ fontSize: "3rem", mr: "0.5rem" }} /> All Processors
      </Typography>
      <Box
        sx={{
          mb: 1,
          marginLeft: matches
            ? open
              ? { xs: "12.7rem", md: "205px" }
              : { xs: "55px", md: "55px" }
            : { xs: "55px", md: "55px" },
          transition: theme.transitions.create("margin-left", {
            easing: theme.transitions.easing.easeOut,
            duration: 300,
          }),
        }}
      >
        <FormControlLabel
          label="Select two products for comparison"
          control={
            <Switch
              checked={checkboxSelection}
              onChange={(event) => setCheckboxSelection(event.target.checked)}
            />
          }
        />
      </Box>
      <DataGrid
        className="table-data-grid"
        getRowId={(row) => row.id}
        rows={rows}
        columns={columns}
        headerHeight={50}
        rowHeight={50}
        sx={{
          // TODO: change this slightly
          marginLeft: matches
            ? open
              ? { xs: "12.5rem", md: "200px" }
              : { xs: "50px", md: "50px" }
            : { xs: "50px", md: "50px" },
          minHeight: "10rem",
          transition: theme.transitions.create("margin-left", {
            easing: theme.transitions.easing.easeOut,
            duration: 300,
          }),
        }}
        autoHeight
        initialState={{
          sorting: {
            sortModel: [{ field: "id", sort: "asc" }],
          },
        }}
        filterModel={customFilterModel}
        onFilterModelChange={(newFilterModel) =>
          handleSetCustomFilterModel(newFilterModel)
        }
        checkboxSelection={checkboxSelection}
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          if (newRowSelectionModel.length > 2) {
            return;
          }

          if (newRowSelectionModel.length === rowSelectionModel.length + 1) {
            comparisonProductsArr.push(
              newJsonData[newRowSelectionModel.slice(-1) - startIdx]
            );
          } else if (
            newRowSelectionModel.length ===
            rowSelectionModel.length - 1
          ) {
            if (newRowSelectionModel[0] != rowSelectionModel[0]) {
              // that means that first choice was un-selected
              comparisonProductsArr = comparisonProductsArr.slice(1);
            } else {
              comparisonProductsArr.pop();
            }
          } else if (newRowSelectionModel.length === 0) {
            comparisonProductsArr = []; // reset
          }

          if (newRowSelectionModel.length === 2) {
            setIsSnackBarVisible(true);
          } else {
            setIsSnackBarVisible(false);
          }

          handleRowSelectionModel(newRowSelectionModel);
        }}
        slots={{ toolbar: customToolbar, loadingOverlay: LinearProgress }}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={handlePageChange}
        pageSizeOptions={[25, 50, 100]}
        rowCount={rowCountState}
        keepNonExistentRowsSelected
        loading={isLoading}
      />
      <Snackbar
        open={isSnackbarVisible}
        TransitionComponent={Slide}
        onClick={handleOnSnackbarClick}
        key="compareProducts"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <SnackbarContent
          sx={{
            backgroundColor: "#0067B4",
            cursor: "pointer",
          }}
          message="Compare products"
          action={<ArrowForwardIcon />}
        ></SnackbarContent>
      </Snackbar>
    </Box>
  );
}
