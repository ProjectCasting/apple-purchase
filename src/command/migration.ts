import * as yargs from 'yargs'
import fs from 'fs'
import path from 'path'
import clc from 'cli-color'
import {
  getDiffFiles,
  getSequelizeTime
} from './utils'

/**
 * Copy migration file.
 */
export class MigrationCommand implements yargs.CommandModule {

  command = 'migration'
  describe = 'Copy migration file for subscription.'

  builder(args: yargs.Argv) {
    return args
      .option('t', {
        alias: 'type',
        type: 'string',
        choices: ['typeorm', 'sequelize'],
        default: 'typeorm',
        describe: 'The type of database orm used.'
      })
      .option('d', {
        alias: 'dir',
        demandOption: true,
        describe: 'Directory where migration should be created.'
      })
      .option('o', {
        alias: 'outputJs',
        type: 'boolean',
        default: false,
        describe: 'Generate a migration file on Javascript instead of Typescript',
      })
  }

  async handler(args: yargs.Arguments) {
    try {
      let directory = args.dir as string | undefined
      let type = args.type as string

      const targetPath = path.resolve(process.cwd(), directory)
      const sourcePath = path.resolve(__dirname, `../../src/db/${type}/migration`)
      console.log(`Copy migration file to ${targetPath}`)

      const files = getDiffFiles(targetPath, sourcePath)
      const timestamp = new Date().getTime()
      for (let index = 0; index < files.length; index++) {
        const file = files[index]
        const time = file.slice(0, 13)
        const content = fs.readFileSync(`${sourcePath}/${file}`, 'utf-8')
        const newTime = getSequelizeTime(type, timestamp, index)
        const newFile = file.replace(time, `${newTime}`)
        console.log(clc.blueBright(newFile))
        const newContent = content.replace(time, `${newTime}`)
        fs.writeFileSync(`${targetPath}/${newFile}`, newContent, 'utf-8')
      }

      console.log(`Migration files has been generated successfully.`)

    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  }
}