import { Box, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";

import CustomButton from "../../button";
import InputField from "../../inputField";

import { useState, ChangeEvent } from "react";

const SignUpModal = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const handleChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleChangeConfirmPassword = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords did not match");
    }else {
      setError("");
    }
  };

  return (
    <Box component={"form"} mt={2} onSubmit={handleSubmit}>
      <Box display="flex" alignItems="center">
        <Typography variant="body1" width="120px">
          Username
        </Typography>
        <InputField
          label="Username"
          value={username}
          setValue={handleChangeUsername}
        />
      </Box>

      <Box mt={2} display="flex" alignItems="center">
        <Typography variant="body1" width="120px">
          Password
        </Typography>
        <InputField
          label="Password"
          value={password}
          setValue={handleChangePassword}
          type="password"
        />
      </Box>

      <Box mt={2} display="flex" alignItems="center">
        <Typography variant="body1" width="120px">
          Confirm Password
        </Typography>
        <InputField
          label="Confirm Password"
          value={confirmPassword}
          setValue={handleChangeConfirmPassword}
          type="password"
        />
      </Box>

      {error && (
        <Alert sx={{ marginTop: 2 }} severity="error">
          {error}
        </Alert>
      )}

      <Box display="flex" justifyContent="center">
        <CustomButton
          isSubmit
          label="Sign up"
          sx={{ paddingX: 8, marginTop: 2 }}
        />
      </Box>
    </Box>
  );
};

export default SignUpModal;
