'use strict';

const { execSync } = require('child_process');
const fs = require('fs');

fs.mkdirSync('dist', { recursive: true });

// --- clay.css: 元の clay.css + CSS カスタムプロパティ上書き ---
console.log('Building dist/clay.css...');
execSync('npx sass src/css/clay.scss dist/_tmp_clay.css --no-source-map', { stdio: 'inherit' });
const clayBase    = fs.readFileSync('src/css/clay.css',    'utf8');
const clayCustom  = fs.readFileSync('dist/_tmp_clay.css',  'utf8');
fs.writeFileSync('dist/clay.css',
  clayBase + '\n/* === Theme CSS Variable Overrides === */\n' + clayCustom
);
fs.unlinkSync('dist/_tmp_clay.css');

// --- main.css: 元の main.css + カスタムスタイル ---
console.log('Building dist/main.css...');
execSync('npx sass src/css/main.scss dist/_tmp_main.css --no-source-map', { stdio: 'inherit' });
const mainBase   = fs.readFileSync('src/css/main.css',   'utf8');
const mainCustom = fs.readFileSync('dist/_tmp_main.css', 'utf8');
fs.writeFileSync('dist/main.css',
  mainBase + '\n/* === Theme Custom Styles === */\n' + mainCustom
);
fs.unlinkSync('dist/_tmp_main.css');

console.log('Done: dist/clay.css, dist/main.css');
