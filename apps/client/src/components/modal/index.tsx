import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useModalContext } from "../../providers/modalProvider";
import SignInModal from "./signinModal";
import SignUpModal from "./signupModal";
import { GrClose } from "react-icons/gr";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

export default function AuthModal() {
  const { isOpen, onClose, type } = useModalContext();

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <Box display="flex" justifyContent="flex-end">
          <GrClose size={24} onClick={onClose} style={{cursor: "pointer"}} />
        </Box>
        <Typography variant="h6" component="h2" textAlign="center">
          {type === "signin" ? "Sign In" : "Sign Up"}
        </Typography>

        {type === "signin" && <SignInModal />}
        {type === "signup" && <SignUpModal />}
      </Box>
    </Modal>
  );
}
