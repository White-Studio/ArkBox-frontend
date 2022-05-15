import React from "react";
import {
    Box, Button, Checkbox, Collapse,
    Fade,
    FormControl, FormControlLabel,
    FormGroup,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Tooltip
} from "@mui/material";
import AnimatedNumber from "animated-number-react";
import {Replay, Visibility, VisibilityOff} from "@mui/icons-material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default class SignUpForm extends React.Component {

    render() {
        return (
            <Box style={{paddingTop: "1em"}}>
                <div style={{margin: "2em"}}>
                    <h1 style={{textAlign: "center", fontSize: "2em"}}
                        className={"numberId cont"}>
                        ArkBoxID:
                        <FormControl>
                            <AnimatedNumber
                                style={{fontSize: "1em"}}
                                value={this.props.state.id}
                                formatValue={(value) => value.toFixed(0)}
                            />
                        </FormControl>
                        <IconButton onClick={this.props.regeneratorID}
                                    disabled={this.props.state.formDisable}>
                            <Replay/>
                        </IconButton>
                    </h1>
                </div>
                <div style={{margin: "1em"}}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="input-username">Username</InputLabel>
                        <OutlinedInput
                            id="input-username"
                            value={this.props.state.username}
                            onChange={this.props.handleChange("username")}
                            onFocus={() => this.props.setState({inUserName: true})}
                            onBlur={() => this.props.setState({inUserName: false})}
                            startAdornment={
                                this.props.state.inUserName ?
                                    <InputAdornment position="start">
                                        Dr.
                                    </InputAdornment> : null
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <Tooltip
                                        title={"The nick name we will call you, (Default: \"Doctor\")"}
                                        placement={"top"}>
                                        <IconButton cursor={"help"}>

                                            <HelpOutlineIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            }
                            label="Username"
                            fullWidth
                            disabled={this.props.state.formDisable}
                        />
                    </FormControl>
                </div>
                <div style={{margin: "1em"}}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="input-password">Password</InputLabel>
                        <OutlinedInput
                            id="input-password"
                            value={this.props.state.password}
                            onChange={this.props.handleChange("password")}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Fade in={this.props.state.password !== ''}
                                          timeout={1000}>
                                        <IconButton
                                            style={{margin: "0.25em"}}
                                            aria-label="toggle password visibility"
                                            onClick={this.props.handleBooleanChange("showPassword")}
                                            edge="end"
                                        >
                                            {this.props.state.showPassword ?
                                                <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </Fade>
                                    <Tooltip
                                        title={"The password you need to enter if you need to get access with this Assess ID\n(You can left it blank if you don't want to enter password)"}
                                        placement={"top"}>
                                        <IconButton cursor={"help"}>

                                            <HelpOutlineIcon/>

                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            }
                            label="Password"
                            fullWidth
                            type={this.props.state.showPassword ? "text" : "password"}
                            disabled={this.props.state.formDisable}
                        />
                    </FormControl>
                </div>
                <div style={{
                    margin: "1em",
                }}>
                    <FormControl fullWidth>
                        <FormGroup style={{width: "100%"}}>
                            <Collapse
                                in={this.props.state.loginInputFade}
                                sx={{
                                    "& .MuiCollapse-wrapperInner": {
                                        display: "flex",
                                        flexWrap: "wrap",
                                        justifyContent: "space-around"
                                    }
                                }}

                            >
                                <FormControlLabel
                                    id={"remember-me-check"}
                                    label="Remember This Access"
                                    control={<Checkbox/>}
                                    value={this.props.state.remember}
                                    onClick={this.props.handleBooleanChange("remember")}
                                    defaultChecked
                                    disabled={this.props.state.formDisable}
                                />
                                <FormControlLabel
                                    id={"autologin-check"}
                                    label="Auto Login using this Access"
                                    control={<Checkbox/>}
                                    value={this.props.state.autoLogin}
                                    onClick={this.props.handleBooleanChange("autoLogin")}
                                    defaultChecked
                                    disabled={this.props.state.formDisable}
                                />
                                <Collapse in={this.props.state.password !== ""}>
                                    <FormControlLabel
                                        id={"remember-password-check"}
                                        label="Remember Password"
                                        control={<Checkbox/>}
                                        value={this.props.state.rememberPassword}
                                        onClick={this.props.handleBooleanChange("rememberPassword")}
                                        disabled={this.props.state.formDisable}
                                    />
                                </Collapse>
                            </Collapse>
                        </FormGroup>
                    </FormControl>
                </div>
                <div style={{
                    margin: "1em",
                    display: "flex",
                    justifyContent: "space-around",
                    flexWrap: "wrap"
                }}>
                    <Button
                        size={"large"}
                        color={"success"}
                        variant="outlined"
                        onClick={this.props.signUp}
                        disabled={this.props.state.formDisable}
                    >Apply</Button>
                </div>
            </Box>
        );
    }
}