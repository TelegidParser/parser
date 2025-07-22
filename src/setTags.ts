// timeSuffix === 1 - кабельные
// timeSuffix === 2 - центральные

export const setTags = (programme: string, timeDivider: string, tagSuffix = '2') => {
  const setAgeProgramme = programme.replace(/\[(\d+)\+]/, `<g${tagSuffix}>$1+</g${tagSuffix}>`)
  const setTypeProgramme = setAgeProgramme.replace(/^(\d\d\.\d\d)\s+(".+")(.*(?:Фантастический боевик|Детектив|Спортивная драма|Драма|Комедия|Боевик|Телесериал|Художественный фильм|Ситком|Мелодрама).+$)/, `$1 <m${tagSuffix}>$2</m${tagSuffix}>$3`)
  const setTimeDividerProgramme = setTypeProgramme.replace(/^(\d\d\.\d\d)\s+(.+)$/, `$1${timeDivider}$2`)
  const setTimeTagProgramme = setTimeDividerProgramme.replace(/^(\d\d\.\d\d)(.+)$/, `<t${tagSuffix}>$1</t${tagSuffix}>$2`)
  return setTimeTagProgramme
}
