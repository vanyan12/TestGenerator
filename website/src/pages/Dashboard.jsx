import * as React from 'react';
import { useState } from 'react';
import SourceIcon from '@mui/icons-material/Source';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import Header from '../Components/Header';
import { useAuth } from '../Components/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
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


let user;

export default function Dashboard(props) {
  const location = useLocation();
  const navigate = useNavigate();
  user = useAuth().user;



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
        <DashboardLayout defaultSidebarCollapsed branding={{
          title: 'Գործիքակազմ',
          href: '/dashboard',
        }} sx={{
              height: '100vh',
              overflow: 'hidden',
              '& .MuiIconButton-root[aria-label="Switch to dark mode"]': {
                  display: 'none',
              },
            }}>

            <div style={{
              width: '100%', 
              padding: "1em",
              // flex: 1,
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


