import React from "react";
import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeButton from "./DarkModeButton";

export default class Header extends React.Component {


    render() {
        return (
            <header>
                <Box sx={{ flexGrow: 2 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                ArkBox
                            </Typography>
                            <DarkModeButton changeTheme={this.props.changeTheme} />
                        </Toolbar>
                    </AppBar>
                </Box>
            </header>
        );
    }
}