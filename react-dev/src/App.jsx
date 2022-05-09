import './style/App.css';
import React from "react";
import {createTheme, Paper, ThemeProvider} from "@mui/material";
import Header from "./components/Header";

export default class App extends React.Component {
    constructor(props) {
        super(props);


        // When first time visit
        const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        let data = JSON.parse(window.localStorage.getItem("ArkBox"));
        if (data === null) {
            data = {
                darkMode: prefersDarkMode ? "dark" : "light",
            };
            window.localStorage.setItem("ArkBox", JSON.stringify(data))
        }
        data.darkMode==="dark" ? this.enableDarkMode() : this.enableLightMode()
        this.state = {
            darkMode: {
                mode: data.darkMode,
                theme: createTheme({
                    palette: {
                        mode: data.darkMode
                    }
                })
            }
        }
        this.changeTheme = () => {
            this.setState({
                darkMode: {
                    mode: this.state.darkMode.mode==="light"?"dark":"light",
                    theme: createTheme({
                        palette: {
                            mode: this.state.darkMode.mode==="light"?"dark":"light"
                        }
                    })
                }
            })

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

    render() {
        return (
            <ThemeProvider theme={this.state.darkMode.theme}>
                <Paper style={{height: "100vh", borderRadius: 0}}>
                    <Header changeTheme={this.changeTheme}/>
                </Paper>
            </ThemeProvider>
        );
    }
}