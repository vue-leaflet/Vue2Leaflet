#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR

echo "Building umd version"
export NODE_ENV=development
../node_modules/.bin/webpack --hide-modules --colors --progress --config webpack.js --env development --display-error-details

echo "Building umd minified version"
export NODE_ENV=production
../node_modules/.bin/webpack --hide-modules --colors --progress --config webpack.js --env production --display-error-details
