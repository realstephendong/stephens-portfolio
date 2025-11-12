import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.glb'],
  optimizeDeps: {
    include: ['@react-three/rapier', '@react-three/fiber', '@react-three/drei']
  },
  build: {
    rollupOptions: {
      external: (id) => {
        // Externalize problematic modules that might cause issues
        return false;
      }
    }
  }
})
