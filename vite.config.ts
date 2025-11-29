import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    host: "0.0.0.0", // Cho phép truy cập LAN
    port: 5173,      // Có thể đổi nếu muốn
  },
  plugins: [react()],
});
