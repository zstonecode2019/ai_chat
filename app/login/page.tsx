"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignIn() {
  const router = useRouter();
  const [nicknameError, setNicknameError] = React.useState(false);
  const [nicknameErrorMessage, setNicknameErrorMessage] = React.useState("");
  const [OpenRouterAPIkeyError, setOpenRouterAPIkeyError] =
    React.useState(false);
  const [OpenRouterAPIkeyErrorMessage, setOpenRouterAPIkeyErrorMessage] =
    React.useState("");

  // 登录表单提交
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (nicknameError || OpenRouterAPIkeyError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);

    // 保存用户信息到localStorage
    const userInfo = {
      nickname: data.get("nickname"),
      OpenRouterAPIkey: data.get("OpenRouterAPIkey"),
    };
    localStorage.setItem("userInfo", JSON.stringify(userInfo) as string);
    event.preventDefault();
    router.replace("/");
  };

  // 验证输入
  const validateInputs = () => {
    const nickname = document.getElementById("nickname") as HTMLInputElement;
    const OpenRouterAPIkey = document.getElementById(
      "OpenRouterAPIkey"
    ) as HTMLInputElement;

    let isValid = true;

    if (!nickname.value || nickname.value.length > 10) {
      setNicknameError(true);
      setNicknameErrorMessage(
        "Please enter a valid nickname between 1 - 10 characters long."
      );
      isValid = false;
    } else {
      setNicknameError(false);
      setNicknameErrorMessage("");
    }

    if (!OpenRouterAPIkey.value) {
      setOpenRouterAPIkeyError(true);
      setOpenRouterAPIkeyErrorMessage("Please enter your OpenRouterAPIkey.");
      isValid = false;
    } else {
      setOpenRouterAPIkeyError(false);
      setOpenRouterAPIkeyErrorMessage("");
    }

    return isValid;
  };

  return (
    <div>
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="nickname">Nickname</FormLabel>
              <TextField
                error={nicknameError}
                helperText={nicknameErrorMessage}
                id="nickname"
                type="nickname"
                name="nickname"
                placeholder="please input your nickname here"
                autoComplete="nickname"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={nicknameError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="OpenRouterAPIkey">OpenRouterAPIkey</FormLabel>
              <TextField
                error={OpenRouterAPIkeyError}
                helperText={OpenRouterAPIkeyErrorMessage}
                name="OpenRouterAPIkey"
                placeholder="••••••"
                type="OpenRouterAPIkey"
                id="OpenRouterAPIkey"
                autoComplete="current-OpenRouterAPIkey"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={OpenRouterAPIkeyError ? "error" : "primary"}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign in
            </Button>
          </Box>
        </Card>
      </SignInContainer>
    </div>
  );
}
