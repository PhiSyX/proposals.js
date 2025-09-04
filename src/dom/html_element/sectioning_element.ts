import type { FlowContent } from "#types/html";
import { HTMLElementExtension, makeHTMLElementExtension } from "../html_extension";

// -------------- //
// Implémentation //
// -------------- //

export class HTMLSectionElementExtension extends HTMLElementExtension<"section", FlowContent>
{
    constructor()
    {
        super("section");
    }
}


export class HTMLNavElementExtension extends HTMLElementExtension<"nav", FlowContent>
{
    constructor()
    {
        super("nav");
    }
}

// ------ //
// Export //
// ------ //

export const section = makeHTMLElementExtension(HTMLSectionElementExtension);
export const nav = makeHTMLElementExtension(HTMLNavElementExtension);
