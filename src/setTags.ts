export const setTags = (programme: string, timeDivider: string) => {
  const setAgeProgramme = programme.replace(/\[(\d+)\+]/, '<g2>$1+</g2>')
  const setTypeProgramme = setAgeProgramme.replace(/^(\d\d\.\d\d)\s+(".+")(.*(?:Фантастический боевик|Детектив|Спортивная драма|Драма|Комедия|Боевик|Телесериал|Художественный фильм|Ситком).+$)/, '$1 <m2>$2</m2>$3')
  const setTimeDividerProgramme = setTypeProgramme.replace(/^(\d\d\.\d\d)\s+(.+)$/, `$1${timeDivider}$2`)
  const setTimeTagProgramme = setTimeDividerProgramme.replace(/^(\d\d\.\d\d)(.+)$/, `<t2>$1</t2>$2`)
  return setTimeTagProgramme
}
