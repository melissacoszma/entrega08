import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import type { UserConfig as VitestUserConfigInterface } from "vitest/config";

const vitestConfig: VitestUserConfigInterface = {
  test: {
    globals: true,
    restoreMocks: true,
  },
};

export default defineConfig({
  plugins: [checker({ typescript: true })],
  test: vitestConfig.test,
  
 
  root: "srcAPLICACION",
  
  build: {
    outDir: "../dist-aplicacion", 
    emptyOutDir: true,
  },
  
  server: {
    open: true,  
    port: 3001,  
  },
  
  preview: {
    port: 4174,  
  }
});