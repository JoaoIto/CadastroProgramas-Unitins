import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface AlertDialogProps {
    title: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
                                                     title,
                                                     onConfirm,
                                                     onCancel,
                                                 }) => {
    return (
        <Dialog open={true} onClose={onCancel}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {/* Conteúdo adicional, se necessário */}
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary">
                    Cancelar
                </Button>
                <Button onClick={onConfirm} color="primary" autoFocus>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AlertDialog;
