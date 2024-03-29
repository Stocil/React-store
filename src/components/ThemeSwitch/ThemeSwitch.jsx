import { FormControlLabel, FormGroup } from "@mui/material";
import { ThemeSwitchInput } from "./ThemeSwitch.styles";

export function ThemeSwitch({ theme, onSwitch }) {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <ThemeSwitchInput onChange={onSwitch} checked={theme === "dark"} />
        }
      />
    </FormGroup>
  );
}
