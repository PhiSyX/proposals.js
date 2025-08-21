import { it } from "node:test";

import { StringExtension as TC39StringExt } from "../exports/tc39/stage4.ts";

import { StringExtension } from "../exports/lang/string.ts";
import { None, Some } from "#root/safety/option";

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

it("Lang StringExtension: trim{Start,End}", ({ assert }) => {
    // '/a/b//' -> '/a/b'
    assert.equal(
        new StringExtension("/a").push("/b/").push('/').trimEnd("/"),
        "/a/b"
    );
    // '/a/b/' -> 'a/b/'
    assert.equal(
        new StringExtension("/a").push("/b/").trimStart("/"),
        "a/b/"
    );

    assert.equal(
        new StringExtension(" /hello/ ").trimStart([' ', '/']),
        "hello/ "
    );
    assert.equal(
        new StringExtension(" /hello/ ").trimEnd([' ', '/']),
        " /hello"
    );
});

it("Lang StringExtension: matchGroups", ({ assert }) => {
    const str = new StringExtension("{userId}/{userName}");

    assert.deepEqual(
        str.matchGroups(/^\{(?<id>\w+)\}\/\{(?<name>\w+)\}$/i),
        Some({ id: "userId", name: "userName" })
    );

    // Le pattern correspond à la string, mais pas de groupes ;-)
    assert.deepEqual(
        str.matchGroups(/\{(\w+)\}\/\{(\w+)\}/i),
        None()
    );
});