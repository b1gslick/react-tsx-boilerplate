import { Configuration } from "webpack";
import { BuildOptions } from "./types/types";

export function buildResolver(options: BuildOptions): Configuration["resolve"] {
  return {
    modules: ['node_modules'],
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.css', '.scss'],
    alias: {
      '@': options.paths.src
    }
  }
}
