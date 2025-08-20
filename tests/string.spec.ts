import { it } from "node:test";

import { StringExtension as TC39StringExt } from "../exports/tc39/stage4.ts";

import { StringExtension } from "../exports/phisyx/string.ts";

it("TC39 trim{Start,End}: base", ({ assert }) => {
    assert.equal(TC39StringExt.trimStart("  hello"), "hello");
    assert.equal(TC39StringExt.trimEnd("hello  "), "hello");
});

it("TC39 trim{Start,End}: extension", ({ assert }) => {
    assert.equal(TC39StringExt.trimStart("/hello", "/"), "hello");
    assert.equal(TC39StringExt.trimStart("///hello", "/"), "hello");
    assert.equal(TC39StringExt.trimStart("/ hello", "/"), " hello");

    assert.equal(TC39StringExt.trimEnd("hello/", "/"), "hello");
    assert.equal(TC39StringExt.trimEnd("hello///", "/"), "hello");
    assert.equal(TC39StringExt.trimEnd("hello /", "/"), "hello ");
});

it("PhiSyX StringExtension: trim{Start,End}", ({ assert }) => {
    // '/a/b//' -> '/a/b'
    assert.equal(new StringExtension("/a").push("/b/").push('/').trimEnd("/"), "/a/b");
    // '/a/b/' -> 'a/b/'
    assert.equal(new StringExtension("/a").push("/b/").trimStart("/"), "a/b/");
});
