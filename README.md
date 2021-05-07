# GoAssistant

## #1 How to install:
    1. Go to project directory
    2. Open prompt
    3. Write down `npm i`

## #2 How to start application:
    1. Go to project directory
    2. Open prompt 
    3. Write down `npm run serve`

## #3 How to build application:
    1. Go to project directory
    2. Open prompt
    3. Write down `npm run build`
   
## #4 Project structure:
    1. /src/Models there you can find midlewares between Leela and this application
    2. /src/router routing in the application is provided here
    3. /src/views pages of this application (child Vue entities)
    4. /src/App.vue main Vue entity
    5. /src/main.js entry point (here Vue entity is created and declared some funcs)
    6. /src/assets dir with pictures and styles
    7. /public layouts
    8. /public/favicon favicons

## #5 Application architecture and functionality:
### Hints:
    1. Четверть игры противника: Показывает в какой четверти, по мнению Лилы, 
    противник будет играть дальше.
    
    2. Зона лучшего хода: Выводит зону 3х3 вокруг лучшего хода для игрока.
    (Спрашиваем у лилы лучший ход игрока и рисуем вокруг него область 3х3, причем 
    сам ход находится рандомно в одной из 9 клеток)
    
    3. Зоны 2 лучших ходов: Выводит две зоны 2х2 вокруг двух лучших ходов противника. 
    (Спрашиваем у лилы 2 лучших хода и рисуем вокруг каждого зоны 2х2, ходы 
    располагаются рандомно внутри этих областей)
    
    4. 4 лучших хода: Выводит 4 лучших хода игрока. (Стандартная подсказка 
    на 4 лучших хода игрока)
    
    5. Тепловая карта доски: Используется стандартная подсказка для отрисовки 
    тепловой карты всей доски
    
    6. Тепловая карта зоны: Рисует тепловую карту выбранной четверти (Пользователь 
    кликает в одну из четырех четвертей, определяем по клику какую четверть запросил 
    игрок и спрашиваем у лилы тепловую карту этой четверти)
    
    7. Тепловая карты 2 зон: Тоже самое, что и "Тепловая карта зоны" только 
    в данном случае пользователь выбирает не одну, а сразу две четверти.
    
    8. Самая опасная зона: Рисует область 3х3 вокруг лучшего хода противника. 
    (Спрашиваем у лилы лучший ход противника и рисуем область 3х3 вокруг него, 
    область рисуется рандомно)
    
    9. 4 опасных зоны: Рисует 4 области 2х2 вокруг 4х лучших ходов противника.
    (Спрашиваем у лилы 4 лучших хода противника и помещаем их в области 2х2)
    
    10. Прогноз игры на 10 ходов: Спрашиваем у лилы прогноз игры. Синими шариками 
    рисуем ходы игрока, красными - ходы противника. Внутри шариков цифрами указан 
    порядок ходов
    
    11. Прогноз игры на 6 ходов: Аналогично с предыдущим, только на 6 ходов

    12. Перевес в очках: Спрашиваем у лилы какой перевес очков в данный момент 
    между игроками. Также при проигрышной ситуации подсвечиваем наиболее 
    эффективные подсказки, которые помогут исправить ситуацию (не учитываем
    затраты на подсказки, но игроки могут это отслеживать, в блоке над списком 
    подсказок)
    
    13. Худший ход противника: Стандартная подсказка Лилы, указываем худший ход, 
    который может совершить противник.
    
    14. Лучшая четверть для игры: Стандартная подсказка лилы, спрашиваем у неё 
    какая четверть для игры сейчас лучше и подсвечиваем её для игрока.
    
    15. Лучший ход из выбранных: Игрок указывает на поле 4 хода, спрашиваем у 
    лилы какой из них лучше и подсвечиваем его.
    
### Video 
https://drive.google.com/file/d/1Pw7v2Nbz3SajqSBDEQspb9XyGDlVF4L2/view?usp=sharing
    
### Architecture:
    Приложение написано с нуля (ни одна из частей базового решения не использовалась)
    собрано приложение на Vue.js, своя Backend прослойка не создавалась, 
    приложение взаимодейтсвует напрямую с апи Leela-zero, обработка ответов от апи 
    происходит прямо на клиенте. 
    Взаимодействие с апи идет с помощью пакета axios, подключение
    к сокету с помощью пакета websocket. 
    
## #5 Our team:
    1. Михаил Беляев: frontend dev. Реализация игрового поля и подсказок. 
    2. Михаил Мохонов: frontend dev. Реализация дизайна приложения. 
    3. Шляпников Александр: backend dev. Структура приложения, связь приложения с апи.
    4. Артём Котенков: Помощь в тестировании приложения.
    5. Михаил Татуйко: Помощь в тестировании приложения, 
    помощь в реализации дизайна приложения.
    
    Идеи для реализованных подсказок были предложены Михаилом Беляевым, 
    Артёмом Котенковым, Александром Шляпниковым, реализация 
    была выполнена Михаилом Беляевым  
    
>    Help with application: Shlyapnikov Sasha (tg: @dudosyka)

>    Help with centaur: Belyaev Mikhail (tg: @sggdrnxj vk: https://vk.com/mixadev)
