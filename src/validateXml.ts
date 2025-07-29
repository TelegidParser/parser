import libxmljs from 'libxmljs'
import { readdirSync, readFileSync } from 'fs'
import { xmlPath } from '../globals'
import { join } from 'path'

const validateXml = async (xmlFile: string) => {
  const str = readFileSync(join(xmlPath, xmlFile), 'utf8').replace(/[\r]+/g, '')

  try {
    const xmlDoc = libxmljs.parseXml(str)
    console.log(`${xmlFile} validated successfully.`)
  } catch (e) {
    console.log(`${xmlFile} is invalid.`)
    console.error(e)
    process.exit(1)
  }
}
const validateXmlFiles = () => {
  const files = readdirSync(xmlPath)

  for (const file of files) {
    validateXml(file)
  }
}

validateXmlFiles()
