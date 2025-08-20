import { it } from "node:test";

import { StringExtension as TC39StringExt } from "../exports/tc39/stage4.ts";

import { StringExtension } from "../exports/phisyx/string.ts";

it("TC39 trimEnd: base", ({ assert }) => {
    assert.equal(TC39StringExt.trimEnd("hello  "), "hello");
});

it("TC39 trimEnd: extension", ({ assert }) => {
    assert.equal(TC39StringExt.trimEnd("hello/", "/"), "hello");
    assert.equal(TC39StringExt.trimEnd("hello///", "/"), "hello");

    assert.equal(TC39StringExt.trimEnd("hello /", "/"), "hello ");
});

it("PhiSyX StringExtension: trimEnd", ({ assert }) => {
    assert.equal(new StringExtension("/a").push("/b/").trimEnd("/"), "/a/b");
});
