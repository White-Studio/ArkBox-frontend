import React from "react";
import TypeAnimation from 'react-type-animation';
import {genID, sleep} from "../function";
import "../style/login.css";
import {
    Alert,
    Collapse,
    Fade,
    FormControl,
    IconButton,
    InputLabel,
    ListSubheader,
    MenuItem,
    Select,
} from "@mui/material";
import LoginForm from "./Login/Login";
import axios from "axios";
import SignUpForm from "./Login/SignUp";
import CloseIcon from '@mui/icons-material/Close';


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
            showPassword: false,
            formDisable: false,
            loading: false,
            idError: false,
            errorAlert: false,
            errorAlertMessage: "",
        }
        this.loginRef = React.createRef();

        this.handleChange = (prop) => (event) => {
            this.setState({[prop]: event.target.value});
        };
        this.handleBooleanChange = (prop) => () => {
            this.setState({[prop]: Boolean(!this.state[prop])});
        };

        this.regeneratorID = () => {
            this.setState({id: genID()});
        }

        this.startLoading = async () => {
            this.setState({formDisable: true})
            this.setState({loginInputFade: false})
            this.loginRef.current.style.width = "1em"
            this.loginRef.current.style.padding = "1em"
            await sleep(1000)
            this.loginRef.current.style.transform = "rotate(-45deg)"
            await sleep(100)
            this.setState({loading: true})
        }

        this.endLoading = async () => {
            this.setState({loading: false})
            this.setState({formDisable: false})
            this.loginRef.current.style.transform = "rotate(0deg)"
            await sleep(1000)
            this.setState({loginInputFade: true})
            const {innerWidth: w} = window;
            this.loginRef.current.style.width = w <= 500 ? "90vw" : "60vw"
            this.loginRef.current.style.padding = "2em"
        }

        this.signUp = async () => {
            await this.startLoading();
            await sleep(2000)
            await this.endLoading()

        }
        this.login = async () => {
            await this.startLoading();
            await sleep(2000)
            try {
                const res = await axios.get("/api/login", {
                    headers: {
                        databaseaccess: JSON.stringify({
                            id: process.env.REACT_APP_DATABASE_ACCESS_ID,
                            password: process.env.REACT_APP_DATABASE_ACCESS_PASSWORDD
                        }),
                        data: JSON.stringify({
                            id: this.state.id,
                            password: this.state.password==="" ? null : this.state.password
                        })
                    }
                });
                let error = res.data.error;
                if (error === null) {
                    console.log(res.data);
                    await this.endLoading();
                } else {
                    console.error(error)
                    await this.endLoading();
                    this.setState({errorAlert: true, errorAlertMessage: error})
                }
            }
            catch (err) {
                console.error(err)
                await this.endLoading();
                this.setState({errorAlert: true, errorAlertMessage: err})
            }


        }
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
        if (this.state.user === "signUp" && this.state.id === "") {
            this.setState({id: genID()})
        }
        console.log(this.state)

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
                            <div className={`login-box ${this.state.loading ? "login-box-loading" : ""}`}
                                 ref={this.loginRef}>
                                <Collapse in={this.state.loginInputFade} timeout={1000}>
                                    <div>
                                        <Collapse in={this.state.errorAlert}>
                                            <Alert
                                                severity="error"
                                                sx={{ mb: 2 }}
                                                action={
                                                    <IconButton
                                                        aria-label="close"
                                                        color="inherit"
                                                        size="small"
                                                        onClick={() => {
                                                            this.setState({errorAlert: false});
                                                        }}
                                                    >
                                                        <CloseIcon fontSize="inherit" />
                                                    </IconButton>
                                                }
                                            >
                                                {this.state.errorAlertMessage}
                                            </Alert>
                                        </Collapse>

                                        <FormControl fullWidth variant="filled">
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
                                                disabled={this.state.formDisable}
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
                                        </FormControl>
                                        <Collapse in={this.state.user === "login"} timeout={1000}>
                                            <LoginForm
                                                state={this.state}
                                                handleBooleanChange={this.handleBooleanChange}
                                                handleChange={this.handleChange}
                                                setState={this.setState}
                                                login={this.login}
                                            />
                                        </Collapse>
                                        <Collapse in={this.state.user === "signUp"} timeout={1000}>
                                            <SignUpForm
                                                state={this.state}
                                                handleBooleanChange={this.handleBooleanChange}
                                                handleChange={this.handleChange}
                                                setState={this.setState}
                                                signUp={this.signUp}
                                                regeneratorID={this.regeneratorID}
                                            />
                                        </Collapse>
                                    </div>

                                </Collapse>
                            </div> : null}
                    </div> : null
                }
            </>

        //
        );
    }
}