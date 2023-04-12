import { faSignIn } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material";
import { useStore } from "../provider";
import { DiscordDev } from "../ctrls/discord";

export const MCUnsigned = () => {
  const {
    state: { user },
  } = useStore();

  return user === null ? (
    <>
      <IconButton LinkComponent={"a"} href={DiscordDev.genURL()}>
        <FontAwesomeIcon icon={faSignIn} />
      </IconButton>
    </>
  ) : null;
};
