"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ButtonLinkPage } from './components/ButtonLinkPage/ButtonLinkPage';

function SignIn() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      cpf: data.get('cpf'),
      senha: data.get('senha'),
    });
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className="mt-8 flex flex-col items-center">
          <Avatar className="m-1 bg-secondary-main">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className="mt-4 text-center">
            Software Hub - Unitins
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            className="mt-1 w-full"
          >
            <TextField
              className='font-bold'
              margin="normal"
              required
              fullWidth
              id="cpf"
              label={<label className="font-bold">CPF</label>}
              name="cpf"
              autoComplete="cpf"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="senha"
              label={<label className="font-bold">Senha</label>}
              type="password"
              id="senha"
              autoComplete="current-senha"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Me lembre"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="mt-3 mb-2 bg-blue-700 text-white"
            >
             <Link className='text-white' href='/dashboard'>Entrar</Link>
            </Button>

            <ButtonLinkPage title="Entrar" link="/dashboard"/>

              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
