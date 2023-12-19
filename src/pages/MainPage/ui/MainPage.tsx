import { Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import styles from "./MainPage.module.scss";
import ViewCardModal from "../modals/ViewCardModal";
import { useFetchTicketsQuery } from "../../../services/Tickets";
import { Ticket, Type } from "../../../services/Tickets/types";
import CreateTicketModal from "../modals/CreateTicketModal";
import { TicketCard } from "../components/TicketCard/TicketCard";
import { CreateCard } from "../components/CreateCard/CreateCard";

const mainPage = () => {
  const [showViewModal, setShowViewModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editData, setEditData] = useState<Ticket>({} as Ticket);
  const { data } = useFetchTicketsQuery("");
  // console.log(data);

  return (
    <>
      <div className={styles.container}>
        <Grid container spacing={8}>
          <Grid item xs={4}>
            <Card variant="outlined" className={styles.card}>
              <div className={styles.title}>
                <Typography variant="h5" component="div">
                  To Do
                </Typography>
              </div>
              {data &&
                data.map((el) => {
                  if (el.type === Type.toDo)
                    return (
                      <TicketCard
                        setEditData={setEditData}
                        setShowViewModal={setShowViewModal}
                        ticketData={el}
                        key={el.id}
                      />
                    );
                })}
              <CreateCard
                type={Type.toDo}
                setEditData={setEditData}
                setShowCreateModal={setShowCreateModal}
              />
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card variant="outlined" className={styles.card}>
              <div className={styles.title}>
                <Typography variant="h5" component="div">
                  In progress
                </Typography>
              </div>
              {data &&
                data.map((el) => {
                  if (el.type === Type.inProgress)
                    return (
                      <TicketCard
                        setEditData={setEditData}
                        setShowViewModal={setShowViewModal}
                        ticketData={el}
                        key={el.id}
                      />
                    );
                })}
              <CreateCard
                type={Type.inProgress}
                setEditData={setEditData}
                setShowCreateModal={setShowCreateModal}
              />
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card variant="outlined" className={styles.card}>
              <div className={styles.title}>
                <Typography variant="h5" component="div">
                  Done
                </Typography>
              </div>
              {data &&
                data.map((el) => {
                  if (el.type === Type.done)
                    return (
                      <TicketCard
                        setEditData={setEditData}
                        setShowViewModal={setShowViewModal}
                        ticketData={el}
                        key={el.id}
                      />
                    );
                })}
              <CreateCard
                type={Type.done}
                setEditData={setEditData}
                setShowCreateModal={setShowCreateModal}
              />
            </Card>
          </Grid>
        </Grid>
      </div>
      <ViewCardModal
        show={showViewModal}
        data={editData}
        onClose={() => {
          setShowViewModal(false);
        }}
        onSuccess={() => {
          setShowViewModal(false);
        }}
      />
      <CreateTicketModal
        show={showCreateModal}
        data={editData}
        onClose={() => {
          setShowCreateModal(false);
        }}
        onSuccess={() => {
          setShowCreateModal(false);
        }}
      />
    </>
  );
};

export default mainPage;
