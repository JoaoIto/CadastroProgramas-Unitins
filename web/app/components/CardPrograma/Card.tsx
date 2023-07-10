import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export const CardProgram = () => {
  return (
    <Card className='w-2/5 m-8'>
      <CardContent className='p-4'>
        <Typography variant="h5" component="div">
          Título do Card
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Descrição do Card em até 4 linhas
        </Typography>
        <Typography variant="body2">
          Data de Publicação: 01/01/2022
        </Typography>
        <Button className="bg-indigo-900" variant="contained" size="small">
          Visualizar
        </Button>
      </CardContent>
    </Card>
  );
};