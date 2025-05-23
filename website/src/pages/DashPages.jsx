import {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import {PageContainer} from '@toolpad/core/PageContainer';
import DataGrid from './DataGrid';
import TestGen from './TestGen';

export default function DashboardPages() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  return (
    <Routes>
      <Route path="archive" element={<DataGrid paginationModel={paginationModel} setPaginationModel={setPaginationModel}/>} />
      <Route path="test" element={<TestGen />} />
      <Route path="*" element={<PageContainer title="Dashboard" />} />
    </Routes>
  );
}
