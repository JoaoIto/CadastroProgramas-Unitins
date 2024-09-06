import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function LoadingSkeleton() {
    return (
        <Card className="w-2/3 border-l-8 border-l-azulEscuroGradient shadow-md shadow-cinzaTraco rounded-2xl m-4">
            <CardContent className="p-4">
                <Skeleton variant="text" sx={{ fontSize: '1.5rem', width: '60%' }} />
                <Stack spacing={1} className="flex flex-wrap gap-2 my-2">
                    <Skeleton variant="rectangular" width={100} height={24} />
                    <Skeleton variant="rectangular" width={100} height={24} />
                    <Skeleton variant="rectangular" width={100} height={24} />
                </Stack>
                <Skeleton variant="text" sx={{ fontSize: '0.875rem', width: '50%' }} />
                <Skeleton variant="rectangular" width="100%" height={36} className="mt-2" />
                <Skeleton variant="rectangular" width="100%" height={48} className="mt-2" />
            </CardContent>
        </Card>
    );
}
