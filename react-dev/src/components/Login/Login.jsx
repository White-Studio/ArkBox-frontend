import React from "react";
import {
    Box, Button, Checkbox, Collapse,
    Fade,
    FormControl, FormControlLabel,
    FormGroup,
    IconButton,
    InputAdornment,
    InputBase,
    InputLabel,
    OutlinedInput
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";


export default class LoginForm extends React.Component {
    render() {
        return (
            <Box style={{paddingTop: "1em"}}>
                <div style={{margin: "1em"}}>
                    <div style={{textAlign: "center", fontSize: "2em"}}
                         className={"numberId cont"}>
                        ArkBoxID:
                        <FormControl>
                            <InputBase
                                sx={{
                                    fontSize: "1em",
                                    width: "5em"
                                }}
                                error={this.props.state.idError}
                                id="input-id-login"
                                value={this.props.state.id}
                                onChange={this.props.handleChange("id")}
                                type="number"
                            />
                        </FormControl>
                    </div>
                </div>
                <div style={{margin: "1em"}}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="input-password-login">Password (if you
                            have)</InputLabel>
                        <OutlinedInput
                            id="input-password-login"
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
                                </InputAdornment>
                            }
                            label="Password (if you have)"
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
                                    checked={this.props.state.remember}
                                    onChange={this.props.handleBooleanChange("remember")}
                                    disabled={this.props.state.formDisable}
                                />
                                <FormControlLabel
                                    id={"autologin-check"}
                                    label="Auto Login using this Access"
                                    control={<Checkbox/>}
                                    checked={this.props.state.autoLogin}
                                    onChange={this.props.handleBooleanChange("autoLogin")}
                                    disabled={this.props.state.formDisable}
                                />
                                <Collapse in={this.props.state.password !== ""}>
                                    <FormControlLabel
                                        id={"remember-password-check"}
                                        label="Remember Password"
                                        checked={this.props.state.rememberPassword}
                                        control={<Checkbox/>}
                                        onChange={this.props.handleBooleanChange("rememberPassword")}
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
                        onClick={this.props.login}
                        disabled={this.props.state.formDisable}
                    >Login</Button>
                </div>
            </Box>
        );
    }
}