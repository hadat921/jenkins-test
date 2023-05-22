import React from "react";
import { Box } from "@mui/material";
import CustomButton from "../button";
import { useModalContext } from "../../providers/modalProvider";

const Header: React.FC = () => {
  const { onOpen, setTypeModal } = useModalContext();

  const handleSignIn = () => {
    onOpen();
    setTypeModal("signin");
  };

  const handleSignUp = () => {
    onOpen();
    setTypeModal("signup");
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      paddingX="8px"
      gap="8px"
    >
      <CustomButton
        sx={{ paddingBottom: "4px", paddingX: "24px" }}
        label="Sign in"
        onClick={handleSignIn}
      />
      <CustomButton
        sx={{ paddingBottom: "4px", paddingX: "24px" }}
        label="Sign up"
        onClick={handleSignUp}
      />
    </Box>
  );
};
export default Header;
