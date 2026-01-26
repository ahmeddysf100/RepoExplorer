import {
  Outlet,
  useLocation,
  useParams,
  Link as RouterLink,
} from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Link,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExploreIcon from "@mui/icons-material/Explore";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemeStore } from "@/core/stores/themeStore";
import { config } from "@/shared/config";

function NavBar() {
  const mode = useThemeStore((s) => s.mode);
  const toggle = useThemeStore((s) => s.toggle);
  const { pathname } = useLocation();
  const { owner, name } = useParams();
  const isDetail = pathname.startsWith("/repo/") && owner && name;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        color: "text.primary",
        bgcolor: (t) =>
          t.palette.mode === "dark"
            ? "rgba(15, 23, 42, 0.85)"
            : "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(12px)",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1280,
          width: "100%",
          mx: "auto",
          px: { xs: 2, sm: 3 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mr: "auto" }}>
          {isDetail && (
            <>
              <Link
                component={RouterLink}
                to="/search"
                color="text.secondary"
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  "&:hover": { color: "primary.main" },
                }}
              >
                <ArrowBackIcon sx={{ fontSize: 18 }} />
                Back to Search
              </Link>
              <Box
                sx={{
                  width: "2px",
                  height: 30,
                  bgcolor: "grey.400",
                  mx: 0.5,
                  borderRadius: "10px",  
                }}
              />
            </>
          )}
          <Link
            component={RouterLink}
            to="/search"
            color="inherit"
            underline="none"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            {!isDetail ? (
              <ExploreIcon sx={{ color: "primary.main", fontSize: 32 }} />
            ) : (
              <AccountTreeIcon sx={{ color: "primary.main", fontSize: 28 }} />
            )}
            <Typography variant="h6" fontWeight="bold" letterSpacing="-0.02em">
              {config.appName}
            </Typography>
          </Link>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            onClick={toggle}
            aria-label={mode === "dark" ? "Light mode" : "Dark mode"}
            sx={{ color: "text.secondary" }}
          >
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          {isDetail && (
            <Button
              component="a"
              href={`${config.github.baseUrl}/${owner}/${name}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              size="small"
              sx={{
                display: { xs: "none", sm: "inline-flex" },
                bgcolor: "grey.900",
                color: "white",
                "&:hover": { bgcolor: "grey.800" },
                ...(mode === "dark" && {
                  bgcolor: "grey.100",
                  color: "grey.900",
                  "&:hover": { bgcolor: "grey.200" },
                }),
              }}
            >
              Open in GitHub
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: 1,
        borderColor: "divider",
        mt: 10,
        py: 6,
        bgcolor: (t) =>
          t.palette.mode === "dark" ? "grey.900" : "background.paper",
      }}
    >
      <Box
        sx={{
          maxWidth: 1280,
          mx: "auto",
          px: { xs: 2, sm: 3 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ExploreIcon sx={{ color: "primary.main", fontSize: 24 }} />
          <Typography fontWeight="bold" color="text.primary">
            {config.appName}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} {config.appName}. All rights reserved.
        </Typography>
        <Box sx={{ display: "flex", gap: 3 }}>
          <Link
            href="#"
            color="text.secondary"
            variant="body2"
            underline="hover"
            sx={{ "&:hover": { color: "primary.main" } }}
          >
            Privacy
          </Link>
          <Link
            href="#"
            color="text.secondary"
            variant="body2"
            underline="hover"
            sx={{ "&:hover": { color: "primary.main" } }}
          >
            Terms
          </Link>
          <Link
            href="#"
            color="text.secondary"
            variant="body2"
            underline="hover"
            sx={{ "&:hover": { color: "primary.main" } }}
          >
            API Status
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export function AppLayout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <NavBar />
      <Box
        component="main"
        sx={{
          flex: 1,
          maxWidth: 1280,
          width: "100%",
          mx: "auto",
          px: { xs: 2, sm: 3 },
          py: 6,
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
