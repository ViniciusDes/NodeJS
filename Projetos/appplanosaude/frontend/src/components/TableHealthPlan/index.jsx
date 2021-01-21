import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import api from '../../services/api';

const columns = [
  {
    id: 'ID',
    label: 'Id',
    minWidth: 10,
  },
  {
    id: 'COD_EMPRESA',
    label: 'Empresa',
    minWidth: 10,
    format: value => value.toLocaleString('en-US'),
  },
  {
    id: 'COD_FILIAL',
    label: 'Filial',
    minWidth: 10,
    format: value => value.toLocaleString('en-US'),
  },
  {
    id: 'MATRICULA',
    label: 'Matricula',
    minWidth: 10,
    // align: 'right',
    format: value => value.toLocaleString('en-US'),
  },
  {
    id: 'NOME_USUARIO_A',
    label: 'Nome Beneficiário Arquivo',
    minWidth: 170,
    // align: 'right',
    format: value => value.toFixed(2),
  },
  {
    id: 'NOME_USUARIO_B',
    label: 'Nome Beneficiário Protheus',
    minWidth: 170,
    // align: 'right',
    format: value => value.toFixed(2),
  },
  {
    id: 'NOME_TITULAR_B',
    label: 'Nome Titular Protheus',
    minWidth: 170,
    // align: 'right',
    format: value => value.toFixed(2),
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
  },
  container: {
    height: '100%',
    maxHeight: 440,
  },
});

export default function GridMUI({ rowsData }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState(['']);
  // const [period, setPeriod] = useState('');
  const [startRows, setStartRows] = useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    handleAuditPlan();
    // setPeriod(getCurrentPeriod);
  }, []);

  async function handleAuditPlan() {
    await api
      .get(`Audit/Index`)
      .then(data => {
        const dataRow = data.data;
        // console.log(dataRow);
        setRows(dataRow);
        setStartRows(true);
      })
      .catch(err => {
        console.log(err);
      });
  }

  // async function getCurrentPeriod() {
  //   const now = new Date();
  //   var month = now.getMonth();
  //   month < 10 ? (month = '' + now.getMonth() + 1) : (month = now.getMonth());
  //   // const period = now.getFullYear() + month;
  // }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    background: '#207eb8',
                    color: '#FFFFFF',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {startRows &&
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.ID}>
                      {columns.map(column => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            size="medium"
                            padding="default"
                            width="auto"
                          >
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
