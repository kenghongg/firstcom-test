# Keng Hong - Gulp workflow #

**Features**
- Concatenate, minify, and lint JavaScript.
- Compile, minify, and lint Scss.
- Optimize images.
- Copy static files and folders into your `prod` directory.
- Watch for file changes, and automatically recompile build and reload webpages in `temp` directory.

## Getting Started
1. In bash/terminal/command line, `cd` into your project directory.
2. Run `npm install` to install required files and dependencies.
3. When it's done installing, run one of the task runners to get going:
	- `gulp` manually compiles files.
	- `gulp serve` automatically compiles files and applies changes using [BrowserSync](https://browsersync.io/) when you make changes to your source files.

## Documentation
Add your source files to the appropriate `temp` subdirectories. Gulp will process and and compile them into `prod`.

- JavaScript files in the `temp/assets/js` directory will be compiled to `prod/asset/js`. Files in subdirectories under the `js` folder will be concatenated. For example, multiple files in `assets/js/` will bundle into `bd-1.0.1.min.js`. Do search for `js_bundle` and `// Compile common JS into a bundle.` in the `gulpfile.js`.
- Files in the `temp/assets/scss` directory will be compiled to `prod/assets/css`.
- Images placed in the `temp/assets/images` directory will be optimized to `prod/assets/images`.
- Open source library files that placed in `temp/assets/js/vendors/`,`temp/assets/css/vendors/` will be copied as-is into `prod/assets/js/vendors/`,`prod/assets/css/vendors/`

### package.json
The `package.json` file holds all of the details about your project.

## Notes
$ node --version
$ npm --version

$ npm install

$ npm install --global gulp-cli

## Watch and BrowserSync
$ gulp serve

## Compile codes w/o images
$ gulp code 

## Compile codes w images
$ gulp full 

<!-- ## License -->
<!-- The code is available under the [MIT License](LICENSE.md). -->

# firstcom-test