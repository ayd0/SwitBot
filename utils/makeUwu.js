const makeUwu = (slurs) => require("./uwuImportConversion.js").then(([{ default: Index }]) => {
    const uwuifier = new Index({
        spaces: {
            faces: 0.005,
            actions: 0.05,
            stutters: 0.2,
        },
        words: 1,
        exclamations: 1,
    });

    return uwuifier.uwuifySentence(slurs);
});

module.exports = makeUwu;