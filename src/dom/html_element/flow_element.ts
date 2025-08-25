import { HTMLElementExtension, makeHTMLElementExtension } from "../html_extension";

export class HTMLDivElementExtension extends HTMLElementExtension<"div">
{
    constructor()
    {
        super("div");
    }
}

export class HTMLSectionElementExtension extends HTMLElementExtension<"section">
{
    constructor()
    {
        super("section");
    }
}

export const div = makeHTMLElementExtension(HTMLDivElementExtension);
export const section = makeHTMLElementExtension(HTMLSectionElementExtension);