"use client";

import * as React from 'react';
import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
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
import ButtonLinkPage from '@/app/components/ButtonLinkPage/ButtonLinkPage';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ApiUtils from '@/app/Utils/Api/apiMethods';
import { useRouter } from 'next/navigation';

interface Usuario {
  _id: string;
  perfil: string;
  nome: string;
  cpf: string;
  senha: string;
}

const usuarioSchema = z.object({
  cpf: z.string().refine((value) => /^\d+$/.test(value), {
    message: 'Somente números',
  }),
  senha: z.string().min(4, 'Mínimo de 4 caracteres'),
});

function SignIn() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [isAutenticado, setIsAutenticado] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Usuario>({
    resolver: zodResolver(usuarioSchema),
  });

  const router = useRouter();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const usuariosData = await ApiUtils.get<Usuario[]>(
            'http://localhost:3333/usuario'
        );
        if (usuariosData) {
          setUsuarios(usuariosData);
        }
      } catch (error) {
        console.error('Erro ao obter os usuários:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const onSubmit = (data: Usuario) => {
    const usuarioEncontrado = usuarios.find(
        (usuario) => usuario.cpf === data.cpf
    );

    if (usuarioEncontrado) {
      console.log('Usuário autenticado! Acesso permitido.');
      setIsAutenticado(true);
      const url = `/dashboard?uuid=${usuarioEncontrado._id}`;
      router.push(url);
    } else {
      console.log('Usuário não autenticado! Acesso negado.');
      setIsAutenticado(false);
    }
  };

  return (
      <ThemeProvider theme={createTheme()}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box className="mt-8 flex flex-col items-center">
            <Avatar className="m-1 bg-secondary-main">
              <LockOutlinedIcon />
            </Avatar>
            <Typography
                component="h1"
                variant="h5"
                className="mt-4 text-center"
            >
              Software Hub - Unitins
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="mt-1 w-full"
            >
              <TextField
                  className="font-bold"
                  margin="normal"
                  required
                  fullWidth
                  id="cpf"
                  label={<label className="font-bold">CPF</label>}
                  autoComplete="cpf"
                  autoFocus
                  {...register('cpf')}
                  error={!!errors.cpf}
                  helperText={errors.cpf?.message}
              />
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  label={<label className="font-bold">Senha</label>}
                  type="password"
                  id="senha"
                  autoComplete="current-senha"
                  {...register('senha')}
                  error={!!errors.senha}
                  helperText={errors.senha?.message}
              />
              <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Me lembre"
              />
              <Grid className="flex flex-col" item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
                {!isAutenticado && (
                    <Typography color="error" align="center">
                      Usuário não autenticado! Acesso negado.
                    </Typography>
                )}
                <ButtonLinkPage
                    href="dashboard"
                    uuid={null}
                    id={usuarios.length > 0 ? usuarios[0]._id : null}
                >
                  Entrar
                </ButtonLinkPage>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
  );
}

export default SignIn;
