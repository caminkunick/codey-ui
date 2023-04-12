import { faCoin, faSignOut, faUser } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
} from "@mui/material";
import { useStore } from "../provider";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const MCSigned = () => {
  const {
    state: { user, userdata, auth },
    dispatch,
  } = useStore();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const nav = useNavigate();

  const handleSignOut = () => {
    setAnchorEl(null);
    if (auth) {
      signOut(auth);
    }
    dispatch({ type: "reset" });
  };

  return user ? (
    <>
      <IconButton onClick={({ currentTarget }) => setAnchorEl(currentTarget)}>
        <Avatar src={user.photoURL ?? undefined} />
      </IconButton>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        MenuListProps={{ disablePadding: true }}
      >
        <ListItem divider>
          <ListItemIcon>
            <FontAwesomeIcon icon={faUser} />
          </ListItemIcon>
          <ListItemText primary={user.displayName ?? user.email ?? "No Name"} />
        </ListItem>
        <ListItemButton divider onClick={() => nav(`/history`)}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faCoin} />
          </ListItemIcon>
          <ListItemText primary={`${userdata.trans().sum()} Point`} />
        </ListItemButton>
        <ListItemButton onClick={handleSignOut}>
          <ListItemIcon sx={{ color: "error.main" }}>
            <FontAwesomeIcon icon={faSignOut} />
          </ListItemIcon>
          <ListItemText
            primary="ออกจากระบบ"
            primaryTypographyProps={{ color: "error" }}
          />
        </ListItemButton>
      </Menu>
    </>
  ) : null;
};
