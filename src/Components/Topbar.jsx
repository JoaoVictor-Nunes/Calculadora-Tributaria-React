import * as React from "react";
import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { ColorModeContext, tokens } from "../Tema";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import Logo from "../../Assets/NAF.png";

const drawerWidth = 240;
const navItems = ["Home", "Detalhes", "Contatos", "Cálculo", "Sair"];

function Topbar(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleCalculoClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    handleCloseMenu();
    navigate(path);
  };

  const handleItemClick = (item, event) => {
    if (item === "Cálculo") {
      handleCalculoClick(event);
    } else if (item === "Sair") {
      navigate("/login");
    } else {
      navigate(`/${item.toLowerCase()}`);
    }
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        backgroundColor: colors.primary[500],
        color: colors.grey[100],
        height: "100%",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          my: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          color: colors.grey[100],
        }}
      >
        <img src={Logo} alt="Vasco" style={{ height: 24 }} />
        NAF
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{
                textAlign: "center",
                color: colors.grey[100],
                "&:hover": {
                  backgroundColor: colors.primary[300],
                },
              }}
              onClick={(event) => handleItemClick(item, event)}
            >
              <ListItemText primary={item} sx={{ color: colors.grey[100] }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => handleNavigate("/calculopf")}>
          Pessoa Física
        </MenuItem>
        <MenuItem onClick={() => handleNavigate("/calculopj")}>
          Pessoa Jurídica
        </MenuItem>
      </Menu>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          backgroundColor: colors.primary[200],
          color: colors.grey[100],
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 3,
            }}
          >
            <img src={Logo} alt="Vasco" style={{ height: 24 }} />
            NAF
          </Typography>
          <IconButton
            onClick={colorMode.toggleColorMode}
            sx={{ ml: 1, color: colors.grey[100] }}
          >
            {theme.palette.mode === "dark" ? (
              <LightModeOutlinedIcon />
            ) : (
              <DarkModeOutlinedIcon />
            )}
          </IconButton>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => {
              if (item === "Cálculo") {
                return (
                  <React.Fragment key={item}>
                    <Button
                      sx={{
                        position: "relative",
                        color: colors.grey[100],
                        "&:hover": {
                          backgroundColor: colors.primary[300],
                        },
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          left: 0,
                          bottom: 0,
                          width: 0,
                          height: "2px",
                          backgroundColor: "#2563eb",
                          transition: "width 0.3s ease",
                        },
                        "&:hover::after": {
                          width: "100%",
                        },
                      }}
                      onClick={handleCalculoClick}
                    >
                      {item}
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleCloseMenu}
                    >
                      <MenuItem onClick={() => handleNavigate("/calculopf")}>
                        Pessoa Física
                      </MenuItem>
                      <MenuItem onClick={() => handleNavigate("/calculopj")}>
                        Pessoa Jurídica
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                );
              } else if (item === "Sair") {
                return (
                  <Button
                    key={item}
                    sx={{
                      position: "relative",
                      color: colors.grey[100],
                      "&:hover": {
                        backgroundColor: colors.redAccent[800],
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        bottom: 0,
                        width: 0,
                        height: "2px",
                        backgroundColor: colors.redAccent[400],
                        transition: "width 0.3s ease",
                      },
                      "&:hover::after": {
                        width: "100%",
                      },
                    }}
                    onClick={() => navigate("/login")}
                  >
                    {item}
                  </Button>
                );
              } else {
                return (
                  <Button
                    key={item}
                    onClick={() => navigate(`/${item.toLowerCase()}`)}
                    sx={{
                      position: "relative",
                      color: colors.grey[100],
                      "&:hover": {
                        backgroundColor: colors.primary[300],
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        bottom: 0,
                        width: 0,
                        height: "2px",
                        backgroundColor: "#2563eb",
                        transition: "width 0.3s ease",
                      },
                      "&:hover::after": {
                        width: "100%",
                      },
                    }}
                  >
                    {item}
                  </Button>
                );
              }
            })}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: colors.primary[500],
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

export default Topbar;