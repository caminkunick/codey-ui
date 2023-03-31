import {
  faCheck,
  faShoppingCart,
  faXmark,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Grid, Skeleton, styled, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

export const CardContainer = styled(Grid)({});
CardContainer.defaultProps = {
  spacing: 2,
  container: true,
};

const Root = styled(Box)({
  borderRadius: 8,
  overflow: "hidden",
  aspectRatio: "4 / 5",
  backgroundColor: blueGrey[500],
  transition: "all 0.25s",
  "&:hover": {
    transform: "translateY(-8px)",
  },
});

const Feature = styled("img")({
  backgroundColor: blueGrey[700],
  width: "100%",
  display: "block",
  aspectRatio: "4 / 3",
  border: "none",
  objectFit: "cover",
  boxSizing: "border-box",
});

const Content = styled(Box)({
  aspectRatio: "4 / 2",
  padding: 16,
  color: "white",
});

const PriceButton = styled(Button)({
  borderRadius: 16,
  paddingInline: 24,
  height: 36,
  marginTop: -18,
  boxSizing: "border-box",
  transition: "all 0.25s",
});
PriceButton.defaultProps = {
  variant: "contained",
};

export type CardProps = {
  feature: string;
  price: number;
  title: string;
  desc: string;
  cart: boolean;
  purchased: boolean;
  onAddCart: () => void;
  onRemoveCart: () => void;
};

export const Card = (props: CardProps) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Root>
        <Feature src={props.feature} />
        <Box display="flex" justifyContent="flex-end" pr={4}>
          {props.purchased ? (
            <PriceButton
              color="success"
              startIcon={<FontAwesomeIcon icon={faCheck} />}
            >
              ซื้อแล้ว
            </PriceButton>
          ) : props.cart ? (
            <PriceButton
              color="error"
              onClick={props.onRemoveCart}
              startIcon={<FontAwesomeIcon icon={faXmark} />}
            >
              ลบจากรถเข็น
            </PriceButton>
          ) : (
            <PriceButton
              color="neutral"
              onClick={props.onAddCart}
              startIcon={<FontAwesomeIcon icon={faShoppingCart} />}
            >
              {props.price} P
            </PriceButton>
          )}
        </Box>
        <Content>
          <Typography variant="h6" fontWeight="bold">
            {props.title}
          </Typography>
          <Typography variant="body2" pl={2}>
            {props.desc}
          </Typography>
        </Content>
      </Root>
    </Grid>
  );
};
export const CardLoading = () => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Root>
        <Skeleton
          variant="rectangular"
          sx={{ height: "auto", aspectRatio: "4 / 3", width: "100%" }}
        />
        <Content>
          <Typography variant="h6" fontWeight="bold">
            <Skeleton />
          </Typography>
          <Typography variant="body2" pl={2}>
            <Skeleton />
          </Typography>
        </Content>
      </Root>
    </Grid>
  );
};
