import React from "react";
import TypeAnimation from 'react-type-animation';
import {sleep} from "../function";
import "../style/login.css";
import Select from '@mui/material/Select';
import {Collapse, FormControl, InputLabel, MenuItem, TextField} from "@mui/material";

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.users = JSON.parse(window.localStorage.getItem("ArkBox")).users

        this.state = {
            ready: false,
            showBox: false,
            loginInputFade: false,
            user: ""
        }
        this.loginRef = React.createRef();


        this.handleChange = (event) => {
            this.setState({user: event.target.value});
        };
    }

    componentDidMount = async () => {
        await sleep(1000)
        this.setState({ready: true})
        await sleep(2000)
        this.setState({showBox: true})
        await sleep(1)
        const { innerWidth: w, innerHeight: h } = window;
        this.loginRef.current.style.width = w <= 425 ? "90vw" : "60vw"
        await sleep(2000)
        this.loginRef.current.style.height = w <= 425 ? "80vh" : "70vh"
        await sleep(1000)
        this.setState({loginInputFade: true})
    }


    render() {
        return (
            <>
                {this.state.ready ?
                    <div className="cont" style={{ flexDirection: "column" }}>
                        <TypeAnimation
                            cursor={false}
                            sequence={["ACCESS PERMISSION REQUIRED"]}
                        />
                        {this.state.showBox ?
                        <div className={`login-box`} ref={this.loginRef}>
                            <Collapse in={this.state.loginInputFade} timeout={2000} style={{ margin: "2em" }}>
                                <FormControl fullWidth style={{ height: "100%" }}>
                                    <TextField
                                        select
                                        labelid="account-select-label"
                                        id="account-select"
                                        label="Access Permission"
                                        value={this.state.user}
                                        onChange={this.handleChange}
                                        variant="filled"
                                    >
                                        {this.users===[] ? null : this.users.map((e) => (
                                            <MenuItem key={e.id} value={e.id}>{e.username}</MenuItem>
                                        ))}
                                        <MenuItem key={"login"} value={"login"}>Use a existed Access Permission</MenuItem>
                                        <MenuItem key={"signIn"} value={"signIn"}>Apply for a new Access Permission</MenuItem>
                                    </TextField>
                                </FormControl>
                            </Collapse>
                        </div> : null }

                    </div> : null
                }
            </>


        );
    }
}