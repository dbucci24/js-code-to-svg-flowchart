#!/usr/bin/env node
const js2flowchart = require('../dist/js2flowchart.js');
const program = require('commander');

const fs = require('fs'),
    path = require('path');

const distDir = './js2flowchart';


const readJsFile = function(file, onComplete) {
    fs.readFile(path.relative(process.cwd(), file), 'utf8', function (err, code) {
        if (err) {
            return console.error(err);
        }

        onComplete(file, code);
    });
};

const createSvgFile = function(file, code) {
    if (!fs.existsSync(distDir)){
        fs.mkdirSync(distDir);
    }

    const svg = js2flowchart.convertCodeToSvg(code),
        filePath = `${distDir}/${file}.svg`;

    fs.writeFile(filePath, svg, function(err) {
        if(err) {
            return console.error(err);
        }

        console.log(`SVG file was created: ${filePath}`);
    });
};

program
    .arguments('<file>')
    .action(function(file) {
        readJsFile(file, createSvgFile);
    })
    .parse(process.argv);

