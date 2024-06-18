import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 1000, // Increase chunk size limit to 1000 kB
    rollupOptions: {
      output: {

        manualChunks: {
          'vendor': ['react', 'react-dom'], // Example of manual chunking
        },
      },
    },
  },
})