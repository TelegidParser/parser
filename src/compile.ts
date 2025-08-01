import { readFileSync } from 'fs'

import { breakIntoDays, Days, DaysShort } from './breakIntoDays'
import { convertToXml } from './convertToXml'
import { forEach } from 'lodash'
import { join } from 'path'
import { txtPath } from '../globals'
import {
  CentralGroup,
  ChildrenGroup,
  ChildrenRcGroup,
  EducationGroup,
  EducationRcGroup,
  EntertainmentGroup,
  EntertainmentRcGroup,
  MoviesGroup,
  MoviesRcGroup,
  MusicGroup,
  SportGroup,
  SportRcGroup
} from './config/CompileGroups'

const loadChannelFile = (channelId: string) =>
  readFileSync(join(txtPath, `${channelId}.txt`), 'utf8')


const compileChannels = (channelsGroup: string[]): { [key: string]: string[][] } => {
  const channelsByDay = {}

  forEach(channelsGroup, (channelId) => {
    const channelContent = loadChannelFile(channelId)
    const broken = breakIntoDays(channelContent)
    channelsByDay[channelId] = broken
  })

  return channelsByDay
}

const compileGroup = (channelsGroup, rootTag: string, outputFilename: string, subTag = '', joinChar = ' ', timeDivider = ' ', days = Days, tagSuffix: '1' | '2') => {
  const byDay = compileChannels(channelsGroup)

  convertToXml(channelsGroup, rootTag, byDay, outputFilename, subTag, joinChar, timeDivider, days, tagSuffix)
  console.log(`${outputFilename} channel group saved`)
}

compileGroup(CentralGroup, 'Центральные', 'central', undefined, '\n', '\t', Days, '2')

compileGroup(MoviesGroup, 'Кабельные', 'gc_01_movies', 'Кино', ' ', ' ', DaysShort, '1')
compileGroup(ChildrenGroup, 'Кабельные', 'gc_02_children', 'Детские', ' ', ' ', DaysShort, '1')
compileGroup(SportGroup, 'Кабельные', 'gc_03_sport', 'Спорт', ' ', ' ', DaysShort, '1')
compileGroup(MusicGroup, 'Кабельные', 'gc_04_music', 'Музыка', ' ', ' ', DaysShort, '1')
compileGroup(EducationGroup, 'Кабельные', 'gc_05_education', 'Познавательные', ' ', ' ', DaysShort, '1')
compileGroup(EntertainmentGroup, 'Кабельные', 'gc_06_entertainment', 'Отдых', ' ', ' ', DaysShort, '1')

compileGroup(EducationRcGroup, 'Кабельные', 'rc_01_education', 'Познавательные', ' ', ' ', DaysShort, '1')
compileGroup(MoviesRcGroup, 'Кабельные', 'rc_02_movies', 'Кино', ' ', ' ', DaysShort, '1')
compileGroup(EntertainmentRcGroup, 'Кабельные', 'rc_03_entertainment', 'Отдых', ' ', ' ', DaysShort, '1')
compileGroup(ChildrenRcGroup, 'Кабельные', 'rc_04_children', 'Детские', ' ', ' ', DaysShort, '1')
compileGroup(SportRcGroup, 'Кабельные', 'rc_05_sport', 'Спорт', ' ', ' ', DaysShort, '1')


