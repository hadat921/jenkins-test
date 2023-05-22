import { TextField } from "@mui/material";
import { ChangeEvent } from "react";

interface IInputProps {
  label: string;
  value?: string;
  setValue?: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const InputField: React.FC<IInputProps> = ({ label, value, setValue, type }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      type={type}
      size="small"
      value={value}
      onChange={setValue}
      fullWidth
      required
    />
  );
};

export default InputField;
