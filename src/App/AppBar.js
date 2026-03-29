import { Button, Grid, TextField, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AddIcon from "@mui/icons-material/Add";

export default function MyAppBar() {
  return (
    <Box>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#fff", py: "16px", px: "20px" }}
      >
        <Toolbar>
          {/* Title //////////////////////////////////*/}
          <Box>
            <Typography
              variant="h4"
              noWrap
              component="div"
              color="#464646"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              لوحة تحكم المكتب
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              color="gray"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              مرحبا بعودتك! إليك أهم تحديثات المكتب اليوم
            </Typography>
          </Box>
          {/* ////////////// */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" }, padding: {} }}>
            <Grid container spacing={1}>
              <Grid size={8}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="🔍 بحث"
                  size="small"
                  fullWidth
                  color="#EFF1F8"
                  placeholder="البحث عن مستخدم باستخدام الاسم الأول، الاسم الأخير، أو الإيميل..."
                  // value={searchTerm}
                  // onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Grid>
              <Grid size={4}>
                <Button
                  // onClick={handleCreateUser}
                  size="small"
                  style={{ height: "100%", borderRadius: "15px" }}
                  variant="contained"
                  startIcon={<AddIcon />}
                >
                  إضافة قضية
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
