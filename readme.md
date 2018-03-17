# Phaser 3 Boilerplate (incl. typescript, webpack, gulp, sass)

A boilerplate project for HTML5 games using the Phaser 3 game engine and typescript. Includes example game that demonstrates how to build a loading screen, game loop with UI, and game over screen.

The template includes phaser3, the typescript definitions, and a tsconfig that will generate a bundled javascript file for the game.

## Includes
 - Phaser3 - https://github.com/photonstorm/phaser
 - Typescript definitions - https://github.com/troyedwardsjr/phaser3-tsd/
    - Modified with a number of fixes.
 - SASS for styling - https://sass-lang.com/
 - Gulp for task automation - https://gulpjs.com/
 - Webfont loader - https://github.com/typekit/webfontloader
 - Example space shooter game project (think space invaders) with assets by ansimuz.
   - https://ansimuz.itch.io/spaceship-shooter-environment

## Instructions

### Requirements

 - NodeJS 6+
 - NPM (recommend v5+)

### Installation

```
mkdir yourprojectname
git clone ... yourprojectname
npm install
```

### Building
```
gulp build
```

*Note: Files will be output to the `/dist` directory.*

### Development

This will watch all the files for changes and re-build automatically.
```
gulp watch
```

*Browse to http://localhost:8080 to view the latest version while the watch is running.*