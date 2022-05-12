import React from "react";
import TypeAnimation from 'react-type-animation';
import {genID, sleep} from "../function";
import "../style/login.css";
import {
    Box, Button, Checkbox,
    Collapse,
    Divider, Fade,
    FormControl, FormControlLabel,
    IconButton,
    InputAdornment, InputLabel, ListSubheader, Menu,
    MenuItem, OutlinedInput, Select,
    TextField,
    Tooltip
} from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {Replay, Visibility, VisibilityOff} from "@mui/icons-material";

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
            password: "",
            username: "",
            inUserName: false,
            remember: true,
            rememberPassword: false,
            autoLogin: true,
            showPassword: false
        }
        this.loginRef = React.createRef();

        this.handleChange = (prop) => (event) => {
            this.setState({...this.state, [prop]: event.target.value});
        };
        this.handleBooleanChange = (prop) => (event) => {
            this.setState({...this.state, [prop]: Boolean(!this.state[prop])});
        };
    }


    componentDidMount = async () => {
        await sleep(1000)
        this.setState({ready: true})
        await sleep(2000)
        this.setState({showBox: true})
        await sleep(1)
        const {innerWidth: w} = window;
        this.loginRef.current.style.width = w <= 500 ? "90vw" : "60vw"
        this.loginRef.current.style.height = "auto"
        this.loginRef.current.style.padding = "2em"
        this.setState({loginInputFade: true})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state);
        if (this.state.user === "signUp" && this.state.id === "") {
            this.setState({id: genID()})
        }
    }


    render() {
        return (
            <>
                {this.state.ready ?
                    <div className="cont" style={{flexDirection: "column"}}>
                        <TypeAnimation
                            cursor={false}
                            sequence={["ACCESS PERMISSION REQUIRED"]}
                        />
                        {this.state.showBox ?
                            <div className={`login-box`} ref={this.loginRef}>
                                <Collapse in={this.state.loginInputFade} timeout={1000}>
                                    <FormControl fullWidth style={{height: "100%"}} variant="filled">
                                        <InputLabel id="account-select-label">Access Permission</InputLabel>
                                        <Select
                                            labelid="account-select-label"
                                            id="account-select"
                                            label="Access Permission"
                                            value={this.state.user}
                                            onChange={this.handleChange("user")}
                                            MenuProps={{
                                                TransitionComponent: Fade
                                            }}
                                        >
                                            <ListSubheader style={{textAlign: "center"}}>-- Adding New Access
                                                --</ListSubheader>
                                            <MenuItem key={"login"} value={"login"}>Use a existed Access
                                                Permission</MenuItem>
                                            <MenuItem key={"signUp"} value={"signUp"}>Apply for a new Access
                                                Permission</MenuItem>
                                            {this.users.length === 0 ? null : <>
                                                <ListSubheader style={{textAlign: "center"}}>-- Continue with saved
                                                    Access --</ListSubheader>
                                                {this.users.map((e) => (
                                                    <MenuItem key={e.id} value={e.id}>{e.username}</MenuItem>
                                                ))}
                                            </>}
                                        </Select>
                                        <Collapse in={this.state.user === "signUp"} timeout={1000}>
                                            <Box style={{paddingTop: "1em"}}>
                                                <div style={{margin: "1em"}}>
                                                    <h1 style={{textAlign: "center"}} className={"numberId cont"}>ArkBoxID:
                                                        {this.state.id}
                                                        <IconButton onClick={() => this.setState({id: genID()})}>
                                                            <Replay/>
                                                        </IconButton>
                                                    </h1>
                                                </div>
                                                <div style={{margin: "1em"}}>
                                                    <FormControl fullWidth>
                                                        <InputLabel htmlFor="input-username">Username</InputLabel>
                                                        <OutlinedInput
                                                            id="input-username"
                                                            value={this.state.username}
                                                            onChange={this.handleChange("username")}
                                                            onFocus={() => this.setState({inUserName: true})}
                                                            onBlur={() => this.setState({inUserName: false})}
                                                            startAdornment={
                                                                this.state.inUserName ?
                                                                    <InputAdornment position="start">
                                                                        Dr.
                                                                    </InputAdornment> : null
                                                            }
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    <IconButton cursor={"help"}>
                                                                        <Tooltip
                                                                            title={"The nick name we will call you, (Default: \"Doctor\")"}
                                                                            placement={"top"}>
                                                                            <HelpOutlineIcon/>
                                                                        </Tooltip>
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            }
                                                            label="Username"
                                                            fullWidth
                                                        />
                                                    </FormControl>
                                                </div>
                                                <div style={{margin: "1em"}}>
                                                    <FormControl fullWidth>
                                                        <InputLabel htmlFor="input-password">Password</InputLabel>
                                                        <OutlinedInput
                                                            id="input-password"
                                                            value={this.state.password}
                                                            onChange={this.handleChange("password")}
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    <Fade in={this.state.password !== ''}
                                                                          timeout={1000}>
                                                                        <IconButton
                                                                            style={{margin: "0.25em"}}
                                                                            aria-label="toggle password visibility"
                                                                            onClick={this.handleBooleanChange("showPassword")}
                                                                            edge="end"
                                                                        >
                                                                            {this.state.showPassword ?
                                                                                <VisibilityOff/> : <Visibility/>}
                                                                        </IconButton>
                                                                    </Fade>
                                                                    <IconButton cursor={"help"}>
                                                                        <Tooltip
                                                                            title={"The password you need to enter if you need to get access with this Assess ID\n(You can left it blank if you don't want to enter password)"}
                                                                            placement={"top"}>
                                                                            <HelpOutlineIcon/>
                                                                        </Tooltip>
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            }
                                                            label="Password"
                                                            fullWidth
                                                            type={this.state.showPassword ? "text" : "password"}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <div style={{
                                                    margin: "1em",
                                                    display: "flex",
                                                    justifyContent: "space-around",
                                                    flexWrap: "wrap"
                                                }}>
                                                    <FormControlLabel
                                                        id={"remember-me-check"}
                                                        label="Remember This Access"
                                                        control={<Checkbox/>}
                                                        value={this.state.remember}
                                                        onClick={this.handleBooleanChange("remember")}
                                                    />
                                                    <FormControlLabel
                                                        id={"autologin-check"}
                                                        label="Auto Login using this Access"
                                                        control={<Checkbox/>}
                                                        value={this.state.autoLogin}
                                                        onClick={this.handleBooleanChange("autoLogin")}
                                                    />
                                                    <Collapse in={this.state.password !== ""}>
                                                        <FormControlLabel
                                                            id={"remember-password-check"}
                                                            label="Remember Password"
                                                            control={<Checkbox/>}
                                                            value={this.state.rememberPassword}
                                                            onClick={this.handleBooleanChange("rememberPassword")}
                                                        />
                                                    </Collapse>
                                                </div>
                                                <div style={{
                                                    margin: "1em",
                                                    display: "flex",
                                                    justifyContent: "space-around",
                                                    flexWrap: "wrap"
                                                }}>
                                                    <Button size={"large"} color={"success"}
                                                            variant="outlined">Apply</Button>
                                                </div>
                                            </Box>
                                        </Collapse>
                                    </FormControl>
                                </Collapse>
                            </div> : null}

                    </div> : null
                }
            </>


        );
    }
}