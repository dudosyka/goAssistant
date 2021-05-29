let Localization = function(locale) {
    if(locale == "ru") this.language = russian;
    else this.language = english;
}
let russian = {
    onBoard: "Камней на поле",
    spentOnHints: "Потрачено на подсказки:",
    score: "очков",
    gameStage: {
        label: "Стадия игры:",
        0: "Начальная",
        1: "Основная",
        2: "Финальная",
        3: "Игра окончена"
    },
    recommendedHints: "Рекомендуемые подсказки",
    allHints: "Все подсказки",
    hideAll: "Скрыть все",
    cost: "Стоимость: ",
    hints: {
        bestQuarter: "Лучшая четверть для игры",
        bestEnemyQuarter: "Четверть игры противника",
        bestMoveOfSelected: "Лучший ход из выбранных",
        selectedError: "Выбранные вами ходы равносильны и не повлияют на игру - можете играть в любом поле",
        heatmap: "Тепловая карта доски",
        heatmapZone: "Тепловая карта зоны",
        heatmap2Zones: "Тепловая карта 2 зон",
        bestMove1: "Зона лучшего хода",
        bestMove2: "Зона 2 лучших ходов",
        bestMove4: "4 лучших хода",
        bestEnemyMove1: "Самая опасная зона",
        bestEnemyMove4: "4 опасных зоны",
        prediction6: "Прогноз игры (6 ходов)",
        prediction10: "Прогноз игры (10 ходов)",
        superiority: "Перевес в очках",
        superiorityLabels: {
            current: "Текущий перевес в очках: ",
            noHints: "без учета подсказок",
            winner: "На данный момент побеждают: ",
            white: "Белые",
            black: "Черные",
            loseNow: "Вы находитесь в проигрышной ситуации, для удобства были подсвечены самые полезные подсказки - настоятельно рекомендуем вам их использовать для победы.",
            winNow: "Вы находитесь в выигрышной ситуации, используйте подсказки для отражения последующих атак и победите в этой игре!"
        },

        select1: "Выберите поле",
        select1_z: "Выберите поле, зона которого вас интересует",
        select2: "Выберите 2 поля, зоны которых вас интересуют",
        select4: "Выберите 4 поля",

        fetching: "Получение данных..."
    },
    loading: "Загрузка...",
    pass: "Пас",
    resign: "Сдаться",
    historyShort: "История",
    history: "История ходов",
    counter: "Счет",
    winner: "Победитель: ",
    winnerCount: "Очки победителя: ",
    loser: "Проигравший: ",
    loserCount: "Очки проигравшего: ",
    hintCount: "подсказки: ",
    backToMenu: "В главное меню",
    backToProfile: "Вернуться в профиль",
    moves: "Ходы",
    viewMode: "Режим просмотра игры",
    menu: {
        continueGame: "Продолжить игру",
        random: "Игра со случайным соперником",
        ai: "Игра с ИИ",
        private: "Частная игра",
        create: "Создать",
        gobanCode: "Код вашего гобана",
        start: "Начать игру",
        connect: "Присоединиться",
        fillGobanCode: "Укажите код гобана",
        back: "Назад",
        logout: "Выйти",
        profile: "Профиль",
        nickname: "Ник: ",
        mail: "Почта: ",
        close: "Закрыть",

        loadGame: "Загрузка партии",
        searchingEnemy: "Поиск противника",
        loadingBot: "Подключение к боту",

        waiting: "Ожидание присоединения",
        gameConnection: "Присоединение к игре",
        gameNotFound: "Игра с указанным кодом не найдена! Проверьте правильность написания кода гобана и повторите попытку",

        emailExists: "Такой e-mail адрес уже есть в системе! Попробуйте войти.",
        login: "Войти",
        register: "Зарегистрироваться",
        error: "Ошибка!",

        waitingEnemy: "Ожидание соперника"
    }
};
let english = {
    onBoard: "Stones on field",
    spentOnHints: "Spent on hints:",
    score: "points",
    gameStage: {
        label: "Game stage:",
        0: "Starter",
        1: "Middle",
        2: "Final",
        3: "Game over"
    },
    recommendedHints: "Recommended hints",
    allHints: "All hints",
    hideAll: "Hide hints",
    cost: "Cost: ",
    hints: {
        bestQuarter: "Best quarter to play",
        bestEnemyQuarter: "Best enemy quarter",
        bestMoveOfSelected: "Best of selected",
        selectedError: "Your chosen moves are equal and will not affect the game - you can play in any field",
        heatmap: "Goban heatmap",
        heatmapZone: "Heatmap of quarter",
        heatmap2Zones: "Heatmap of 2 quarters",
        bestMove1: "Best move zone",
        bestMove2: "Zones of 2 best moves",
        bestMove4: "4 best moves",
        bestEnemyMove1: "The most dangerous zone",
        bestEnemyMove4: "4 danger zones",
        prediction6: "Game forecast (6 moves)",
        prediction10: "Game forecast (10 moves)",
        superiority: "Superiority",
        superiorityLabels: {
            current: "Current advantage in points: ",
            noHints: "without hint score",
            winner: "Currently wins: ",
            white: "White",
            black: "Black",
            loseNow: "You are in a losing situation, for convenience, the most useful hints have been highlighted - we strongly recommend use them to win.",
            winNow: "You are in a winning situation, use the hints to repel subsequent attacks and win this game!"
        },

        select1: "Select a field",
        select1_z: "Select the field whose quarter you are interested in",
        select2: "Select 2 fields, the quarters of which you are interested in",
        select4: "Select 4 fields",

        fetching: "Fetching info..."
    },
    loading: "Loading...",
    pass: "Pass",
    resign: "Resign",
    historyShort: "History",
    history: "Game history",
    counter: "Result",
    winner: "Winner: ",
    winnerCount: "Winner's score: ",
    loser: "Loser: ",
    loserCount: "Loser's score: ",
    hintCount: "hints: ",
    backToMenu: "Back to menu",
    backToProfile: "Back to profile",
    moves: "Moves",
    viewMode: "Game view mode",
    menu: {
        continueGame: "Continue game",
        random: "Play with a random opponent",
        ai: "Play with AI",
        private: "Private game",
        create: "Create",
        gobanCode: "Your goban code",
        start: "Start game",
        connect: "Connect",
        fillGobanCode: "Enter the goban code",
        back: "Back",
        logout: "Log out",
        profile: "Profile",
        nickname: "Nickname: ",
        mail: "EMail: ",
        close: "Close",

        loadGame: "Loading the game",
        searchingEnemy: "Searching for an opponent",
        loadingBot: "Connecting to the bot",

        waiting: "Waiting for the opponent",
        gameConnection: "Joining the game",
        gameNotFound: "The game with the specified code was not found! Please check the correct spelling of the goban code and try again",

        emailExists: "This e-mail address is already in the system! Try logging in.",
        login: "Log in",
        register: "Register",
        error: "Error!",

        waitingEnemy: "Waiting for the opponent"
    }
};
export default Localization;