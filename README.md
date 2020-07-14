# [Sprint_11_project](https://alexandergurnet.github.io/Sprint_11_project)

version **1.2.0**

# Website with picture gallery functionality which is implemented by means of JavaScript, HTML and CSS.

## Instalation

### Clone 

* Clone this repo to your local machine using `git clone https://github.com/AlexanderGurnet/Sprint_11_project.git` command.

### Setup 

> first up to work with npm you should install node.js on your computer
> if you dont have it then install it from the official website below 

#### [Download node.js](https://nodejs.org/en/download/)

> install npm in your directory

`npm init`

> then install webpack dependencies in your project directory

`npm i webpack --save-dev`
`npm i webpack-cli --save-dev`
`npm i webpack-dev-server --save-dev`

> next install babel dependencies

`npm i babel-loader --save-dev`
`npm i @babel/cli --save-dev`
`npm i @babel/core --save-dev`
`npm i @babel/preset-env --save-dev`
`npm i babel-polyfill --save`
`npm i core-js@3.4.1 --save`

> install dependencies to process css

`npm i mini-css-extract-plugin --save-dev`
`npm i css-loader --save-dev`

> after that we set up html processing by downloading followed dependency

`npm i html-webpack-plugin --save-dev`

> installing dependency for hot reloading purpose

`npm i webpack-md5-hash --save-dev`

> setting up last css processing dependencies

`npm i postcss-loader --save-dev`
`npm i autoprefixer --save-dev`
`npm i cssnano --save-dev`

> for the final part of our settings we download gh-pages dependency

`npm install gh-pages --save-dev`

### Bundles

> for development bundle run followed command 

`npm run dev`

> to build a production bundle run followed command 

`npm run build`

> to deploy your bundle on gh-pages run followed command 

`npm run deploy`

