import { LinearProgress, Grid, Typography } from '@mui/material';
interface PorcentagemAutoresProps {
    autores: IAutor[];
  }
  
export const PorcentagemAutores: React.FC<PorcentagemAutoresProps> = ({ autores }) => {
    // Lógica para calcular as porcentagens
    const porcentagemTotal = 30;
    const porcentagemPorAutor = autores.length > 0 ? porcentagemTotal / autores.length : 0;
  
    return (
      <Grid item xs={12}>
        {autores.map((autor, index) => (
          <div key={index}>
            <Typography>{`Autor ${index + 1}: ${porcentagemPorAutor.toFixed(2)}%`}</Typography>
            <LinearProgress
              variant="determinate"
              value={porcentagemPorAutor}
              style={{ height: 10, marginTop: 4, marginBottom: 8 }}
            />
          </div>
        ))}
      </Grid>
    );
  };
