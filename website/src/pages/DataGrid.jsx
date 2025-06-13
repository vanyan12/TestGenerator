import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { useAuth } from '../Components/AuthContext';
import { IconButton, Tooltip } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { getGridStringOperators } from '@mui/x-data-grid';


const filteringOperators = {
  filterPanelOperator: 'Օպերատոր',
  filterPanelColumns: 'Սյունակներ',
  filterPanelInputLabel: 'Արժեք',
  filterPanelInputPlaceholder: 'Մուտքագրեք արժեքը',
}

const translatedStringOperators = getGridStringOperators().map((op) => ({
  ...op,
  label: {
    contains: 'Պարունակում է',
    equals: 'Հավասար է',
    doesNotEqual: 'Հավասար չէ',
    startsWith: 'Սկսվում է',
    endsWith: 'Ավարտվում է',
    isEmpty: 'Դատարկ է',
    isNotEmpty: 'Դատարկ չէ',
    doesNotContain: 'Չի պարունակում',
    isAnyOf: 'Որևէ մեկը',
  }[op.value] || op.label,
}));



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

const downloadTest = async (params) => {
  const file_path = params.row.test_url.split('/').pop();
  
  try {
    const pdf_response = await fetch(`http://127.0.0.1:8000/get-test/${file_path}`, {
      method: "GET",
      credentials: "include"
    });

    if (!pdf_response.ok) {
      throw new Error(`HTTP error! status: ${pdf_response.status}`);
    }

    const blob = await pdf_response.blob();
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Math_test.pdf'; 
    document.body.appendChild(a); 
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

  } catch (error) {
    console.error("Error downloading the test:", error);
  }
};



export default function DataTable({paginationModel, setPaginationModel}) {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const {user} = useAuth()

  const columns = [
  {
    field: 'test_url',
    headerName: 'Թեստ',
    hideable: false,
    disableColumnMenu: true,
    sortable: false,
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
  { field: 'test_date', headerName: 'Ամսաթիվ', width: 200, hideable: false, filterOperators: translatedStringOperators},
  { field: 'score', headerName: 'Միավոր', width: 100, hideable: false, filterOperators: translatedStringOperators },
  {
    field: ' ',
    headerName: 'Ներբեռնել',
    hideable: false,
    disableColumnMenu: true,
    sortable: false,
    width: 100,
    renderCell: (params) => (
      <Tooltip title="Ներբեռնել թեստը" arrow>
        <IconButton>
          <CloudDownloadIcon fontSize='large'
            onClick={() => {
              downloadTest(params);
              }
            }
          />
        </IconButton>
      </Tooltip>
    ),
  }
];



  useEffect(() => {
    const {page, pageSize} = paginationModel
    const offset = page * pageSize

    fetch(`http://127.0.0.1:8000/testsList?user_id=${user.id}`)
      .then((r) => {
        if (!r.ok) throw new Error(r.statusText);
        return r.json()
      })
      .then((data) => {
        setRows(
          data.tests.map((test, index) => ({
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
          }))
        );         
        setTotalCount(data.totalCount ?? data.tests.length);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching tests:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [paginationModel, user]);

    return (
      <div className='flex flex-col'>
          <DataGrid 
            rows={rows}
            rowCount={totalCount}
            columns={columns} 
            pagination
            paginationMode="client"
            paginationModel={paginationModel} 
            onPaginationModelChange={setPaginationModel} 
            rowsPerPageOptions={[5]}
            hideFooterSelectedRowCount
            disableColumnSelector
            disableRowSelectionOnClick
            loading={loading}
            localeText={
              {
                noRowsLabel: 'Թեստեր չկան',
                footerRowSelected: (count) => `${count} տող ընտրված`,
                footerTotalRows: 'Ընդհանուր տողեր',
                footerTotalVisibleRows: (visibleCount, totalCount) => `Տեսանելի տողեր՝ ${visibleCount} / ${totalCount}`,
                footerPage: 'Էջ',
                columnMenuSortAsc: 'Աճման կարգով դասավորել',
                columnMenuSortDesc: 'Նվազման կարգով դասավորել',
                columnMenuFilter: 'Ֆիլտրել',
                columnMenuUnsort: 'Հեռացնել ֆիլտրը',
                ...filteringOperators,
              }
            }
            sx={{
              '& .MuiTablePagination-displayedRows': {
                  marginBottom: '0',        // Vertically center all elements
                },
              '& .MuiTablePagination-selectLabel': { display: 'none' },
              '& .MuiTablePagination-select': { display: 'none' },
              '& .MuiTablePagination-selectIcon': { display: 'none' },
            }}
                  
          />
      </div>
 
    )
}