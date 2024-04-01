/*
 * Component that renders the Table (or also called as MUI Data Grid)
 * Implements server-side pagination, lazy loading, filtering, storing to localStorage
 */

import { useState, useEffect } from "react";
import {
  DataGrid,
  GridRowModes,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { Box, FormControlLabel, LinearProgress, Switch } from "@mui/material";
import customToolbar from "./CustomToolbar";
import Snackbar from "@mui/material/Snackbar";
import { SnackbarContent, Typography } from "@mui/material";
import Slide from "@mui/material/Slide";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import MemoryIcon from "@mui/icons-material/Memory";
import { useTheme } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

let comparisonProductsArr = [];
const pageSize = 100;
let pageIdx = 0;
let startIdx = 0;
let newJsonData = [];

function preProcessing(data, startIdx) {
  const newData = data.map((item, idx) => ({
    id: startIdx + idx,
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
    cache: item.Performance
      ? item.Performance["Cache"]
        ? item.Performance["Cache"]
        : "-"
      : "-",
  }));
  return newData;
}

export default function Table({
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
  const [rowModesModel, setRowModesModel] = useState({});
  const [paginationModel, setPaginationModel] = useState({
    page: pageIdx,
    pageSize: pageSize,
  });
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 100,
      valueGetter: (val) => {
        return val + 1;
      },
      renderCell: (cellValues) => {
        return cellValues.row.id + 1;
      },
    },
    {
      field: "name",
      headerName: "Product Name",
      minWidth: 500,
      editable: true,
      renderCell: (cellValues) => {
        return cellValues.row.name;
      },
    },
    {
      field: "productCollection",
      headerName: "Product Collection",
      minWidth: 250,
      editable: true,
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
      minWidth: 50,
      editable: true,
      type: "number",
      renderCell: (cellValues) => {
        return cellValues.row.cores === 0 ? "-" : cellValues.row.cores;
      },
    },
    {
      field: "processorBaseFreq",
      headerName: "Processor Base Frequency",
      minWidth: 150,
      editable: true,
      renderCell: (cellValues) => {
        return cellValues.row.processorBaseFreq;
      },
    },
    {
      field: "cache",
      headerName: "Cache",
      minWidth: 150,
      editable: true,
      renderCell: (cellValues) => {
        return cellValues.row.cache;
      },
    },
    {
      field: "status",
      headerName: "Product Status",
      minWidth: 150,
      editable: true,
      renderCell: (cellValues) => {
        return cellValues.row.status;
      },
    },
    {
      field: "segment",
      headerName: "Vertical Segment",
      minWidth: 150,
      editable: true,
      renderCell: (cellValues) => {
        return cellValues.row.segment;
      },
    },
    {
      field: "edit",
      type: "actions",
      headerName: "Edit Product",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

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
        data = Object.values(data);
        for (let [key, value] of Object.entries(localStorage)) {
          const pageNo = key.split(",")[0];
          const rowId = key.split(",")[1];
          if (pageNo == pageIdx) {
            data[rowId] = JSON.parse(value);
          }
        }

        console.log("## data -> ", data);

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
        for (let [key, value] of Object.entries(localStorage)) {
          const pageNo = key.split(",")[0];
          const rowId = key.split(",")[1];
          if (pageNo == pageIdx) {
            data[rowId] = JSON.parse(value);
          }
        }

        console.log("## data -> ", data);
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
    navigate(`/table`, { state: passOnProductsArr });
  };

  const handleRowSelectionModel = (newRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel);
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const processRowUpdate = (newRow) => {
    console.log("### newRow -> ", newRow);

    // update to newJsonData
    const relativeIdx = newRow.id - startIdx;
    let obj = newJsonData[relativeIdx];
    obj.name = newRow.name;
    obj.Essentials["Product Collection"] = newRow.productCollection;
    obj.Essentials["Status"] = newRow.status;
    obj.Essentials["Vertical Segment"] = newRow.segment;
    obj.Performance["# of Cores"] = `${newRow.cores}`; // make sure # of Cores is string, not integer
    obj.Performance["Processor Base Frequency"] = newRow.processorBaseFreq;
    obj.Performance["Cache"] = newRow.cache;

    localStorage.setItem(`${pageIdx},${relativeIdx}`, JSON.stringify(obj));
    console.log("### newJsonData", newJsonData);

    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

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
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        headerHeight={50}
        rowHeight={50}
        sx={{
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
        pageSizeOptions={[100]}
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
