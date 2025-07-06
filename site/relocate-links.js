const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

const codebaseDocs = child_process.execSync([
    'find', './teaclave/*/', '-maxdepth', '1', '-path', './teaclave/docs', '-prune', '-o', '-name', 'README.md'
].join(' ')).toString().split('\n').filter(Boolean);

codebaseDocs.forEach((doc) => {
    console.log(`Processing codebase doc: ${doc}`);
    const destName = doc.split('/').at(-2) + '.md';
    let content = fs.readFileSync(doc, 'utf-8');
    const links = content.match(/(\[.*?\]\(.*?\))/g) || [];
    links.forEach((link) => {
        if (link.includes('(../') && link.endsWith('/README.md)')) {
            console.log(`  Relocating link: ${link}`);
            content = content.replaceAll(link, `${link.split('(')[0]}(../codebase/${destName})`);
        }
        else if (link.includes('(../docs/') && link.endsWith('.md)')) {
            console.log(`  Relocating link: ${link}`);
            content = content.replaceAll(link, link.replace('(../docs/', '(../'));
        }
    });
    fs.writeFileSync(`./docs/codebase/${destName}`, content, 'utf-8');
});

const mainDocs = child_process.execSync([
    'find', './docs/', '-maxdepth', '1', '-name', '*.md'
].join(' ')).toString().split('\n').filter(Boolean);

mainDocs.forEach((doc) => {
    console.log(`Processing main doc: ${doc}`);
    let content = fs.readFileSync(doc, 'utf-8');
    const links = content.match(/(\[.*?\]\(.*?\))/g) || [];
    links.forEach((link) => {
        if (link.includes('(../') && link.endsWith('/README.md)')) {
            console.log(`  Relocating link: ${link}`);
            const destName = link.split('(')[1].split('/').at(-2) + '.md';
            content = content.replaceAll(link, `${link.split('(')[0]}(./codebase/${destName})`);
        }
    });
    fs.writeFileSync(doc, content, 'utf-8');
});