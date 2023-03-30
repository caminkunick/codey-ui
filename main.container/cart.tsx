import {
  faCashRegister,
  faShoppingCart,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Badge,
  Button,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Menu,
  Stack,
  Typography,
} from "@mui/material";
import { ActionIcon } from "codey-ui/action.icon";
import { useState } from "react";
import { useStore } from "../provider";

export const MCCart = () => {
  const { state, dispatch } = useStore();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  return (
    <>
      <Badge
        overlap="circular"
        badgeContent={state.Cart().amount()}
        color="primary"
      >
        <IconButton onClick={({ currentTarget }) => setAnchorEl(currentTarget)}>
          <FontAwesomeIcon icon={faShoppingCart} />
        </IconButton>
      </Badge>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          dense: true,
          subheader: <ListSubheader>รายการสินค้า</ListSubheader>,
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          ".MuiPaper-root": {
            width: 300,
            maxWidth: "80%",
          },
        }}
      >
        {state.cart.map((cart) => (
          <ListItem key={cart.id}>
            <ListItemIcon>
              <Avatar variant="square" src={cart.feature} />
            </ListItemIcon>
            <ListItemText
              primary={`${cart.label} x ${cart.amount}`}
              secondary={
                <>
                  <Typography variant="caption" color="error">
                    ราคา {cart.price * cart.amount} point
                  </Typography>
                </>
              }
              secondaryTypographyProps={{ component: "div" }}
            />
            <ListItemSecondaryAction>
              <ActionIcon.INC
                onClick={() => dispatch({ type: "cart-inc", value: cart.id })}
              />
              <ActionIcon.DEC
                onClick={() => dispatch({ type: "cart-dec", value: cart.id })}
              />
              <ActionIcon.Remove
                onClick={() => dispatch({ type: "cart-rem", value: cart.id })}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        <ListItem>
          <ListItemText
            primary={
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={1}
              >
                <Typography>รวมทั้งหมด</Typography>
                <Typography variant="h6" color="primary" fontWeight="bold">
                  {state.Cart().sum()}
                </Typography>
                <Typography>Point</Typography>
              </Stack>
            }
            primaryTypographyProps={{ component: "div" }}
          />
        </ListItem>
        <ListItem>
          <Button
            fullWidth
            variant="contained"
            startIcon={<FontAwesomeIcon icon={faCashRegister} />}
          >
            ชำระเงิน
          </Button>
        </ListItem>
      </Menu>
    </>
  );
};
