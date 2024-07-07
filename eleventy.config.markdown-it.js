const path = require("path");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItEleventyImg = require("markdown-it-eleventy-img");
const markdownItImplicitFigures = require('markdown-it-image-figures');
const markdownItFootnotes = require('markdown-it-footnote');

// Customize Markdown library plugins
module.exports = function(eleventyConfig) {
  eleventyConfig.amendLibrary("md", mdLib => {

    mdLib.use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.ariaHidden({
        placement: "after",
        class: "header-anchor",
        symbol: "#",
        ariaHidden: false,
      }),
      level: [1,2,3,4],
      slugify: eleventyConfig.getFilter("slugify")
    });

    // Process Markdown images through eleventy-img plugin
    mdLib.use(markdownItEleventyImg, {
      resolvePath: (filepath, env) => path.join(path.dirname(env.page.inputPath), filepath),
      imgOptions: {
        widths: [720],
        urlPath: "/img/",
        outputDir: path.join("_site", "img"),
        formats: ["avif", "webp", "jpeg"]
      },
      globalAttributes: {
        class: "markdown-image",
        decoding: "async",
        sizes: "100vw"
      }
    });

    // Display images as figures with captions
    mdLib.use(markdownItImplicitFigures, {
      figcaption: true
    });

    // Support footnotes with [^1] syntax
    mdLib.use(markdownItFootnotes);
    mdLib.renderer.rules.footnote_block_open = () => (
      '<hr>' +
      '<h2 class="mt-3">Footnotes & References</h2>\n' +
      '<section class="footnotes">\n' +
      '<ol class="footnotes-list">\n'
    );
  });
}
