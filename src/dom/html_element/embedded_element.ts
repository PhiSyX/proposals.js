import type { ToString } from "#types/lang";
import { HTMLElementExtension, makeHTMLElementExtension, makeHTMLVoidElementExtension } from "#root/dom/html_extension";

// -------------- //
// Implémentation //
// -------------- //

export class HTMLAudioElementExtension extends HTMLElementExtension<"audio">
{
    constructor(src: ToString)
    {
        super("audio");

        this.attr("src", src);
    }

    autoplay(): this 
    {
        return this.attr("autoplay", "true");
    }

    controls(list: Array<"nodownload" | "nofullscreen" | "noremoteplayback"> = []): this 
    {
        if (list.length > 0) {
            this.attr("controlslist", list.join(" "));
        }
        return this.attr("controls", "");
    }

    crossorigin(co: "anonymous" | "use-credentials"): this
    {
        return this.attr("crossorigin", co);
    }

    loop()
    {
        return this.attr("loop", "");
    }

    muted()
    {
        return this.attr("muted", "");
    }

    preload(p: "none" | "metadata" | "auto" | "" = "")
    {
        return this.attr("preload", p);
    }
}

// ------ //
// Export //
// ------ //

export const audio = makeHTMLElementExtension(HTMLAudioElementExtension);
