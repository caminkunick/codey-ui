import { Link, LinkProps as Lp, styled } from "@mui/material";
import { Link as Lnk, LinkProps } from "react-router-dom";

export const RLink = styled((props: Lp & LinkProps) => (
  <Link component={Lnk} {...props} />
))<Lp & LinkProps>({});
