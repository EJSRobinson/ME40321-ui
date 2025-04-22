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
import logo from '../logo-2.png';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const MainAppBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <AppBar position='sticky' sx={{ bgcolor: '#eaaeae' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ mt: 1 }}>
          <img src={logo} alt='' height='60' />
        </Box>
        <Typography variant='h6' component='div' sx={{ ml: 0, color: '#111' }}>
          ME40321
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
