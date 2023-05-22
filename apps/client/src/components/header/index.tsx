import React from "react";
import { Box } from "@mui/material";
import CustomButton from "../button";
import { useModalContext } from "../../providers/modalProvider";
import { storage } from "../../utils/storage";

const Header: React.FC = () => {
  const { onOpen, setTypeModal } = useModalContext();

  const token = storage.getToken();

  const handleSignIn = () => {
    onOpen();
    setTypeModal("signin");
  };

  const handleSignUp = () => {
    onOpen();
    setTypeModal("signup");
  };

  const handleLogout = () => {
    storage.clearToken();
    location.reload();
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      paddingX="8px"
      gap="8px"
    >
      {!token ? (
        <>
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
        </>
      ) : (
        <>
          <CustomButton
            sx={{ paddingBottom: "4px", paddingX: "24px" }}
            label="Logout"
            onClick={handleLogout}
          />
        </>
      )}
    </Box>
  );
};
export default Header;
