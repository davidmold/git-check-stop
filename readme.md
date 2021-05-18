# git-check-stop

Ensure that you all your files are committed and/or you are on the correct branch before deploying

## Install

Install as dev dependency with npm

```
npm install -D git-check-stop
```

## Usage

### To check that you have no uncommitted files before deploying

In your git directory, create a script called gitcheck.js:
```
const gcs = require('git-check-stop')
gcs()
```

In package.json, if you have a script deploy, set it up like this:
```
"scripts": {
  "predeploy": "node gitcheck"
  "deploy":"run-my-build"
}
```
Now, if you
```
npm run deploy
```
Your build will not deploy unless all your files are committed

### To check that you are on the correct brand AND have no uncommitted files

Same as above, but in package.json
```
"scripts": {
  "predeploy": "node gitcheck master"
  "deploy":"run-my-build"
}
```
In this case, git-check-stop will stop the build if the name of your current
branch is not master. Of course, you can set this to be any other name.