import { Box } from "@mui/material";
import "./style.css";

export type LoadingTextProps = {
  width?: number;
  label?: string;
};

export const LoadingText = (props: LoadingTextProps) => {
  return (
    <Box className="codey-loader" width={props.width}>
      <span>{props.label ?? "Loading"}</span>
    </Box>
  );
};
