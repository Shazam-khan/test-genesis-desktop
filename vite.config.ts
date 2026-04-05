import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';

export default defineConfig({
  plugins: [
    react(),
    electron([
      {
        entry: 'electron/main.ts',
        onstart(args) {
          // VS Code sets ELECTRON_RUN_AS_NODE=1 which breaks Electron startup
          delete process.env.ELECTRON_RUN_AS_NODE;
          args.startup();
        },
        vite: {
          build: {
            outDir: 'dist-electron',
          },
        },
      },

    ]),
    renderer(),
  ],
  clearScreen: false,
});
