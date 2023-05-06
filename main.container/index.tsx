import { faSignIn, faSpinner } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { LoadingText } from "../loading.text";
import { useStore } from "../provider";
import { DiscordDev } from "../ctrls/discord";
import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MCCart } from "./cart";
import { MCSigned } from "./signed";
import { MCUnsigned } from "./unsinged";

const MainAppBar = styled(AppBar)(({ theme }) => ({
  position: "sticky",
  borderBottom: `solid 1px ${theme.palette.grey[400]}`,
  backgroundColor: theme.palette.background.paper,
}));
MainAppBar.defaultProps = {
  elevation: 0,
  position: "sticky",
};

const MainContent = styled(Container)(({ theme }) => ({
  marginTop: -1,
  marginBottom: -1,
  border: `solid 1px ${theme.palette.grey[400]}`,
  boxSizing: "border-box",
  padding: theme.spacing(2, 3),
}));

const Footer = styled(Box)({
  position: "sticky",
  bottom: 0,
  backgroundColor: blueGrey[400],
  color: "white",
});

const LoadingIcon = () => (
  <IconButton disabled>
    <FontAwesomeIcon icon={faSpinner} pulse />
  </IconButton>
);

export type MainContainerProps = {
  children?: ReactNode;
  signInOnly?: boolean;
};

export const MainContainer = (props: MainContainerProps) => {
  const {
    menu,
    state: { loading, user },
  } = useStore();
  const nav = useNavigate();

  if (props.signInOnly) {
    if (loading) {
      return (
        <Box sx={(theme) => theme.mixins.fixedFluid}>
          <LoadingText label="Loading" />
        </Box>
      );
    }
    if (!user) {
      return (
        <Box sx={(theme) => theme.mixins.fixedFluid}>
          <Button
            variant="outlined"
            startIcon={<FontAwesomeIcon icon={faSignIn} />}
            size="large"
            LinkComponent="a"
            href={DiscordDev.genURL()}
          >
            Sign In
          </Button>
        </Box>
      );
    }
  }

  return (
    <>
      <MainAppBar>
        <Container maxWidth="md">
          <Toolbar disableGutters>
            <Link to="/" style={{ display: "block" }}>
              <img
                src={`${process.env.REACT_APP_LOGO}`}
                alt="logo"
                style={{ display: "block", height: 48, width: "auto" }}
              />
            </Link>
            {menu && (
              <Stack direction="row" spacing={1}>
                {menu.map((item, index) => (
                  <Button
                    color="neutral"
                    key={index}
                    onClick={() => nav(item.url)}
                  >
                    {item.label}
                  </Button>
                ))}
              </Stack>
            )}
            <Box flex={1} />
            <MCCart />
            {loading ? <LoadingIcon /> : user ? <MCSigned /> : <MCUnsigned />}
          </Toolbar>
        </Container>
      </MainAppBar>
      <MainContent maxWidth="md">{props.children}</MainContent>
      <Footer>
        <Toolbar disableGutters>
          <Container maxWidth="md">
            <Typography variant="caption" textAlign="center" component="div">
              Copyright &copy;2023 Company Name สงวนสิทธิ์ทุกประการ
            </Typography>
          </Container>
        </Toolbar>
      </Footer>
    </>
  );
};
