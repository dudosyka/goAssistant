let Localization = function(locale) {
    if(locale == "ru") this.language = russian;
    else if(locale == "jp") this.language = japanese;
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

        fetching: "Получение данных...",

        noAnswerTitle: "Результат подсказки",
        noAnswerText: "ИИ для подсказок считает, что исход партии уже очевиден, поэтому рекомендует одному из игроков сдаться, узнать победителя и проигравшего можно с помощью подсказки 'Перевес в очках'"
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
        profile: "Профиль",
        private: "Частная игра",
        create: "Создать",
        gobanCode: "Код вашего гобана",
        start: "Начать игру",
        connect: "Присоединиться",
        fillGobanCode: "Укажите код гобана",
        back: "Назад",
        logout: "Выйти",
        nickname: "Ник: ",
        mail: "Почта: ",
        close: "Закрыть",
        historyLabel: "История игры",

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

        fetching: "Fetching info...",

        noAnswerTitle: "Hint result",
        noAnswerText: "The AI for hints believes that the outcome of the game is already obvious, so it recommends resign to one of the players, you can find out the winner and the loser using the 'Superiority' hint"
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
        profile: "Profile",
        private: "Private game",
        create: "Create",
        gobanCode: "Your goban code",
        start: "Start game",
        connect: "Connect",
        fillGobanCode: "Enter the goban code",
        back: "Back",
        logout: "Log out",
        nickname: "Nickname: ",
        mail: "Email: ",
        close: "Close",
        historyLabel: "Game history",

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
let japanese = {
    onBoard: "フィールド上の碁石",
    spentOnHints: "ヒントで使用したポイント数: ",
    score: "ポイント",
    gameStage: {
        label: "ゲームステージ:",
        0: "スタート",
        1: "中間",
        2: "最終ステージ",
        3: "ゲームオーバー"
    },
    recommendedHints: "おすすめヒント",
    allHints: "全てのヒント",
    hideAll: "ヒントを隠す",
    cost: "コスト: ",
    hints: {
        bestQuarter: "おすすめクォーター",
        bestEnemyQuarter: "対戦相手のベストクォーター",
        bestMoveOfSelected: "選択プレイ中のベスト",
        selectedError: "あなたの選択したプレイは平等であり、ゲームを影響することはありません。",
        heatmap: "碁盤ヒートマップ",
        heatmapZone: "クォーターのヒートマップ",
        heatmap2Zones: "2クォーターのヒートマップ",
        bestMove1: "ベストムーブゾーン",
        bestMove2: "ベストムーブゾーン2択",
        bestMove4: "ベストムーブゾーン4択",
        bestEnemyMove1: "危険ゾーン",
        bestEnemyMove4: "4つの危険ゾーン",
        prediction6: "6手先までのゲーム予測",
        prediction10: "10手先までのゲーム予測",
        superiority: "優勢(現在の勝者)",
        superiorityLabels: {
            current: "現在の優勢ポイント: ",
            noHints: "ヒント無しのスコア",
            winner: "現在の勝者: ",
            white: "白",
            black: "黒",
            loseNow: "あなたは現在負けを予測されています。最善のヒントをハイライトします。ハイライトされたものを選択することをお勧めします。",
            winNow: "あなたは現在優勝傾向です。ヒントを使い、相手の攻撃を封じ優勝しよう！"
        },

        select1: "フィールドを選択",
        select1_z: "クォーター中のフィールドを選択",
        select2: "クォーター中のフィールドを2個選択",
        select4: "4つのフィールドを選択",

        fetching: "情報採取中",

        noAnswerTitle: "ヒント結果",
        noAnswerText: "AIはゲーム結果を予測し、辞退をおすすめしています。勝者と敗者を「優勢(現在の勝者)」で見ることができます"
    },
    loading: "読み込み中",
    pass: "パス",
    resign: "辞任する",
    historyShort: "履歴",
    history: "ゲーム履歴",
    counter: "結果",
    winner: "優勝者: ",
    winnerCount: "優勝者スコア: ",
    loser: "敗北: ",
    loserCount: "敗北者スコア: ",
    hintCount: "ヒント: ",
    backToMenu: "メニューへ戻る",
    backToProfile: "プロファイルへ戻る",
    moves: "動き",
    viewMode: "モードを閲覧",
    menu: {
        continueGame: "ゲームを続ける",
        random: "ランダムな相手と対戦する。",
        ai: "AIと対決",
        profile: "プロフィール",
        private: "プライベートゲーム",
        create: "制作",
        gobanCode: "あなたのコード",
        start: "ゲームを始める",
        connect: "接続",
        fillGobanCode: "碁盤コードを入力",
        back: "戻る",
        logout: "ログアウト",
        nickname: "ニックネーム: ",
        mail: "メール: ",
        close: "閉じる",
        historyLabel: "ゲーム履歴",

        loadGame: "ゲームをロード中",
        searchingEnemy: "対戦相手を検索中",
        loadingBot: "ボットと接続中",

        waiting: "対戦相手を検索中",
        gameConnection: "ゲームに接続中",
        gameNotFound: "このコードに当てはまるゲームは検出されませんでした。もう一度確認をし、再度入力をしてください。",

        emailExists: "このメールアドレスはすでにシステムに登録されています。ログインをしてください。",
        login: "ログイン",
        register: "登録",
        error: "エラー",

        waitingEnemy: "対戦相手を検索中"
    }
};
export default Localization;