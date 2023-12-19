import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import styles from "./CreateCard.module.scss";
import { Ticket, Type } from "../../../../services/Tickets/types";

interface CreateCardProps {
  type: Type;
  setEditData: React.Dispatch<React.SetStateAction<Ticket>>;
  setShowCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreateCard({
  type,
  setEditData,
  setShowCreateModal,
}: CreateCardProps) {
  return (
    <Card
      className={styles.cardContent}
      onClick={() => {
        setEditData({ type: type } as Ticket);
        setShowCreateModal(true);
      }}
      key={type}
    >
      <CardContent className={styles.createCard}>
        <AddIcon />
        <Typography>Create new ticket</Typography>
      </CardContent>
    </Card>
  );
}
