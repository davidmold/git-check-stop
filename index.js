const chalk = require('chalk')
const gitStatus = require('git-status')
const branch = require('git-branch')

async function main() {
  let name = await branch()
  console.log(chalk.green('git branch:'), chalk.green.inverse(' ' + name + ' '), chalk.green('.'))
  if(process.env.GIT_BRANCH) {
    if(name !== process.env.GIT_BRANCH){
      console.log('')
      console.log(chalk.bgRed(' STOP '), chalk.yellow('You must be on git branch'), 
        chalk.yellow.inverse(' ' + process.env.GIT_BRANCH + ' '), chalk.yellow(' to do this.'))
      return 3
    }
  }
  console.log('')
  return new Promise((resolve) => {
    gitStatus((err, data) => {
      if(err) {
        console.log(chalk.bgRed('git error'), err)
        resolve(1)
      }
      if(data.length > 0) {
        console.log(chalk.bgRed(' WARNING '), chalk.yellow('You have ' + data.length + ' uncommitted changes. Please commit them before deploying'))
        resolve(2)
      }
      console.log(chalk.bgGreen.black(' OK '), chalk.yellow('git all up to date'))
      resolve(0)
    })
  })
}

module.exports = function()
{
  main().then((code) => {
    if(code) {
      process.exit(code)
    }
  })
}
