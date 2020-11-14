<h1 align="center">BRiX - A Better Boiler Plate</h1>


## Purpose



## Getting started

The HubSpot CMS Boilerplate is designed to work with both [local development](https://designers.hubspot.com/docs/tools/local-development) and the HubSpot Design Tools. Before getting started, you will need to have [Node.js](https://nodejs.org) installed and we strongly suggest that you set up a [HubSpot CMS Developer Sandbox](https://offers.hubspot.com/free-cms-developer-sandbox).

### To download the HubSpot CMS Boilerplate using the HubSpot CMS CLI:

1. Navigate to the directory that you want to use for your project
2. Run `hs create website-theme <directory>` to create a project from the HubSpot CMS Boilerplate
3. Create a `hubspot.config.yml` file and [configure](https://designers.hubspot.com/tutorials/getting-started-with-local-development#2-set-up-your-configuration-file) the CLI so that you can upload files to the HubSpot portals that you want to use
4. Run `hs upload --portal=<portal> <src> <dest>` to upload all of the files in the boilerplate.
5. Run `hs watch --portal=<portal> src <directory>` to [watch for changes](https://designers.hubspot.com/docs/tools/local-development-reference#watch) to files in the `src` directory, and upload any that have saved changes.

Please reference our _[Quick start guide to developing on the HubSpot CMS](https://designers.hubspot.com/tutorials/getting-started#1-install-the-hubspot-cms-cli)_ and our _[Getting started with local development](https://designers.hubspot.com/tutorials/getting-started-with-local-development)_ articles for more information.

### To use version control in your project using GitHub and GitHub Actions:

1. [Fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) the HubSpot CMS Boilerplate repository and [clone](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) your forked repository to your computer
2. [Set up GitHub secrets in your forked repository to encrypt sensitive information from showing publically](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets) for `HUBSPOT_PORTAL_ID` and `HUBSPOT_PERSONAL_ACCESS_KEY`
3. Update the name of the directory that you'll be deploying to in your Design Manager in the `.github/workflows/deploy.yml` file (the current default `dest_dir` is `figmaplugin`)
4. Deploy changes to your Design Manager by pushing to the `master` branch of your forked repository

Please reference our [_HubSpot CMS deploy GitHub action page_](https://github.com/marketplace/actions/hubspot-cms-deploy) and _[Setting up continuous integration with a GitHub repository using GitHub Actions article](https://designers.hubspot.com/tutorials/github-integration)_ for more information.

## Style guide

For details about the HubSpot CMS Boilerplate's recommended best practices and code formatting, please reference our [style guide](https://github.com/HubSpot/figmaplugin/blob/master/STYLEGUIDE.md).

## Contributing

If you’re interested in contributing to the HubSpot CMS Boilerplate, please read [CONTRIBUTING.md](https://github.com/HubSpot/figmaplugin/blob/master/CONTRIBUTING.md) and [STYLEGUIDE.md](https://github.com/HubSpot/figmaplugin/blob/master/STYLEGUIDE.md) to see how you can report an issue, make a feature request, or make a pull request.

## Versioning

Previous releases and their documentation are available for [download](https://github.com/HubSpot/figmaplugin/releases). For transparency into future releases, we’ll be creating a project board that documents our planning for each [upcoming version](https://github.com/HubSpot/figmaplugin/projects).

## Community

You can stay up to date with HubSpot CMS Boilerplate updates and discussions in the #hs-cms-boilerplate channel in the [HubSpot Developer Slack](https://designers.hubspot.com/slack).

## License

The code is available under the [Apache License, Version 2.0](https://github.com/HubSpot/figmaplugin/blob/master/LICENSE)
