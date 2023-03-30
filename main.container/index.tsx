import {
  AppBar,
  Box,
  Container,
  IconButton,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { ReactNode } from "react";
import { MCCart } from "./cart";

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

export type MainContainerProps = {
  children?: ReactNode;
};

export const MainContainer = (props: MainContainerProps) => {
  return (
    <>
      <MainAppBar>
        <Container maxWidth="md">
          <Toolbar disableGutters>
            <Box flex={1} />
            <IconButton>a</IconButton>
            <MCCart />
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
