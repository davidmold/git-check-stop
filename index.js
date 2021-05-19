const chalk = require('chalk')
const gitStatus = require('git-status')
const branch = require('git-branch')

async function main() {
  let branchname = null
  if(process.argv) {
    if(process.argv.length > 2) {
      branchname = process.argv[2]
    }
  }
  try {
    let name = await branch()
    console.log(chalk.green('git branch:'), chalk.green.inverse(' ' + name + ' '), chalk.green('.'))
  }
  catch(err) {
    console.log(chalk.bgRed('git error'), err)
    resolve(1)
    return
  }
  if(branchname) {
    if(name !== branchname){
      console.log('')
      console.log(chalk.bgRed(' STOP '), chalk.yellow('You must be on git branch'), 
        chalk.yellow.inverse(' ' + branchname + ' '), chalk.yellow('to do this.'))
      return 3
    }
  }
  console.log('')
  return new Promise((resolve) => {
    gitStatus((err, data) => {
      if(err) {
        console.log(chalk.bgRed('git error'), err)
        resolve(1)
        return
      }
      if(data.length > 0) {
        console.log(chalk.bgRed(' STOP '), chalk.yellow('You have ' + data.length + ' uncommitted changes.'))
        resolve(2)
        return
      }
      console.log(chalk.bgGreen.black(' OK '), chalk.yellow('git all up to date.'))
      resolve(0)
      return
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
