import { Box, Toolbar, Typography, Link as MLink } from "@mui/material";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

export type HeadDividerProps = {
  label: ReactNode;
  link?: Record<"label" | "url", string>;
};

export const HeadDivider = (props: HeadDividerProps) => {
  return (
    <Toolbar disableGutters>
      <Typography fontWeight="bold">{props.label}</Typography>
      <Box flex={1} />
      {props.link && (
        <MLink variant="caption" component={Link} to={props.link.url}>
          {props.link.label}
        </MLink>
      )}
    </Toolbar>
  );
};
