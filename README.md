# Front-end Skeleton

## Introduction
The intention of this skeleton is to give a base platform for you to build your project on top of.

All build tools are supplied through Node. The skeletons primary focus for tooling is via Gulp, however, support for Grunt is included where applicable.

It is a collection of build tools, configuration files, folder structures and more. Below are some of the features provided:

- Compile and prefix style sheets from SASS.
- Bundle and uglify JavaScript source files into payloads.
- Compile template files into JavaScript.
- Lint source files to ensure standards and conformance.
- Perform testing via a test runner and test suite.
- Watch source files and trigger compilation as required.
- Optimize image assets of various formats.
- Convenience methods for building front-end style sheets and scripts.

## Installation
Because this skeleton has support for multiple task runners you'll probably want to remove some packages from `package.json` before installing. The `devDependencies` key has been split into multiple groups. The first group is general dependencies and test suite dependencies, none of which should be deleted. The latter groups are for a specific task runner each and should be easily identifiable. If you don't intend to use a particular task runner, then be sure to delete its group of dependencies before going any further.

Style sheet compilation involves using the `sass` Ruby gem. This needs to be installed prior to running the setup method ahead. Assuming you have Ruby on your system, the gem can be installed with the following command:

```
gem install sass;
```

Once you have done this, you're ready to start the overall tooling installation via the `Makefile` method below:

```
make fe-setup;
```

This will ensure the tooling dependencies are installed and that the build files are compiled and ready for usage within the browser.

## Settings and Configuration
There are a multitude of settings files included in the root of the repository.

`.editorconfig` is a configuration file for [EditorConfig](http://editorconfig.org/); a plugin / package that can be installed in most popular editors. It enforces all team members to use the same formatting settings such as spaces over tabs, line endings and so on.

`.gitignore` offers a collection of common files and folders that should be removed from source control, as well as some custom files generated by the tooling of this skeleton.

`.jshintignore` and `.jshintrc` are used in conjunction with the linting tool and can be used to customise the standards and rules which the JavaScript source code must adhere to.

`karma.conf.js` houses configuration for [Karma](http://karma-runner.github.io/). It can also contain settings for Mocha, Chai and Sinon.

`run/_global.js` is a global file for the build tool methods so settings can be shared across the multitude of methods. One such setting indicates if the project is using RequireJS or Browserify for its module format. Another specifies the path where assets should be copied when building CSS / JS or moving imagery or fonts.

## Folder Structure
Both style sheets and scripts follow the same structure. Library files are placed in `libs`. These library files do not have to be minifed and in best practice probably shouldn't be. This is because during development, errors within them are easier to debug, and also that the build process will be minifying them anyway.

All source files are placed within `src` and are split into modular files to aid in decoupling and organisation. Build files that are the end result of compilation are placed wherever the `destPath` of global settings points to, then nested inside `css` or `js` folders respectively.

JavaScript test files are places within `js/tests` and should have the suffix `.spec.js` so they're picked up by the test runner.

Images are placed within an `img` folder and should be maintained by grouping related imagery (features, sections etc..) into sub-folders. They are copied over to `destPath` during the `build` task.

Fonts reside within `fonts` and should be grouped into individual folders per font (which house all of that fonts different file formats). They are copied over to `destPath` during the `build` task.

Build tool methods are stored within `run` to encapsulate them away from project source files. They are split into folders per method, with each folder containing different build tool files along with an additional file (`_common.js`) which is used to share settings and keep things DRY.

## Test Suite
As previously stated, test specifications should be placed into `js/tests/` with a suffix of `.spec.js`. This ensures they will be automatically picked up by Karma whenever it is run. The test specs themselves are piped through Browserify or RequireJS (depending on your global setting in `run/_global.js`), so be sure to write the spec file syntactically as you would any other JavaScript module in your project.

The testing stack is Mocha, Chai and Sinon, with Karma as the test runner. This gives you a full toolset of test frameworks, assertion libraries, spies and more. Each component of the testing stack is already loaded into the scope of the test spec so you can just their global/top-level functions automagically.

An example test spec is shown below, which loads in a contrived model and runs some tests.
```
// Loading dependencies.
var FeatureModel = require('../src/models/FeatureModel');

describe('The Feature model', function() {

    beforeEach(function() {
        this.testModel = new FeatureModel();
    });

    afterEach(function() {
        this.testModel = null;
    });

    it('should have defaults', function(done) {
        expect(this.testModel.to.have.ownProperty('defaults');
    });

});
```

## Task Breakdown
Each of the tasks have documentation at the top of their source files and list any potential command-line arguments they can take. Below is a short description of each available task.

### `build`
Convenience method that will ensure style sheets and JavaScript are compiled. After this, all assets (style sheets, images, fonts and scripts) are copied over to the `destPath`.

### `default`
A watch method that will look for changes to source files, then re-trigger compilation. Can be called by just calling the task runner, i.e. `gulp`.

### `images`
Takes site image assets and optimizes them.

### `lint`
Examines JavaScript source files for errors and code that doesn't conform to the specified standards or style.

### `scripts`
Compiles source files into minified, uglified payloads.

### `styles`
Compiles SASS into CSS and autoprefixes where applicable.

### `templates`
(RequireJS only). Converts Handlebars templates into pre-compiled JavaScript templates.

### `test`
Runs the test runner and any tests within the front-end tests folder. Also outputs JUnit XML for Jenkins.
