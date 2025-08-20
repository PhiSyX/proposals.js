import { it } from "node:test";

import { RegExpExtension as TC39RegExpExt } from "../exports/tc39/stage4.ts";

it("TC39 escape: base", ({ assert }) => {
    assert.equal(
        TC39RegExpExt.escape("^phisyx[away]$"),
        "\\^phisyx\\[away\\]\\$"
    );
});

it("TC39 escape: extension", ({ assert }) => {
    assert.equal(
        TC39RegExpExt.escape("^phisyx[away]$", ['^', '$']),
        "^phisyx\\[away\\]$"
    );
});
