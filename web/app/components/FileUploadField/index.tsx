import React from 'react';
import { Button, TextField, IconButton, Typography } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

interface FileUploadFieldProps {
  label: string;
  fileName: string;
  onFileChange: (file: File | null) => void;
  onClear: () => void;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({ label, fileName, onFileChange, onClear }) => {
  return (
    <div>
      <Typography variant="h6">{label}</Typography>
      <Button
        className="w-full flex p-2"
        style={{
          height: 100,
          backgroundColor: "#F5F5F5",
          color: "#999999",
          marginTop: 10,
        }}
        variant="contained"
        component="label"
      >
        {fileName ? (
          fileName
        ) : (
          <>
            Adicione o documento aqui <UploadFileIcon />
          </>
        )}
        <input
          type="file"
          hidden
          onChange={(e) => onFileChange(e.target.files ? e.target.files[0] : null)}
        />
      </Button>
      {fileName && (
        <TextField
          className="w-full"
          label="Documento Selecionado"
          variant="standard"
          value={fileName}
          disabled
          InputProps={{
            endAdornment: fileName && (
              <IconButton
                onClick={onClear}
                edge="end"
                aria-label="delete"
              >
                <CancelOutlinedIcon />
              </IconButton>
            ),
          }}
        />
      )}
    </div>
  );
};

export default FileUploadField;
