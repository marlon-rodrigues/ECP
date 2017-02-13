## About This Generator
This will get you up and running with ECP - Event Customer Portal - framework and pre-configured Gulp tasks.

###Language Support:
* JavaScript(ES5)
* TypeScript


##Development

### Run the Application

```shell
gulp watch

```
Browse to [http://localhost:9000](http://localhost:9000) to see the app. You can make changes in the code found under `app` and the browser should auto-refresh itself as you save files.
> This uses [BrowserSync](http://www.browsersync.io/) for automated page refreshes on code/markup changes concurrently across multiple browsers. If you prefer to disable the mirroring feature set the [ghostMode option](http://www.browsersync.io/docs/options/#option-ghostMode) to false

### Build the Application

```shell
gulp build

```

Gulp will generate a a folder called "dist" with all the necessary files to run the application in production mode.

### Installing New Modules/Components

```shell
bower install <package name> --save

```

Use bower to install new packages/modules as necessary. Bower components will be built into "dist/libs" folder. Gulp will look through each package's bower.json and compile the files listed under "main". If a file is needed and its not listed under the package bower.json "main" section, you will need to override the application bower.json to include that file. Check it out the application bower.json file for reference.


### Sub Generators

####ViewModel

You can create a viewmodel with the following subgenerator.
You can choose between TypeScript or JavaScript. 

```shell
yo durandal2:viewmodel {name} {transpiler} (--transient)
```
> **Note:** Passing --transient will create a viewmodel with a transient lifecycle

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)