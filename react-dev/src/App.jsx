import './style/App.css';
import React from "react";
import {Collapse, createTheme, CssBaseline, Fade, Paper, ThemeProvider} from "@mui/material";
import Header from "./components/Header";
import {ReactComponent as Logo} from "./logo.svg";
import DarkModeButton from "./components/DarkModeButton";
import Login from "./components/Login"
import {sleep} from "./function";


export default class App extends React.Component {
    constructor(props) {
        super(props);


        // When first time visit
        const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        let data = JSON.parse(window.localStorage.getItem("ArkBox"));
        if (data === null) {
            data = {
                darkMode: prefersDarkMode ? "dark" : "light",
                users: []
            };
            window.localStorage.setItem("ArkBox", JSON.stringify(data))
        }
        data.darkMode === "dark" ? this.enableDarkMode() : this.enableLightMode()
        this.state = {
            darkMode: {
                mode: data.darkMode,
                theme: createTheme({
                    palette: {
                        mode: data.darkMode,
                    },
                })
            },
            logo: false,
            logoText: false,
            logoFate: true,
            login: false,
            home: false
        }
        this.changeTheme = () => {
            this.setState({
                darkMode: {
                    mode: this.state.darkMode.mode === "light" ? "dark" : "light",
                    theme: createTheme({
                        palette: {
                            mode: this.state.darkMode.mode === "light" ? "dark" : "light",
                        },
                    })
                }
            })

        }

        this.doneLogin = () => {

        }

    }

    enableDarkMode = () => {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
    }

    enableLightMode = () => {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let data = JSON.parse(window.localStorage.getItem("ArkBox"))
        data.darkMode = this.state.darkMode.mode
        window.localStorage.setItem("ArkBox", JSON.stringify(data))
        this.state.darkMode.mode === "light" ? this.enableLightMode() : this.enableDarkMode()
    }

    componentDidMount = async () => {
        await sleep(500)
        this.setState({logo: true})
        await sleep(2000)
        this.setState({logoText: true})
        await sleep(3000)
        this.setState({logoFate: false})
        await sleep(2000)
        this.setState({login: true})
    }

    render() {
        return (
            <ThemeProvider theme={this.state.darkMode.theme}>
                <CssBaseline/>
                <Paper style={{height: "100vh", borderRadius: 0}}>
                    {!this.state.home ?
                        !this.state.login ?
                        <Fade in={this.state.logoFate} timeout={2000}>
                            <div className="cont">
                                <div className="logo-light" style={{position: "absolute", top: "0", right: "0"}}>
                                    <DarkModeButton changeTheme={this.changeTheme}/>
                                </div>
                                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                    <div className={"divStart"}>
                                        <Collapse timeout={3000} in={this.state.logo}>
                                            <Logo className="logo-dark logoStart"/>
                                        </Collapse>
                                    </div>
                                    <Collapse orientation="horizontal" timeout={3000} in={this.state.logoText}>
                                        <p className={"nameStart"}>White&nbsp;Studio</p>
                                    </Collapse>
                                </div>
                            </div>
                        </Fade> : <Fade in={this.state.login} timeout={2000}>
                            <div className="cont">
                                <div className="logo-light" style={{position: "absolute", top: "0", right: "0"}}>
                                    <DarkModeButton changeTheme={this.changeTheme}/>
                                </div>
                                <Login doneLogin={this.doneLogin}/>
                            </div>
                        </Fade> : <Fade>
                            <div>
                                <Header changeTheme={this.changeTheme}/>
                            </div>
                        </Fade>
                    }
                </Paper>
            </ThemeProvider>
        );
    }
}