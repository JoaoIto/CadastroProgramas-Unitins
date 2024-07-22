// components/AlertMessage.tsx
import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface CustomSnackbarProps {
  open: boolean;
  message: string | null;
  severity: "success" | "error";
  onClose: () => void;
}

const AlertMessage: React.FC<CustomSnackbarProps> = ({
  open,
  message,
  severity,
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ alignItems: "center" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
