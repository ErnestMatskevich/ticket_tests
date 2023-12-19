import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import styles from "./LoginPage.module.scss";
import Logo from "../../../images/Logo.png";
import { useDispatch } from "react-redux";
import { setToken } from "../../../store/auth/authSlice";
import { useLoginMutation } from "../../../services/auth/api";

const LoginPage = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const routeChange = async () => {
    let path = "/tickettrack";
    try {
      const payload = await login({ username, password }).unwrap();
      dispatch(setToken(payload.token));
      navigate(path);
      // console.log("fulfilled", payload);
    } catch (error) {
      console.error("rejected", error);
    }
    // const token = await login("").unwrap();
  };

  return (
    <div className={styles.container}>
      <form>
        <Box
          component="div"
          className={styles.loginBorder}
          display="flex"
          flexDirection="column"
          maxWidth={538}
          maxHeight={414}
          alignItems="center"
          justifyContent="center"
          margin="auto"
          marginTop="30px"
          padding={3}
          borderRadius={10}
          boxShadow={"4px 4px 4px rgb(0, 0, 0, .25)"}
          border={"10px solid #CDDC39"}
        >
          <img style={{ height: 100 }} src={Logo} alt="Logo" />
          <TextField
            margin="dense"
            type={"email"}
            variant="outlined"
            label="Email"
            size="small"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            type={"password"}
            variant="outlined"
            label="Password"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            size="small"
            variant="contained"
            style={{
              background: "linear-gradient(#CDDC39 0%, #9E9D24 100%)",
              color: "#000",
              fontSize: 15,
              fontWeight: "bold",
              maxWidth: 138,
              maxHeight: 45,
            }}
            onClick={routeChange}
          >
            Log In
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default LoginPage;
