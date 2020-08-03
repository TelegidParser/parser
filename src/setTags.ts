export const setTags = (programme: string) => {
    const setAgeProgramme = programme.replace(/\[(\d+)\+\]/, '<g2>$1+</g2>');
    const setTypeProgramme = setAgeProgramme.replace(/^(\d\d\.\d\d)\s+(".+")(.*(?:Детектив|Спортивная драма|Драма|Комедия|Боевик|Телесериал|Художественный фильм).+$)/, '$1 <m2>$2</m2>$3');
    const setTabProgramme = setTypeProgramme.replace(/^(\d\d\.\d\d)\s+(.+)$/, '$1\t$2');
    return setTabProgramme;
};
