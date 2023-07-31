export const Days = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье',
];

export const breakIntoDays = (channelContent: string): string[][] => {
    const lines = channelContent.split('\n').filter((line) => line.length > 0);
    const separators = [];

    Days.forEach((day) => {
        lines.forEach((line: string, index) => {
            if (line.toLowerCase() === day.toLowerCase()) {
                separators.push(index);
            }
        });

    });

    separators.push(lines.length);
    const daysContents = [];

    for (let i = 0; i < Days.length; i += 1) {
        daysContents.push(lines.slice(separators[i] + 1, separators[i + 1]));
    }

    return daysContents;
};
