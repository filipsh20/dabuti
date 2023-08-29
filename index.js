const { spawn } = require("child_process")
const ts = require('typescript');
const fs = require("fs").promises;
const path = require("path");
const terser = require("terser");

async function convert() {
    const mainTsPath = path.join(process.cwd(), 'electron/main.ts');
    const mainJsPath = path.join(process.cwd(), 'build/main.js');

    const preloadTsPath = path.join(process.cwd(), 'electron/preload.ts');
    const preloadJsPath = path.join(process.cwd(), 'build/preload.js');

    const tsConfig = {
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.CommonJS,
        removeComments: true,
        noEmitHelpers: true,
        inlineSourceMap: false,
    };

    const mainTsCode = await fs.readFile(mainTsPath, 'utf-8');
    const preloadTsCode = await fs.readFile(preloadTsPath, 'utf8');

    const mainJsCode = ts.transpileModule(mainTsCode, { compilerOptions: tsConfig }).outputText;
    const preloadJsCode = ts.transpileModule(preloadTsCode, { compilerOptions: tsConfig }).outputText;

    const mainJsFormat = await terser.minify(mainJsCode, { mangle: { toplevel: true }, compress: { drop_console: true } });
    const preloadJsFormat = await terser.minify(preloadJsCode, { mangle: { toplevel: true }, compress: { drop_console: true } });

    await fs.mkdir(path.join(process.cwd(), "build"), { recursive: true });

    await fs.writeFile(mainJsPath, mainJsFormat.code);
    await fs.writeFile(preloadJsPath, preloadJsFormat.code);
}

function run() {
    const processElectron = spawn("electron", ["build/main.js"], { shell: true, stdio: "inherit" });
    processElectron.on("exit", () => process.exit());
}

function build() {
    spawn("electron-builder", [], { shell: true, stdio: "inherit" });
}

function electron() {
    return {
        name: 'electron',
        config: (config) => {
            config.base = './';
        },
        configResolved(config) {
            if (config.command === 'serve') {
                process.env.NODE_ENV = 'development';
            } else {
                process.env.NODE_ENV = 'production';
            }
        },
        buildStart() {
            convert()
            if (process.env.NODE_ENV === 'development') {
                run();
            } else {
                build();
            }
        },
    };
}

module.exports = electron;
