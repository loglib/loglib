const { TextEncoder, TextDecoder } = require('fast-text-encoding');
require('@testing-library/jest-dom');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
