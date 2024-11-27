import Board from "@/components/Board";
import Sidebar from "@/components/Sidebar";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh' 
    }}>
      <Sidebar/>
      <Board/>
    </Box>
  );
}
