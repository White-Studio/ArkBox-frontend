import React from "react";
import TypeAnimation from 'react-type-animation';
import {genID, sleep} from "../function";
import "../style/login.css";
import {Collapse, FormControl, FormHelperText, IconButton, MenuItem, TextField} from "@mui/material";
import {grey} from "@mui/material/colors";
import CachedIcon from '@mui/icons-material/Cached';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.users = JSON.parse(window.localStorage.getItem("ArkBox")).users

        this.state = {
            ready: false,
            showBox: false,
            loginInputFade: false,
            user: "",
            id: "",
            password: ""
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
        const { innerWidth: w } = window;
        this.loginRef.current.style.width = w <= 500 ? "90vw" : "60vw"
        await sleep(2000)
        this.loginRef.current.style.height = w <= 500 ? "80vh" : "70vh"
        await sleep(1000)
        this.setState({loginInputFade: true})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.user === "signUp" && this.state.id === "") {
            this.setState({id: genID()})
        }
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
                                        <MenuItem key={"signUp"} value={"signUp"}>Apply for a new Access Permission</MenuItem>
                                    </TextField>
                                    {this.state.user === "signUp" ?
                                        <div style={{margin: "1em"}}>
                                            <TextField
                                                required
                                                label={"Username"}
                                                value={this.username}
                                                fullWidth
                                            />
                                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                                <TextField
                                                    required
                                                    type={"password"}
                                                    label={"Password"}
                                                    value={this.password}
                                                    style={{width: "50%"}}
                                                />
                                                <h1
                                                    className={"numberId"}>
                                                    ArkBoxID#{this.state.id}
                                                </h1>
                                                <IconButton onClick={() => this.setState({id: genID()})}>
                                                    <CachedIcon/>
                                                </IconButton>
                                            </div>
                                        </div> : <div>

                                        </div>}
                                </FormControl>
                            </Collapse>
                        </div> : null }

                    </div> : null
                }
            </>


        );
    }
}