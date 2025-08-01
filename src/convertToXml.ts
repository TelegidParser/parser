import { writeFileSync } from 'fs'
import { Days } from './breakIntoDays'
import { setTags } from './setTags'
import { xmlPath } from '../globals'
import { join } from 'path'
import { Channels } from './config/Channels'

const xmlHeader = '<?xml version="1.0" encoding="utf-8" standalone="yes" ?>'

export const convertToXml = (channelsGroup, rootTag: string, byDay, outputFilename: string, subTag = '', joinChar: string, timeDivider = ' ', days = Days, tagSuffix: '1' | '2') => {
  const daysContent = days.map((day, index) => {
    const dayTag = day.toLowerCase()
    const wrappedWithChannelTitles = channelsGroup.map((channelId) => {

      const channelTitle = Channels[channelId].title

      const dayContent = byDay[channelId][index]
        .map(
          (line: string) =>
            setTags(line, timeDivider, tagSuffix)
        )
        .join(joinChar)

      const dayContentFixed = dayContent.replace(/&/g, '&amp;')

      return `<h${tagSuffix}>${channelTitle}</h${tagSuffix}>\n${dayContentFixed}\n`
    })

    return `<${dayTag}>${wrappedWithChannelTitles.join('\n')}</${dayTag}>`

  })

  let subTagOpen = ''
  let subTagClose = ''

  if (subTag) {
    subTagOpen = `<${subTag}>`
    subTagClose = `</${subTag}>`
  }

  const finalContent = `${xmlHeader}\n<Каналы><${rootTag}>${subTagOpen}${daysContent.join('\n')}${subTagClose}</${rootTag}></Каналы>`

  writeFileSync(join(xmlPath, `${outputFilename}.xml`), finalContent)
}
