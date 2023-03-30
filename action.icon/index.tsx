import { faMinus, faPlus, faTrash } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, IconButtonProps } from "@mui/material";

export const ActionIcon = {
  INC: (props: IconButtonProps) => (
    <IconButton size="small" {...props}>
      <FontAwesomeIcon icon={faPlus} size="xs" />
    </IconButton>
  ),
  DEC: (props: IconButtonProps) => (
    <IconButton size="small" {...props}>
      <FontAwesomeIcon icon={faMinus} size="xs" />
    </IconButton>
  ),
  Remove: (props: IconButtonProps) => (
    <IconButton size="small" color="error" {...props}>
      <FontAwesomeIcon icon={faTrash} size="xs" />
    </IconButton>
  ),
};
