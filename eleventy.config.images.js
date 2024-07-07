const path = require("path");
const sharp = require('sharp');
const Image = require("@11ty/eleventy-img");

const GALLERY_THUMBNAIL_WIDTH = 350;
const LANDSCAPE_LIGHTBOX_IMAGE_WIDTH = 1920;
const PORTRAIT_LIGHTBOX_IMAGE_WIDTH = 500;

function relativeToInputPath(inputPath, relativeFilePath) {
	let split = inputPath.split("/");
	split.pop();
	return path.resolve(split.join(path.sep), relativeFilePath);
}

function isFullUrl(url) {
	try {
		new URL(url);
		return true;
	} catch(e) {
		return false;
	}
}

async function getEleventyImage(src, widths, page, eleventyConfig) {
  src = isFullUrl(src) ? src : relativeToInputPath(page.inputPath, src);
  return await Image(src, {
    widths: widths || ["auto"],
    formats: ["avif", "webp", "auto"],
    outputDir: path.join(eleventyConfig.dir.output, "img"),
  });
}

module.exports = function(eleventyConfig) {

  // Individual 11ty image
	eleventyConfig.addAsyncShortcode("image", async function imageShortcode(src, alt, widths, sizes, page) {
    let sourcePage = page ? page : this.page
    let eleventyImage = await getEleventyImage(src, widths, sourcePage, eleventyConfig);
    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };
    return Image.generateHTML(eleventyImage, imageAttributes);
  });

  // Full URL for 11ty-processed images
  eleventyConfig.addAsyncShortcode('image_url', async function imageUrlShortcode(src, widths, page) {
    let eleventyImage = await getEleventyImage(src, widths, page, eleventyConfig);
    return eleventyImage.webp[0].url;
  });

  // Image Gallery Wrapper
  eleventyConfig.addPairedShortcode('gallery', function galleryShortcode(content, name) {
    return `
        <div>
            <div class="gallery" id="gallery-${name}">
                <div class="gallery-sizer"></div>
                ${content}
            </div>
            <script type="module">
                import PhotoSwipeLightbox from '/js/photoswipe-lightbox.esm.min.js';
                import PhotoSwipe from '/js/photoswipe.esm.min.js';
                const lightbox = new PhotoSwipeLightbox({
                    gallery: '#gallery-${name}',
                    children: 'a',
                    pswpModule: PhotoSwipe,
                    preload: [1, 1]
                }).init();
            </script>
        </div>
    `.replace(/(\r\n|\n|\r)/gm, "");
  });

  // Image Gallery Images
  eleventyConfig.addAsyncShortcode('galleryImage', async function galleryImageShortcode(src, alt) {
    src = isFullUrl(src) ? src : relativeToInputPath(this.page.inputPath, src);
    const metadata = await sharp(src).metadata();

    let lightboxImageWidth = LANDSCAPE_LIGHTBOX_IMAGE_WIDTH;
    if(metadata.height > metadata.width) {
        lightboxImageWidth = PORTRAIT_LIGHTBOX_IMAGE_WIDTH;
    }

    const options = {
        formats: ['jpeg'],
        widths: [GALLERY_THUMBNAIL_WIDTH, lightboxImageWidth], // Thumbnail and full size
        outputDir: path.join(eleventyConfig.dir.output, "img"),
    }

    const image = await Image(src, options);
    return `
        <a href="${image.jpeg[1].url}"
        class="gallery-item"
        data-pswp-width="${image.jpeg[1].width}"
        data-pswp-height="${image.jpeg[1].height}"
        target="_blank">
            <img src="${image.jpeg[0].url}" alt="${alt}" />
        </a>
    `.replace(/(\r\n|\n|\r)/gm, "");
  });
};
