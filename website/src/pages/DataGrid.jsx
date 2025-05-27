import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { useAuth } from '../Components/AuthContext';
import { IconButton, Tooltip } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import getUserInfo from '../Utils';

const openTest = async(params) => {
    const file_path = params.row.test_url.split('/').pop();
    const testWindow = window.open('', '_blank'); // Open a new tab

    const pdf_response = await fetch(`http://127.0.0.1:8000/get-test/${file_path}`,{
    method: "GET",
    credentials: "include"

  })

  const blob = await pdf_response.blob(); // Convert response to Blob
  const url = URL.createObjectURL(blob);

  testWindow.location.href = url+"#toolbar=0"; //
};




export default function DataTable({paginationModel, setPaginationModel}) {
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const {user} = useAuth()

  const columns = [
  {
    field: 'test_url',
    headerName: 'Թեստ',
    width: 100,
    renderCell: (params) => (
        <Tooltip title="Բացել թեստը" arrow 
          onClick={() => {
            openTest(params);
          }}>
          <IconButton>
            <DescriptionIcon fontSize='large'/>
          </IconButton>
        </Tooltip>
    ),
  },
  { field: 'test_date', headerName: 'Ամսաթիվ', width: 200 },
  { field: 'score', headerName: 'Միավոր', width: 100 },
];


  const getTests = async () => {
    const {page, pageSize} = paginationModel
    const offset = page * pageSize


    const response = await fetch(`http://127.0.0.1:8000/testsList?user_id=${user["id"]}&page=${page}&page_size=${pageSize}`)

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const test_list = await response.json()

    setRows(test_list.tests.map((test, index) => ({
      id: offset + index + 1,
      ...test,
      test_date: new Date(test.test_date).toLocaleDateString("hy-AM", {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    })));


    setTotalCount(test_list.totalCount)

  }

  useEffect(() => {
    getTests();
  }, [paginationModel, user]);

    return (
         <DataGrid 
            rows={rows}
            rowCount={totalCount}
            columns={columns} 
            pagination
            paginationMode="server"
            paginationModel={paginationModel} 
            onPaginationModelChange={setPaginationModel} 
            rowsPerPageOptions={[2]} 
            sx={{
              '& .MuiTablePagination-displayedRows': {
                  marginBottom: '0',        // Vertically center all elements
                },
              '& .MuiTablePagination-selectLabel': { display: 'none' },
              '& .MuiTablePagination-select': { display: 'none' },
              '& .MuiTablePagination-selectIcon': { display: 'none' },
            }}
                  
              /> 
    )
}