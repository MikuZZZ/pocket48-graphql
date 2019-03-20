import * as tsConfigPaths from 'tsconfig-paths';
import * as Tsconfig from 'tsconfig';
import * as sourceMapSupport from 'source-map-support';

const loadResult = Tsconfig.loadSync(process.cwd(), undefined);

const baseUrl = loadResult.config.compilerOptions.outDir; // Either absolute or relative path. If relative it's resolved to current working directory.
tsConfigPaths.register({
  baseUrl,
  paths: loadResult.config.compilerOptions.paths,
});

sourceMapSupport.install();

import '@Src/app';
