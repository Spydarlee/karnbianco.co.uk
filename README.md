# karnbianco.co.uk

This is the source for my personal website, built with the static site generator, [Eleventy (11ty)](https://www.11ty.dev/). It was initially based on the [eleventy-base-blog starter project](https://github.com/11ty/eleventy-base-blog) which may be a better place to look if you're trying to get started with a blog-style website in 11ty.

# Requirements

- Node.js ([download and install](https://nodejs.org/en/download/package-manager))

# Setup

1. Create a directory and open it

```
mkdir karnbianco.co.uk-clone
cd karnbianco.co.uk-clone
```

2. Clone this Repository

```
git clone https://github.com/Spydarlee/karnbianco.co.uk
```

3. Install dependencies (defined in package.json)

```
npm install
```

4. Build the site and run it on a local development server

```
npx @11ty/eleventy --serve
```

# Features

- Responsive image galleries with [PhotoSwipe](https://photoswipe.com/) and [Masonry](https://masonry.desandro.com/)
- Dark Mode styling
- Atom XML and JSON RSS feeds

# License

All source code is avaiable under an MIT License, but this does not apply to content such as blog posts and images - most of which live under the 'Content' folder - that I retain rights to unless otherwise specified.
