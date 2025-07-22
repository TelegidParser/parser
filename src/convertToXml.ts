import { writeFileSync } from 'fs'
import { channels } from '../compile';
import { Days } from './breakIntoDays';
import { setTags } from './setTags';

const xmlHeader = '<?xml version="1.0" encoding="utf-8" standalone="yes" ?>';
export const convertToXml = (byDay) => {

  const daysContent = Days.map((day, index) => {
    const dayTag = day.toLowerCase();
    const wrappedWithChannelTitles = channels.map((channel) => {

      const channelId = Object.keys(channel)[0];
      const channelTitle = Object.values(channel)[0];

      const dayContent = byDay[channelId][index]
        .map(setTags)
        .join('\n');

      return `<h2>${channelTitle}</h2>\n${dayContent}\n\n`;
    });

    return `<${dayTag}>${wrappedWithChannelTitles.join('\n')}</${dayTag}>`;

  });
  const finalContent = `${xmlHeader}\n<Каналы><Центральные>${daysContent.join('\n')}</Центральные></Каналы>`;

  writeFileSync('result.xml', finalContent);
};
