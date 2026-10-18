const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const htmlPath = path.join(root, 'index.html');
const cssPath = path.join(root, 'css', 'landing.css');
const startMarker = '<!-- BEGIN GENERATED TAILWIND CSS -->';
const endMarker = '<!-- END GENERATED TAILWIND CSS -->';

const html = fs.readFileSync(htmlPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8').trim();
const start = html.indexOf(startMarker);
const end = html.indexOf(endMarker, start + startMarker.length);

if (start === -1 || end === -1) {
  throw new Error('Could not find the generated Tailwind CSS markers in index.html.');
}

const replacement = `${startMarker}\n    <style id="tailwind-utilities">${css}</style>\n    ${endMarker}`;
const updatedHtml = `${html.slice(0, start)}${replacement}${html.slice(end + endMarker.length)}`;

fs.writeFileSync(htmlPath, updatedHtml);
