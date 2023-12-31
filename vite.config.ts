import { sveltekit } from '@sveltejs/kit/vite'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    fs: {
      // Add the directories where your images are stored
      allow: [
        "/Users/ratchanon/Desktop/Billy191/RetroPGF-Hub",
        "/home/chaiyapatoam/project/RetroPGF-Hub",
        "/Users/jarukitjintanasathilakul/work/RetroPGF-Hub"
        // Add more directories if needed
      ],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
})
