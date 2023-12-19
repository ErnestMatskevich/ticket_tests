import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import styles from "./Header.module.scss";
import Logo from "../../../images/Logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearToken } from "../../../store/auth/authSlice";

export function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Clear the token from storage
    dispatch(clearToken());
  };
  return (
    <AppBar className={styles.appbar} position="static">
      <Toolbar className={styles.toolbar}>
        <img style={{ height: 50 }} src={Logo} alt="Logo" />

        <Typography
          variant="h5"
          noWrap
          sx={{
            color: "black",
            fontWeight: "bold",
          }}
        >
          TicketTrack
        </Typography>

        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-haspopup="true"
          onClick={handleClick}
          color="inherit"
        >
          <AccountCircleIcon className={styles.icon} />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => navigate("/tickettrack")}>
            Main Page
          </MenuItem>
          <MenuItem onClick={() => navigate("/tickettrack/personal")}>
            My account
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleLogout();
              navigate("/tickettrack/login");
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
