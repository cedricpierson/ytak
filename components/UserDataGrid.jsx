import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import TablePagination from "@mui/material/TablePagination";
import {
  GridRowModes,
  DataGrid,
  GridToolbar,
  GridToolbarQuickFilter,
  GridToolbarContainer,
  GridActionsCellItem,
} from "@mui/x-data-grid";

import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
  randomId,
} from "@mui/x-data-grid-generator";
import { Container, Stack } from "@mui/material";

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter />
    </Box>
  );
}

const initialRows = [
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Ajouter
      </Button>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

export default function UserDataGrid() {
  const [checkboxSelection, setCheckboxSelection] = React.useState(true);
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
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

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns = [
    { field: "name", headerName: "Nom", width: 180, editable: true },
    { field: "age", headerName: "Age", type: "number", editable: true },
    {
      field: "dateCreated",
      headerName: "Date de Création",
      type: "date",
      width: 180,
      editable: true,
    },
    {
      field: "lastLogin",
      headerName: "Dernière connexion",
      type: "dateTime",
      width: 220,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key=""
              icon={<SaveIcon />}
              label="Sauvegarder"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key=""
              icon={<CancelIcon />}
              label="Annuler"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key=""
            icon={<EditIcon />}
            label="Éditer"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key=""
            icon={<DeleteIcon />}
            label="Effacer"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      mb={5}
      sx={{ height: "100vh" }}
    >
      <Box
        sx={{
          height: 500,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection={checkboxSelection}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          localeText={{
            MuiTablePagination: {
              labelRowsPerPage: "Lignes par page:",
              labelDisplayedRows({ from, to, count }) {
                return `${from}–${to} sur ${
                  count !== -1 ? count : `plus de ${to}`
                }`;
              },
            },
            toolbarColumns: "Colonnes",
            toolbarFilters: "Filtres",
            toolbarDensity: "Densité",
            toolbarExportCSV: "Télécharger en CSV",
            toolbarExportPrint: "Imprimer",
            toolbarDensityComfortable: "Confort",
            columnsPanelTextFieldLabel: "Trouver colonne",
            columnsPanelTextFieldPlaceholder: "Titre colonne",
            columnsPanelDragIconLabel: "Réordonner colonne",
            columnsPanelShowAllButton: "Tout afficher",
            columnsPanelHideAllButton: "Masquer Tout",
            columnMenuLabel: "Menu",
            columnMenuShowColumns: "Afficher",
            columnMenuFilter: "Filtre",
            columnMenuHideColumn: "Masquer",
            columnMenuUnsort: "Aucun",
            columnMenuSortAsc: "ASC",
            columnMenuSortDesc: "DESC",
            //Filter panel text
            filterPanelAddFilter: "Ajouter filtre",
            filterPanelDeleteIconLabel: "Effacer",
            filterPanelLinkOperator: "Opérateur logique",
            filterPanelOperator: "Opérateur",
            filterPanelOperatorAnd: "Et",
            filterPanelOperatorOr: "Ou",
            filterPanelColumns: "Colonnes",
            filterPanelInputLabel: "Valeur",
            filterPanelInputPlaceholder: "Filtrer",
            filterOperatorContains: "contiens",
            filterOperatorEquals: "égal",
            filterOperatorStartsWith: "Commence par",
            filterOperatorEndsWith: "Finit par",
            filterOperatorIs: "est",
            filterOperatorNot: "n'est pas",
            filterOperatorAfter: "supérieur à",
            filterOperatorOnOrAfter: "supérieur à",
            filterOperatorBefore: "inférieur à",
            filterOperatorOnOrBefore: "est ",
            filterOperatorIsEmpty: "est vide",
            filterOperatorIsNotEmpty: "n'est pas vide",
            filterOperatorIsAnyOf: "est du type",
            toolbarQuickFilterPlaceholder: "Recherche…",
            footerRowSelected: (count) =>
              count !== 1
                ? `${count.toLocaleString()} lignes selectionnées`
                : `${count.toLocaleString()} ligne selectionnée`,
          }}
          components={{
            Toolbar: GridToolbar,
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
              setRows,
              setRowModesModel,
            },
          }}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </Stack>
  );
}

// import * as React from "react";
// import PropTypes from "prop-types";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/DeleteOutlined";
// import SaveIcon from "@mui/icons-material/Save";
// import CancelIcon from "@mui/icons-material/Close";
// import {
//   DataGrid,
//   GridRowModes,
//   GridToolbar,
//   GridActionsCellItem,
// } from "@mui/x-data-grid";
// import { useDemoData } from "@mui/x-data-grid-generator";
// import { Container } from "@mui/material";

// const VISIBLE_FIELDS = [
//   "avatar",
//   "name",
//   "rating",
//   "email",
//   "dateCreated",
//   "phone",
//   "createdon",
//   "updatedOn",
//   "isAdmin",
// ];

// function EditToolbar(props) {
//   const { setRows, setRowModesModel } = props;

//   const handleClick = () => {
//     const id = randomId();
//     setRows((oldRows) => [
//       ...oldRows,
//       {
//         id,
//         name: "",
//         rating: "",
//         email: "",
//         dateCreated: "",
//         phone: "",
//         createdon: "",
//         updatedOn: "",
//         isAdmin: "",
//         isNew: true,
//       },
//     ]);
//     setRowModesModel((oldModel) => ({
//       ...oldModel,
//       [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
//     }));
//   };

//   return (
//     <GridToolbarContainer>
//       <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
//         Add record
//       </Button>
//     </GridToolbarContainer>
//   );
// }

// EditToolbar.propTypes = {
//   setRowModesModel: PropTypes.func.isRequired,
//   setRows: PropTypes.func.isRequired,
// };

// export default function CheckboxSelectionGrid() {
//   const [checkboxSelection, setCheckboxSelection] = React.useState(true);

//   const { data } = useDemoData({
//     dataSet: "Trader Email",
//     visibleFields: VISIBLE_FIELDS,
//     rowLength: 50,
//     maxColumns: 30,
//   });

//   return (
//     <Container
//       direction="row"
//       alignItems="center"
//       justifyContent="space-between"
//       mb={5}
//     >
//       <div style={{ height: "100vh" }}>
//         <DataGrid
//           localeText={{
//             toolbarColumns: "Colonnes",
//             toolbarFilters: "Filtres",
//             toolbarDensity: "Densité",
//             toolbarExportCSV: "Télécharger en CSV",
//             toolbarExportPrint: "Imprimer",
//             toolbarDensityComfortable: "Confort",
//             columnsPanelTextFieldLabel: "Trouver colonne",
//             columnsPanelTextFieldPlaceholder: "Titre colonne",
//             columnsPanelDragIconLabel: "Réordonner colonne",
//             columnsPanelShowAllButton: "Tout afficher",
//             columnsPanelHideAllButton: "Masquer Tout",
//             filterOperatorContains: "contiens",
//             filterOperatorEquals: "égal",
//             filterOperatorStartsWith: "commence par",
//             filterOperatorEndsWith: "fini par",
//             filterOperatorIs: "est",
//             filterOperatorNot: "n'est pas",
//             filterOperatorAfter: "est après",
//             filterOperatorOnOrAfter: "est inclus ou après",
//             filterOperatorBefore: "est avant",
//             filterOperatorOnOrBefore: "est inclus ou après",
//             filterOperatorIsEmpty: "est vide",
//             filterOperatorIsNotEmpty: "n'est pas vide",
//             filterOperatorIsAnyOf: "est un parmi",
//             filterPanelAddFilter: "Ajouter un filtre",
//             filterPanelDeleteIconLabel: "Effacer",
//             filterPanelLinkOperator: "Opérateur logique",
//             filterPanelOperator: "Opérateur",
//             filterPanelOperatorAnd: "Et",
//             filterPanelOperatorOr: "Ou",
//             filterPanelColumns: "Colonnes",
//             filterPanelInputLabel: "Valeur",
//             filterPanelInputPlaceholder: "Filtrer la valeur",
//           }}
//           components={{
//             Toolbar: GridToolbar,
//           }}
//           experimentalFeatures={{ newEditingApi: true }}
//           checkboxSelection={checkboxSelection}
//           {...data}
//         />
//       </div>
//     </Container>
//   );
// }
