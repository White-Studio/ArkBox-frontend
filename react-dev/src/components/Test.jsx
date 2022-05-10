import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NoSsr from '@mui/material/NoSsr';
import {
    createTheme,
    ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';
import Paper from '@mui/material/Paper';

const customTheme = createTheme({
    palette: {
        primary: {
            main: deepPurple[500],
        },
    },
});

const StyledAvatar = styled(Paper)`
  ${({ theme }) => `
  cursor: pointer;
  background-color: ${theme.palette.primary.main};
  transition: ${theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.standard,
})};
  &:hover {
    background-color: ${theme.palette.secondary.main};
  }
  `}
`;

export default function TransitionHover() {
    return (
        <NoSsr>
            <MuiThemeProvider theme={customTheme}>
                <ThemeProvider theme={customTheme}>
                    <StyledAvatar>OP</StyledAvatar>
                </ThemeProvider>
            </MuiThemeProvider>
        </NoSsr>
    );
}
