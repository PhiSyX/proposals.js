import type { FlowContent } from "#types/html";
import { HTMLElementExtension, makeHTMLElementExtension } from "../html_extension";

// -------------- //
// Implémentation //
// -------------- //

export class HTMLArticleElementExtension extends HTMLElementExtension<"article", FlowContent>
{
    constructor()
    {
        super("article");
    }
}

export class HTMLAsideElementExtension extends HTMLElementExtension<"aside", FlowContent>
{
    constructor()
    {
        super("aside");
    }
}

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

export const article = makeHTMLElementExtension(HTMLArticleElementExtension);
export const aside = makeHTMLElementExtension(HTMLAsideElementExtension);
export const section = makeHTMLElementExtension(HTMLSectionElementExtension);
export const nav = makeHTMLElementExtension(HTMLNavElementExtension);
