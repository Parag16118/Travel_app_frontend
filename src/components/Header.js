import React, { Fragment } from "react";
// import { Link } from "react-router-dom";
import {AppBar,Typography,Toolbar,} from '@material-ui/core';

function Header() {
  return (
    <AppBar position="static" className="mb-4">
      <Toolbar>
        <Typography variant="h6" className="">
          Travel App
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
