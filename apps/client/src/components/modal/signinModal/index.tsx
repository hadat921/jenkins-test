import { Box, Typography } from "@mui/material";
import CustomButton from "../../button";
import InputField from "../../inputField";
import { useState, ChangeEvent, FormEvent, useEffect, useMemo } from "react";
import { axiosInstance } from "../../../utils/axios";
import { storage } from "../../../utils/storage";
import { useModalContext } from "../../../providers/modalProvider";

const SignInModal = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { onClose } = useModalContext();

  const handleChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    storage.setToken("accessToken");

    onClose();
  };

  useEffect(() => {
    const getData = async () => {
      const data = await axiosInstance.get("/posts");

      console.log(data);
    };
    getData();
  }, []);

  const sxButton = useMemo(() => {
    return { paddingX: 8, marginTop: 2 };
  }, []);

  return (
    <Box component={"form"} mt={2} onSubmit={handleSubmit}>
      <Box display="flex" alignItems="center" gap={2}>
        <Typography variant="body1" width="100px">
          Username
        </Typography>
        <InputField
          label="Username"
          value={username}
          setValue={handleChangeUsername}
        />
      </Box>

      <Box mt={2} display="flex" alignItems="center" gap={2}>
        <Typography variant="body1" width="100px">
          Password
        </Typography>
        <InputField
          label="Password"
          value={password}
          setValue={handleChangePassword}
          type="password"
        />
      </Box>

      <Box display="flex" justifyContent="center">
        <CustomButton label="Sign in" sx={sxButton} isSubmit={true} />
      </Box>
    </Box>
  );
};

export default SignInModal;
