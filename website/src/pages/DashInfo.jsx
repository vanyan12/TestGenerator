import {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import {PageContainer} from '@toolpad/core/PageContainer';
import Box from '@mui/material/Box';
import DataGrid from './DataGrid';
import TestGen from './TestGen';
import { Typography } from '@mui/material';
import { useAuth } from '../Components/AuthContext';

export default function DashInfo() {
    const { user } = useAuth();
    const t =  `👋😊Ողջույն հարգելի ${ user? user["fname"] : null || "օգտատեր"}`;
  return (
    <Box>
        <PageContainer title={t} />
        <Typography variant="h6" component="h1" gutterBottom>
            Կայքը այժմ աշխատում է փորձնական տարբերակով, նպատակ ունենալով ստանալ օգտատերների կարծիքները, առաջարկությունները և անձնական փորձը՝ հետագա թարմացումների համար։
            <hr />

            Դուք հնարավորություն ունեք յուրաքանչյուր օր ստեղծել մեկ թեստ, որից հետո հասանելիությունը կդադարեցվի մինչև հաջորդ օրը։
            Խնդրում ենք թեստի գեներացումից հետո կիսվել ձեր կարծիքով և առաջարկություններով Հետադարձ կապի բաժնում:
        </Typography>
    </Box>

  )
}
