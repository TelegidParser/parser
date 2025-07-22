import archiver = require('archiver')
import { createWriteStream } from 'fs'
import { xmlPath, zipPath } from '../globals'
import { join } from 'path'

const zipResult = () => {
  const output = createWriteStream(join(zipPath, 'programme.zip'))
  const archive = archiver('zip')

  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes')
    console.log('archiver has been finalized and the output file descriptor has closed.')
  })

  archive.on('error', function (err) {
    throw err
  })

  archive.pipe(output)

  archive.directory(xmlPath, false)

  archive.finalize()
}

zipResult()
