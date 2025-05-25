import * as React from 'react';
import { useState } from 'react';
import { createTheme } from '@mui/material/styles';
import SourceIcon from '@mui/icons-material/Source';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Header from '../Components/Header';
import { useAuth } from '../Components/AuthContext';
import DataGrid from './DataGrid';
import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import DashPages from './DashPages';








const NAVIGATION = [
  {
    segment: 'archive',
    title: 'Արխիվ',
    icon: <SourceIcon />,
  },
  {
    segment: 'test',
    title: 'Պարապել',
    icon: <NoteAltIcon />,
  }
];



export const notesDataSource = {
  fields: [
    { field: 'id', headerName: 'ID' },
    { field: 'test_date', headerName: 'Taken At', flex: 1 },
    { field: 'test', headerName: 'Test', flex: 1 },
    { field: 'score', headerName: 'Score', flex: 1 }
  ],

  getMany: async ({ paginationModel }) => {
    const { page, pageSize } = paginationModel;
    const response = await fetch(`http://127.0.0.1:8000/tests?user=${user.id}&page=${page}&pageSize=${pageSize}`);

    if (!response.ok) {
      throw new Error('Failed to fetch notes');
    }

    const data = await response.json();

    return {
      items: data.items,
      itemCount: data.totalCount,
    };
  },

  getOne: async (noteId) => {
    const response = await fetch(`/api/notes/${noteId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch the note');
    }

    return await response.json();
  },

  createOne: async (data) => {
    const response = await fetch(`/api/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create note');
    }

    return await response.json();
  },

  updateOne: async (noteId, data) => {
    const response = await fetch(`/api/notes/${noteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update note');
    }

    return await response.json();
  },

  deleteOne: async (noteId) => {
    const response = await fetch(`/api/notes/${noteId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete note');
    }
  },

  validate: (formValues) => {
    const issues = [];

    if (!formValues.title) {
      issues.push({ message: 'Title is required', path: ['title'] });
    }

    if (formValues.title && formValues.title.length < 3) {
      issues.push({
        message: 'Title must be at least 3 characters long',
        path: ['title'],
      });
    }

    if (!formValues.text) {
      issues.push({ message: 'Text is required', path: ['text'] });
    }

    return { issues };
  },
};


let user;

export default function Dashboard(props) {
  const { window } = props;
  const location = useLocation();
  const navigate = useNavigate();
  user = useAuth().user;
  // console.log(user);



  const basePath = '/dashboard';


  return (
      <AppProvider
        navigation={NAVIGATION}
        router={{
          pathname: location.pathname,
          navigate: (path) => {
          // Prepend the base path when navigating
          const targetPath = path.startsWith('/') ? `${basePath}${path}` : `${basePath}/${path}`;
          navigate(targetPath);
        },
        }}
      >
        <Header />
        <DashboardLayout defaultSidebarCollapsed sx={{
              height: '100vh',
              overflow: 'hidden',
              '& .MuiIconButton-root[aria-label="Switch to dark mode"]': {
                  display: 'none',
              },
            }}>

            <div style={{
              width: '100%', 
              padding: "1em",
              flex: 1,
              overflowY: 'auto',
              scrollBehavior: 'smooth',
              overflowX: 'hidden',
              }}>
              <DashPages />
            </div>
        </DashboardLayout>
      </AppProvider>
  );
}


