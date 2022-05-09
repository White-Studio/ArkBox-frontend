import React from "react";
import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "../style/darkModeButton.css";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

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
                            <IconButton onClick={this.props.changeTheme}>
                                <svg style={{filter: "invert(1)"}} xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                     viewBox="0 0 472.39 472.39">
                                    <g className="toggle-sun">
                                        <path
                                            d="M403.21,167V69.18H305.38L236.2,0,167,69.18H69.18V167L0,236.2l69.18,69.18v97.83H167l69.18,69.18,69.18-69.18h97.83V305.38l69.18-69.18Zm-167,198.17a129,129,0,1,1,129-129A129,129,0,0,1,236.2,365.19Z"/>
                                    </g>
                                    <g className="toggle-circle">
                                        <circle className="cls-1" cx="236.2" cy="236.2" r="103.78"/>
                                    </g>
                                </svg>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </Box>
            </header>
        );
    }
}