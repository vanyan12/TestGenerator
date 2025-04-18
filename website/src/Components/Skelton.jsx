import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Loading() {
  return (
    <Stack spacing={1} >
      <Skeleton variant="text" animation={'wave'} sx={{ fontSize: '2rem'}} />
      <Skeleton variant="rounded" animation={'wave'} width={595} height={100} />
      <Skeleton variant="text" animation={'wave'} sx={{ fontSize: '2rem' }} />
      <Skeleton variant="rounded" animation={'wave'} width={595} height={100} />
      <Skeleton variant="text" animation={'wave'} sx={{ fontSize: '2rem' }} />
      <Skeleton variant="rounded" animation={'wave'} width={595} height={100} />
      <Skeleton variant="text" animation={'wave'} sx={{ fontSize: '2rem' }} />
      <Skeleton variant="rounded" animation={'wave'} width={595} height={100} />

    </Stack>
  );
}
