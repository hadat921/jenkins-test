import { SxProps } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";

interface IButtonProps {
  label: string;
  onClick?: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLButtonElement>
  ) => void;
  sx?: SxProps;
  isSubmit?: boolean;
}

const CustomButton: React.FC<IButtonProps> = ({
  label,
  onClick,
  sx,
  isSubmit,
}) => {
  console.log("Re-render custom button");
  return (
    <Button
      type={isSubmit ? "submit" : "button"}
      sx={sx}
      onClick={onClick}
      variant="contained"
    >
      {label}
    </Button>
  );
};

export default React.memo(CustomButton);
