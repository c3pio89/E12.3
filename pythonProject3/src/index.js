import './style.css';
import * as math from "./math";

const multiply = (a) => a*8;

document.writeln('ES6 modules!');
document.writeln('sum = ' + math.sum( 2, 3));
document.writeln('multiply from index.js = ' + multiply(5));
document.writeln('multiply from math = ' + math.multiply(5));