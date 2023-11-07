import React from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';

const TableComponent = ({ title, columns, data, actions }) => {
  const defaultMaterialTheme = createTheme();

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <MaterialTable
        title={title}
        columns={columns}
        data={data}
        actions={actions}
      />
    </ThemeProvider>
  );
};

export default TableComponent;
