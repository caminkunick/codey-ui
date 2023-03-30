import { Box } from "@mui/material";
import styles from "./style.module.css";

export type LoadingTextProps = {
  width?: number;
  label?: string;
};

export const LoadingText = (props: LoadingTextProps) => {
  return (
    <Box className={styles.loader} width={props.width}>
      <span>{props.label ?? "Loading"}</span>
    </Box>
  );
};
