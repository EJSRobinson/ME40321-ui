/**
 Copyright (C) 2021, IAConnects Technology Limited
 All Rights Reserved

 ALL INFORMATION CONTAINED HEREIN IS, AND REMAINS
 THE PROPERTY OF IACONNECTS TECHNOLOGY LIMITED AND ITS SUPPLIERS,
 IF ANY. THE INTELLECTUAL AND TECHNICAL CONCEPTS CONTAINED
 HEREIN ARE PROPRIETARY TO IACONNECTS TECHNOLOGY LIMITED
 AND ITS SUPPLIERS AND ARE PROTECTED BY TRADE SECRET OR COPYRIGHT LAW.
 DISSEMINATION OF THIS INFORMATION OR REPRODUCTION OF THIS MATERIAL
 IS STRICTLY FORBIDDEN UNLESS PRIOR WRITTEN PERMISSION IS OBTAINED
 FROM IACONNECTS TECHNOLOGY LIMITED.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS
 BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 POSSIBILITY OF SUCH DAMAGE.
 **/

import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from '../logo-square.png';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#eee',
      paper: '#fff',
    },
    text: {
      primary: '#22303d',
      secondary: '#848a91',
    },
    primary: {
      main: '#9e7470',
    },
    secondary: {
      main: '#eee',
    },
    warning: {
      light: '#ecdf62',
      main: '#ecd718',
    },
  },

  components: {
    MuiChip: {
      styleOverrides: {
        colorPrimary: {
          color: '#eee',
          borderColor: '#eee',
        },
      },
    },
  },
});

const MainAppBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position='sticky'>
      <ThemeProvider theme={theme}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant='h6' component='div' sx={{ ml: 0, color: '#eee' }}>
            ME40321
          </Typography>
          <Box sx={{ mt: 1 }}>
            <img src={logo} alt='' height='35' />
          </Box>
        </Toolbar>
      </ThemeProvider>
    </AppBar>
  );
};

export default MainAppBar;
