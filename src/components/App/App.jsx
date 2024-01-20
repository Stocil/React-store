import { Box } from "@mui/material";

import { Header } from "../Header/Header";
import { AppRoutes } from "../Routes/Routes";

function App() {
  return (
    <>
      <Header />

      <Box component="main" pt={8}>
        <AppRoutes />
      </Box>
    </>
  );
}

export default App;
