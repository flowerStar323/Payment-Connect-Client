import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTable, useFlexLayout } from 'react-table';
import TableScrollbar from 'react-table-scrollbar';

import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

function Table({
  columns,
  data,
  skipPageReset,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable(
    {
      columns,
      data,
      autoResetPage: !skipPageReset,
    },
    useFlexLayout,
  );

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps({
                    style: { width: column.width },
                  })}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td
                    {...cell.getCellProps({
                      style: { 
                        width: cell.column.width,
                        ...(row.original[`flag${row.original.week}`] === 2 && cell.column.id === `week${row.original.week}` ? 
                          {
                            background: '#c90e08a1', 
                            color: 'white'
                          } : {})
                      },
                    })}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default function CustomTable({ prognosisData }) {
  const [data, setData] = useState(prognosisData);

  useEffect(() => {
    setData(prognosisData);
  }, [prognosisData]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Entry Name',
        accessor: 'entryName',
        minWidth: 96,
        width: '19%',
      },
      {
        Header: '1',
        accessor: 'week1',
        minWidth: 48,
        width: '4.5%',
      },
      {
        Header: '2',
        accessor: 'week2',
        minWidth: 48,
        width: '4.5%',
      },
      {
        Header: '3',
        accessor: 'week3',
        minWidth: 48,
        width: '4.5%',
      },
      {
        Header: '4',
        accessor: 'week4',
        minWidth: 48,
        width: '4.5%',
      },
      {
        Header: '5',
        accessor: 'week5',
        minWidth: 48,
        width: '4.5%',
      },
      {
        Header: '6',
        accessor: 'week6',
        minWidth: 48,
        width: '4.5%',
      },
      {
        Header: '7',
        accessor: 'week7',
        minWidth: 48,
        width: '4.5%',
      },
      {
        Header: '8',
        accessor: 'week8',
        minWidth: 48,
        width: '4.5%',
      },
      {
        Header: '9',
        accessor: 'week9',
        minWidth: 48,
        width: '4.5%',
      },
      {
        Header: '10',
        accessor: 'week10',
        minWidth: 48,
        width: '4.5%',
      },
      {
        Header: '11',
        accessor: 'week11',
        minWidth: 48,
        width: '4.5%',
      },
      {
        Header: '12',
        accessor: 'week12',
        minWidth: 48,
        width: '4.5%',
      },
      {
        Header: '13',
        accessor: 'week13',
        minWidth: 48,
        width: '4.5%',
      },
      {
        Header: '14',
        accessor: 'week14',
        minWidth: 48,
        width: '4.5%',
      },
      {
        Header: '15',
        accessor: 'week15',
        minWidth: 48,
        width: '4.5%',
      },
      {
        Header: '16',
        accessor: 'week16',
        minWidth: 48,
        width: '4.5%',
      },
      {
        Header: '17',
        accessor: 'week17',
        minWidth: 48,
        width: '4.5%',
      },
      {
        Header: '18',
        accessor: 'week18',
        minWidth: 48,
        width: '4.5%',
      },
    ],
    [],
  );

  return (
    <div className='table-container'>
      <TableScrollbar>
        <Table
          columns={columns}
          data={data}
        />
      </TableScrollbar>
    </div>
  );
}

CustomTable.propTypes = {
  prognosisData: PropTypes.array,
};
