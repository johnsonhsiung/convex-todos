"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Authenticated, Unauthenticated } from "convex/react";
import { UserButton, SignInButton } from "@clerk/nextjs";


export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Todos
          </Typography>
          <Authenticated>
            <UserButton></UserButton>
          </Authenticated>
          <Unauthenticated>
            <SignInButton>
              <Button color="inherit">Login</Button>
            </SignInButton>
          </Unauthenticated>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
