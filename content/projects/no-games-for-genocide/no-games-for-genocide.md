---
title: No Games For Genocide
description: Campaign calling for an end to the game industry's complicity in genocide as part of the wider BDS movement.
summaryImage: no-games-for-genocide.png
tags:
  - websites
date: 2025-12-02
---
## About the Project

> [No Games for Genocide](https://nogamesforgenocide.com/) is a group of game workers, activists, union organisers, and journalists who care about the games industry, Palestine, and all people living under the violence of colonialism and imperialism. 
> 
> We want to expose and work to end the material and commercial ties between the games industry and the military industrial complex, with a particular focus on Israel’s ongoing genocide of Palestinians in the Gaza Strip.
## Development Process

The initial "minimum viable product" requirements for the [No Games for Genocide](https://nogamesforgenocide.com/) campaign website were a simple, static site with an embedded pledge form connected to an [Airtable](https://airtable.com/) backend. I collaborated with another designer-developer who created the full UI design in [Figma](https://www.figma.com/) while I developed an initial implementation using [Hugo](https://gohugo.io/).

With this baseline in place, my designer-developer colleague replaced the embedded form with a fully custom, styled and integrated [pledge form](https://nogamesforgenocide.com/take-action/pledge/) complete with robust frontend and backend (via [Netlify serverless functions](https://www.netlify.com/platform/core/functions/)) input validation.

A [scheduled function](https://docs.netlify.com/build/functions/scheduled-functions/) is configured to periodically update the static site with the latest (manually vetted) pledge data by querying the Airtable API and generating an automatic Git commit which, upon push, automatically triggers a new Hugo build.

**Tools, Services and Tech Used**

- **UI/UX Design** - Figma
- **Frontend** - HTML, CSS, JavaScript, Hugo, Go templates
- **Backend** - Netlify, Airtable, Git