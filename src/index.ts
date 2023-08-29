// import path from 'path'
const fs = require('fs')
const path = require('path')
const json2xls = require('json2xls')
const { glob, globSync, globStream, globStreamSync, Glob } = require('glob')

const a = globSync(['locales/**/*.{json,ts,map}'])
console.log(a)

const readDir = (path: string) => {
  let dirs: any[] = []
  const files = fs.readdirSync(path)
  files.forEach(function (item: string, index: number) {
    const file_path = path + '/' + item

    console.log(file_path)
    let stat = fs.lstatSync(file_path)
    if (stat.isDirectory() === true) {
      dirs.push({
        name: item,
        path: file_path,
        data: require(`${file_path}/translation.json`),
      })
    }
  })

  return dirs
}

const getKey2Word = (dirs: any[], key: string) => {
  const obj: any = {}
  dirs.forEach((item) => {
    const data = item.data
    const name = item.name
    const value = data[key] || ''
    obj[name] = value
  })

  return obj
}

const readFiles = (path: string) => {
  const arr = []
  const dirs = readDir(path)
  const languageWords = dirs?.[0]?.data || {}
  for (var key in languageWords) {
    arr.push({
      key: key,
      ...getKey2Word(dirs, key),
    })
  }
  return arr
}

const writeFileRecursive = function (
  path: string,
  buffer: Buffer,
  callback?: Function
) {
  let lastPath = path.substring(0, path.lastIndexOf('/'))
  fs.mkdir(lastPath, { recursive: true }, (err: any) => {
    if (err) return callback?.(err)
    fs.writeFile(path, buffer, 'binary', (err: any) => {
      if (err) return callback?.(err)
      return callback?.(null)
    })
  })
}

const main = () => {
  const commandPath = path.resolve(process.cwd(), './locales')
  const data = readFiles(commandPath)
  var xls = json2xls(data)
  writeFileRecursive('execl/i18n2xls.xlsx', xls)
}

main()
