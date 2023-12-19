import React from "react";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import styles from "./PersonalPage.module.scss";
import { Header } from "../../../components/layout/Header/Header";
import Photo from "../../../images/Photo.png";

const PersonalPage = () => {
  return (
    <div className={styles.container}>
      <Box
        component="div"
        className={styles.fieldBorder}
        display="flex"
        flexDirection="row"
        maxWidth={800}
        height={300}
        margin="auto"
        padding={3}
        borderRadius={8}
        boxShadow={"4px 4px 4px rgb(0, 0, 0, .25)"}
        border={"10px solid #CDDC39"}
      >
        <div>
          <img style={{ height: 300 }} src={Photo} alt="Photo" />
        </div>
        <List>
          <ListItem>
            <ListItemText primary="Username" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Email" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Single-line item" />
          </ListItem>
        </List>
      </Box>
    </div>
  );
};

export default PersonalPage;
