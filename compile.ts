import {readFileSync} from 'fs';

import {breakIntoDays} from './src/breakIntoDays';
import {convertToXml} from './src/convertToXml';

const loadChannelFile = (channelId: string) => {
    return readFileSync(`./data/txt/${channelId}.txt`, 'utf8');
};

export const channels = [
    {ort: 'Первый'},
    {rtr: 'Россия'},
    {ntv: 'НТВ'},
    {kultura: 'Россия К'},
    {kanal12: 'Канал 12'},
    {ren: 'РЕН'},
    {sts: 'СТС'},
    {tnt: 'ТНТ'},
    {kanal5: 'Пятый'},
    {tvc: 'ТВЦ'},
    {rusever: 'Русский Север'},
];

const compileChannels = (): { [key: string]: string[][] } => {
    const channelsByDay = {};

    channels.forEach((channel) => {
        const channelId = Object.keys(channel)[0];
        const channelContent = loadChannelFile(channelId);
        const broken = breakIntoDays(channelContent);
        channelsByDay[channelId] = broken;
    });

    return channelsByDay;
};

const byDay = compileChannels();

console.log(convertToXml(byDay));
