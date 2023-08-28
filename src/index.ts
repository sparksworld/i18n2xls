// import path from 'path'
const fs = require('fs')
const path = require('path')
const json2xls = require('json2xls')

console.log(json2xls)

const commandPath = path.resolve(process.cwd(), './example')

const readDir = () => {
  let dirs: any[] = []
  const files = fs.readdirSync(commandPath)

  files.forEach(function (item: string, index: number) {
    const path = commandPath + '/' + item
    let stat = fs.lstatSync(path)
    console.log(stat)
    if (stat.isDirectory() === true) {
      dirs.push({
        name: item,
        path: path,
      })
    }
  })

  return dirs
}

const readFils = () => {
  const dirs = readDir()

  return dirs.map((item) => {
    return {
      ...item,
      data: fs.readFileSync(`${item.path}/resources.json`, 'utf-8'),
    }
  })
}

const xls = json2xls(readFils())
fs.writeFileSync(`./json2xls.xlsx`, xls, 'binary')

// console.log(readFils())

// function getFiles(dir: string) {
//   const stat = fs.statSync(dir)
//   if (stat.isDirectory()) {
//     //判断是不是目录
//     const dirs = fs.readdirSync(dir)
//     dirs.forEach((value) => {
//       // console.log('路径',path.resolve(dir,value));
//       getFiles(path.join(dir, value))
//     })
//   } else if (stat.isFile()) {
//     //判断是不是文件
//     console.log('文件名称', dir)
//   }
// }

// console.log(dirs)
// getFiles(commandPath)

// /**
//  * 读取文件
//  * @param {*} language
//  * @returns
//  */
// const rendFile = (project, language) => {
//   const content = fs.readFileSync(`${__dirname}/translation.json`, 'utf-8')
//   const json = JSON.parse(content)
//   return json
// }

// /**
//  * 获取文件数据
//  * @param {*} project
//  * @param {*} language
//  * @returns
//  */
// const getFileData = (project, language) => {
//   const json = rendFile(project, language)
//   let map = new Map()
//   if (json) {
//     for (let key in json) {
//       map.set(key, json[key])
//     }
//   }
//   return map
// }

// /**
//  * 生成excel
//  * @param {*} project
//  */
// const generator = (project) => {
//   const zh = getFileData(project, 'zh')
//   const ko = getFileData(project, 'en')
//   let omitArr = []
//   zh.forEach((value, key) => {
//     const data = zh.get(key)
//     omitArr.push({
//       单词: key,
//       翻译: data || value,
//     })
//     // if(data){
//     //   if(!value){
//     //     omitArr.push({
//     //       '单词':key,
//     //       '翻译':value
//     //     })
//     //   }
//     // }else{
//     //   omitArr.push({
//     //     '单词':key,
//     //     '翻译':""
//     //   })
//     // }
//   })
//   if (omitArr.length) {
//     const xls = json2xls(omitArr)
//     fs.writeFileSync(`./词汇.xlsx`, xls, 'binary')
//   }
// }

// config.projects.forEach((project) => {
//   generator(project)
// })
