import { faSearch } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";

export type RoundSearchProps = {
  onSearch: (value: string) => void;
  placeholder: string;
};

export const RoundSearch = (props: RoundSearchProps) => {
  const [value, setValue] = useState("");

  return (
    <FormControl fullWidth size="small" variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">
        {props.placeholder}
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type="text"
        value={value}
        onChange={({ target: { value } }) => setValue(value)}
        placeholder={props.placeholder}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => props.onSearch(value)}
              onMouseDown={() => props.onSearch(value)}
              edge="end"
            >
              <FontAwesomeIcon icon={faSearch} />
            </IconButton>
          </InputAdornment>
        }
        label={props.placeholder}
      />
    </FormControl>
  );
};
