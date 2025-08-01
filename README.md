# Шаблоны Indesign
В папке [templates](https://github.com/TelegidParser/parser/tree/master/templates) есть два файла-шаблона: 
- [gc.indt](https://github.com/TelegidParser/parser/blob/master/templates/gc.indt) - Голос Череповца
- [rc.indt](https://github.com/TelegidParser/parser/blob/master/templates/rc.indt) - Речь

Там же есть папка с шрифтами для этих шаблонов

На начальном этапе для верстки из этого проекта понадобятся только эти шаблоны потому, что исходные файлы каналов я буду пока обрабатывать сам и отправлять в подготовленном для импорта виде.

Далее, по мере ознакомления и улучшения понимания, как что работает, попробуем попрактиковаться в обработке исходников. 

## Как выглядит процесс от исходников до верстки

1. Скачиваю исходные программы каналов на подходящую (следующую) неделю с [https://suscipio.s-tv.ru/xchenel.php](https://suscipio.s-tv.ru/xchenel.php)
2. Дополнительно получаю два канала - Русский север и Канал 12 по электронной почте от местных провайдеров
3. Сохраняю скачанные файлы в определенную папку
4. Обрабатываю файлы
5. Когда все файлы на месте и обработаны, собираю их в файлы, готовые для импорта в шаблоны
6. В Indesign'е открываю шаблоны по очереди (ГЧ, Речь), импортирую файлы из пункта 5
7. Отправляю вам
8. Вы подравниваете, вычитываете, утверждаете, отправляете на печать

## Что будем делать

Чтобы плавно вникнуть в технический процесс и не теряться, мы вместе попрактикуем некоторые этапы, описанные в процессе выше.

Шаги с 1-го по 5-й включительно делаю я.

Начиная с 6-го шага, попробуете делать вы. То есть, принять от меня файлы для импорта на электронную почту, импортировать, далее всё, как вы делали до этого момента - подравнять, вычитать и т.д.


## Инструкция

В самом начале скачайте два файлы шаблонов для Голоса Череповца и Речи.

- [gc.indt](https://github.com/TelegidParser/parser/blob/master/templates/gc.indt) - Голос Череповца
- [rc.indt](https://github.com/TelegidParser/parser/blob/master/templates/rc.indt) - Речь

![Чтобы скачать шаблоны, нажмите эту кнопку справа вверху](/readme_images/download_template.png)

При необходимости, найдете шрифты в отдельной папке.

Файлы XML для импорта я буду отправлять архивом ZIP на электронную почту.

### Голос Череповца

1. Открыть gc.indt
2. Нажать File -> Import XML...
3. Выбрать XML-файлы, начинающиеся с `gc_`, один за одним, импортировать.
4. По мере импортирования файлов, соответствующие группы каналов будут появляться в фреймах.
5. Когда все файлы импортированы, сохранить как новый файл `.indd`. В шаблон сохранять не надо!
6. Обработать, как необходимо, дальше как обычно.


### Речь
Процесс практически такой же, но там только один файл для кабельных. Таким же образом, импортируйте его, а центральные, насколько я знаю, вы берете из ГЧ, когда они там уже вычитаны.

