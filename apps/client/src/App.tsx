import { Box } from "@mui/material";
import Header from "./components/header";
import AuthModal from "./components/modal";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Box height="100vh">
      <Header />
      <Toaster position="top-center" />
      <AuthModal />
    </Box>
  );
}

export default App;
