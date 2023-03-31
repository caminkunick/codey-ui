import {
  faCashRegister,
  faShoppingCart,
  faSpinner,
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
import { CartItem } from "ctrls/cuser";
import { Product } from "ctrls/product";
import { useState } from "react";
import { useStore } from "../provider";

export const MCCart = () => {
  const { state } = useStore();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePurchase = async () => {
    if (state.user) {
      setLoading(true);
      await Product.buy(state.user);
      setLoading(false);
    }
  };

  return state.user ? (
    <>
      <Badge
        overlap="circular"
        badgeContent={state.userdata.cart.length}
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
        {state.userdata.cart.map((cart) => (
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
              <ActionIcon.Remove
                onClick={() => state.user && CartItem.remove(state.user, cart)}
                disabled={loading}
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
                  {state.userdata.Cart().sum()}
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
            startIcon={
              <FontAwesomeIcon
                icon={loading ? faSpinner : faCashRegister}
                pulse={loading}
              />
            }
            onClick={handlePurchase}
            disabled={loading}
          >
            ชำระเงิน
          </Button>
        </ListItem>
      </Menu>
    </>
  ) : null;
};
