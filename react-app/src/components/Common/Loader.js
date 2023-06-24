import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export default function Loader() {
    return (
        <div className='container d-flex align-items-center justify-content-center mt-5'>
            <Stack direction="row">
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', alignContent: 'center', mt: 10, mb: 10 }}>
                    <CircularProgress />
                </Box>
            </Stack>
        </div>
    );
}