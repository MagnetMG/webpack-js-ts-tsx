const path = require('path');

const SRC = 'src';
const DIST = 'dist';
const ASSETS = 'assets';
const IMAGES = `${ASSETS}/images`;
const FONTS = `${ASSETS}/fonts`;

function getEntries() {
    return {
        SRC: path.resolve(__dirname, SRC),
        DIST: path.resolve(__dirname, DIST),
        ASSETS: path.resolve(__dirname, path.join(SRC, ASSETS)),
        IMAGES: path.resolve(__dirname, path.join(SRC, IMAGES)),
        FONTS: path.resolve(__dirname, path.join(SRC, FONTS))
    };
}

module.exports = {
    SRC,
    DIST,
    ASSETS,
    IMAGES,
    FONTS,
    getEntries
};
