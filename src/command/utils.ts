import fs from 'fs'

const format = (i: number) => {
  return i < 10 ? '0' + i : i
}

export const getSequelizeTime = (type: string, timestamp: number, index: number) => {
  if (type === 'sequelize') {
    const date = new Date(timestamp + index * 1000);
    return [
      date.getUTCFullYear(),
      format(date.getUTCMonth() + 1),
      format(date.getUTCDate()),
      format(date.getUTCHours()),
      format(date.getUTCMinutes()),
      format(date.getUTCSeconds())
    ].join('')
  } else {
    return timestamp + index;
  }
}

export const getDiffFiles = (targetPath: string, sourcePath: string) => {
  const targetFiles = fs.readdirSync(targetPath)
  const sourceFiles = fs.readdirSync(sourcePath)
  const sources = sourceFiles.map(file => file.replace(/\d+/, ''))
  const targets = targetFiles.map(file => file.replace(/\d+/, ''))

  const allFiles = sources.concat(targets)
  const diff = allFiles.filter(file => !(targets.includes(file)))

  return sourceFiles.filter(file => diff.includes(file.replace(/\d+/, '')))
}