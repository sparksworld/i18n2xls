// import path from 'path'
const fs = require('fs')
const path = require('path')
const json2xls = require('json2xls')
const commandPath = path.resolve(process.cwd(), './example')

const readDir = () => {
  let dirs: any[] = []
  const files = fs.readdirSync(commandPath)

  files.forEach(function (item: string, index: number) {
    const path = commandPath + '/' + item
    let stat = fs.lstatSync(path)
    if (stat.isDirectory() === true) {
      dirs.push({
        name: item,
        path: path,
        data: require(`${path}/resources.json`)
      })
    }
  })

  return dirs
}

const getKey2Word = (dirs: any[], key: string) => {
  const obj: any = {}
  dirs.forEach(item => {
    const data = item.data
    const name = item.name
    const value = data[key] || ''
    obj[name] = value
  });

  return obj
}


const readFils = () => {
  const arr = []
  const languageWords = readDir()?.[0]?.data || {}
  for (var key in languageWords) {
    arr.push({
      key: key,
      ...getKey2Word(readDir(), key)
    })
  }
  return arr
}




const main = () => {
  const data = readFils()
  var xls = json2xls(data);
  fs.writeFileSync('i18n2xls.xlsx', xls, 'binary');
}


main()