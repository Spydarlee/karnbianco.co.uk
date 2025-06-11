const { DateTime } = require("luxon");
const { parse } = require("csv-parse/sync");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginIcons = require('eleventy-plugin-icons');
const pluginReadingTime = require('eleventy-plugin-reading-time');
const pluginTOC = require('eleventy-plugin-toc')
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

const pluginImages = require("./eleventy.config.images.js");
const pluginMarkdownIt = require("./eleventy.config.markdown-it.js");

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
module.exports = function(eleventyConfig) {

	eleventyConfig.addPassthroughCopy({
		"./public/": "/",
		"./node_modules/prismjs/themes/prism-okaidia.css": "/css/prism-okaidia.css",
		"./node_modules/photoswipe/dist/photoswipe-lightbox.esm.min.js": "/js/photoswipe-lightbox.esm.min.js",
		"./node_modules/photoswipe/dist/photoswipe.esm.min.js": "/js/photoswipe.esm.min.js",
    "./node_modules/d3/dist/d3.min.js": "/js/d3.min.js",
    "./node_modules/chart.js/dist/chart.umd.js": "/js/chart.umd.js",
    "./node_modules/leaflet.fullscreen/icon-fullscreen.svg": "/css/icon-fullscreen.svg"
	});
  eleventyConfig.addPassthroughCopy("content/**/*.gpx");

	// Watch content images for the image pipeline.
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg,jpg}");

	// App plugins
	eleventyConfig.addPlugin(pluginImages);
  eleventyConfig.addPlugin(pluginMarkdownIt);
  eleventyConfig.addPlugin(pluginIcons, {
    sources: [{ name: 'feather', path: 'node_modules/feather-icons/dist/icons' }],
  });
  eleventyConfig.addPlugin(pluginReadingTime, );
  eleventyConfig.addPlugin(pluginTOC);

	// Official plugins
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 }
	});
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(pluginBundle);

	// Filters and custom collections
	eleventyConfig.addCollection("everything", function (collectionApi) {
		return collectionApi.getFilteredByGlob(["content/writing/**/*.md", "content/projects/**/*.md", "content/photos/**/*.md"]);
	});

	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});

	eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return all the tags used in a collection
	eleventyConfig.addFilter("getAllTags", collection => {
		let tagSet = new Set();
		for(let item of collection) {
			(item.data.tags || []).forEach(tag => tagSet.add(tag));
		}
		return Array.from(tagSet);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "nav", "post", "posts", "photos", "projects"].indexOf(tag) === -1);
	});

	eleventyConfig.addShortcode("currentYear", () => {
		return new Date().getFullYear();
	})

	// Features to make your build faster (when you need them)

	// If your passthrough copy gets heavy and cumbersome, add this line
	// to emulate the file copy on the dev server. Learn more:
	// https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

	// eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

  eleventyConfig.addDataExtension("csv", (contents) => {
    const records = parse(contents, {
      columns: true,
      skip_empty_lines: true,
      relax_column_count: true,
      delimiter: ";",
      trim: true,
    });
    return records;
  });

	return {
		// Control which files Eleventy will process
		// e.g.: *.md, *.njk, *.html, *.liquid
		templateFormats: [
			"md",
			"njk",
			"html",
			"liquid",
		],

		// Pre-process *.md files with: (default: `liquid`)
		markdownTemplateEngine: "njk",

		// Pre-process *.html files with: (default: `liquid`)
		htmlTemplateEngine: "njk",

		// These are all optional:
		dir: {
			input: "content",          // default: "."
			includes: "../_includes",  // default: "_includes"
			data: "../_data",          // default: "_data"
			output: "_site"
		},

		pathPrefix: "/",
	};
};
