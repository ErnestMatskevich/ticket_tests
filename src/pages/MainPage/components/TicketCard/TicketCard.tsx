import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import styles from "./TicketCard.module.scss";
import { Ticket } from "../../../../services/Tickets/types";

interface TicketCardProps {
  ticketData: Ticket;
  setEditData: React.Dispatch<React.SetStateAction<Ticket>>;
  setShowViewModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function TicketCard({
  ticketData,
  setEditData,
  setShowViewModal,
}: TicketCardProps) {
  return (
    <Card
      className={styles.cardContent}
      onClick={() => {
        setEditData(ticketData);
        setShowViewModal(true);
      }}
      key={ticketData.id}
    >
      <CardContent>
        <Typography>{ticketData.header}</Typography>
      </CardContent>
    </Card>
  );
}
