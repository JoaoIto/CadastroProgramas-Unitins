import React from 'react';
import { Grid } from '@mui/material';

const JustificativaCard = ({ justificativa }: { justificativa: string }) => {
    return (
        <Grid item xs={12}>
            <div className="p-4 border-2 rounded-lg shadow-md bg-red-50 border-vermelho">
                <h3 className="text-lg font-semibold text-red-700 mb-2">Justificativa</h3>
                <p className="text-red-800">
                    {justificativa || "N/A"}
                </p>
            </div>
        </Grid>
    );
};

export default JustificativaCard;
