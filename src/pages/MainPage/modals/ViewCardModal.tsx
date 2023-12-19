import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./ViewCardModal.module.scss";
import { Ticket, Type } from "../../../services/Tickets/types";
import { useUpdateTicketMutation } from "../../../services/Tickets";

interface ViewCardModalProps {
  show: boolean;
  onClose: () => void;

  // onSuccess callback
  onSuccess?: (values: any) => void;

  // onReject callback
  onReject?: () => void;

  data?: Ticket;
}

const ViewCardModal = ({
  show,
  onClose,
  onReject,
  onSuccess,
  data,
}: ViewCardModalProps) => {
  const [updateTicket] = useUpdateTicketMutation();
  const [content, setContent] = useState(data.content);
  const [type, setType] = useState(data ? data.type : Type.toDo);
  const onFinish = () => {
    updateTicket({ ...data, content: content, type: type });
    onSuccess({ ...data, content: content });
  };

  useEffect(() => {
    setContent(data.content);
    setType(data.type);
  }, [data]);

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={show}
    >
      <DialogTitle
        sx={{ m: 0, p: 2 }}
        id="customized-dialog-title"
        className={styles.header}
      >
        {data.header}
        <Select
          labelId="demo-dialog-select-label"
          id="demo-dialog-select"
          defaultValue={data.type}
          value={type}
          onChange={(e) => setType(e.target.value as Type)}
          input={<OutlinedInput label="Age" />}
          className={styles.select}
        >
          <MenuItem value={Type.toDo}>{Type.toDo}</MenuItem>
          <MenuItem value={Type.inProgress}>{Type.inProgress}</MenuItem>
          <MenuItem value={Type.done}>{Type.done}</MenuItem>
        </Select>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers className={styles.modalContent}>
        <TextField
          id="outlined-multiline-static"
          multiline
          onChange={(e) => {
            setContent(e.target.value);
          }}
          className={styles.input}
          defaultValue={data.content}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onFinish}>
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewCardModal;
