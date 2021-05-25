<template>
    <div class="home">
        <div style="text-align: center;">
            <div id="game"></div><br>
            <button class="w3-button w3-white w3-hover-white tr" id="passButton">Пас</button>
            <button class="w3-button w3-white w3-hover-white tr" id="resignButton">Сдаться</button><br>
            <span id="specialMessages"></span>
        </div>

        <div class="w3-sidebar w3-bar-block w3-white" style="width:300px;left:0;top:0px;line-height:2;overflow:hidden;">
            <div class="w3-container w3-card-2 w3-center" style="padding: 10px">GoAssistant</div>

            <div class="bar" style="overflow:auto;padding-bottom:40px">
              <div class="section">
                <div class="moveDiv">&#9899; <b id="blackPlayerName" class="textLimiter">Загрузка...</b><span class="time-icon">⏳</span><span id="blackTimer">--:--</span></div>
                <div class="moveDiv">&#9898; <b id="whitePlayerName" class="textLimiter">Загрузка...</b><span class="time-icon">⏳</span><span id="whiteTimer">--:--</span></div>
              </div>

              <div class="section">
                <span class="opposite"><div>Камней на поле: </div><b id="blockCount">0</b></span>
                <div style="margin-top:10px;margin-bottom:10px">
                    <div>Потрачено на подсказки: </div>
                    <span class="opposite"><div>&#9899; <b id="blackHints">0</b> очков</div><div><b id="whiteHints">0</b> очков &#9898;</div></span>
                </div>
                <span class="opposite"><div>{{stage}} Стадия игры: </div><b id="gameStage">N/A</b></span>
              </div>

                <span id="recommendedHelpersLabel"><span class="icon">💡</span> Рекомендуемые подсказки</span>
                <div id="recommendedHelpers">
                </div><br>
                <button class="w3-button main_color w3-hover-black tr helperButton" id="allHelpersButton">Все подсказки</button>
                <div id="allHelpers" style="display: none">
                </div>
            </div>
        </div>

        <div class="w3-sidebar w3-bar-block w3-white" style="width:300px;right:0;top:0px;overflow:hidden;">
            <div class="w3-container w3-card-4 w3-center" style="padding: 10px">История ходов</div>
            <div id="moveHistory" style="overflow: auto;max-height: calc(100% - 25px);padding-bottom:18px;"></div>
        </div>

        <div id="modal" class="w3-modal">
            <div class="w3-modal-content w3-animate-top w3-card-4">
                <header class="w3-container w3-purple">
                    <!--span onclick="document.getElementById('modal').style.display='none'"
                    class="w3-button w3-display-topright">&times;</span-->
                <h2 id="modalHeader">-</h2>
            </header>
            <div class="w3-container">
                <p id="modalText">Some text..</p>
            </div>
            <footer class="w3-container w3-purple" id="modalFooter">
            </footer>
          </div>
        </div>
    </div>
</template>

<style>
    @import "../assets/styles/board.css";
    @import "../assets/styles/side.css";
    @import "../assets/styles/pallete.css";
</style>

<script>
import { w3cwebsocket as W3CWebSocket } from "websocket";
import * as Hint from "../Models/Hint";

export default {
    name: 'Home',
    components: {},
    data() {
        return {
            game: null,
            client: null,
            stage: '🟢' //&#128994; &#128993; &#128308;
        }
    },
    methods: {
        async loadGame(gameId) {
            return get('/game/info/' + storage('curGameId') + "?token=" + storage('token'), null, data => {
                return data;
            });
        },

        move(type) {
            this.client.send(JSON.stringify([
            7,// 7 - статус: отправка сообщения
            "go/game", // в какой топик отправляется сообщение
            {
                command: type, // команда на отправку запроса "сдаться"
                token: storage('token'), // токен игрока
                game_id: storage('curGameId') // номер игры
            }
            ]));
        },
        sendMove(place) {
            this.client.send(JSON.stringify([
            7,// 7 - статус: отправка сообщения
            "go/game", // в какой топик отправляется сообщение
            {
                command: "move", // команда на отправку запроса "сдаться"
                token: storage('token'), // токен игрока
                place: place.toString().toLowerCase(), //Формат[a-z](1)[0-9](1,2)
                game_id: storage('curGameId') // номер игры
            }
            ]));
        },
        sendPass() {
            this.move('pass');
        },
        sendResign() {
            this.move('resign');
        }
    },
    async created() {
        let gameId = -1;
        await get("/game/current?token=" + storage('token'), null, data => {
            if (data.data.gameId === null) {
                window.location = "/"
            } else gameId = data.data.gameId;
        });
        const client = new W3CWebSocket('ws://172.104.137.176:41239');
        let instance = this;
        client.onopen = function () {
            console.log(client);
            client.send(JSON.stringify([
                7, // 7 - статус: отправка сообщения
                "go/game", // в какой топик отправляется сообщение
                {
                    command: "auth",  // команда на авторизацию подключения
                    token: storage('token'), // токен игрока
                    game_id: storage('curGameId') // номер игры
                    }
                ])
            );
        }
        let firstMapLoad = true;
        let falseEnemy = false;
        client.onmessage = function (event) {
            let data = JSON.parse(event.data);
            try {
                console.log("PC:"+playerColor);
                if(data.payload.type == "currentMap" || data.payload.type == "newTurn") {
                    currentTurn = data.payload.turn=="black"?colors.BLACK:colors.WHITE;
                    updateHintStatus();
                    turnBlackEnd = data.payload.turnBlackEndedAt;
                    turnWhiteEnd = data.payload.turnWhiteEndedAt;
                    console.log(turnBlackEnd)
                    console.log(turnWhiteEnd)
                    updateTimer();
                }
                if(data.payload.type == "currentMap") {
                    playerColor = data.payload.player=="w"?colors.WHITE:colors.BLACK;
                    canPlace = (playerColor == colors.WHITE && data.payload.turn == "white")||
                        (playerColor == colors.BLACK && data.payload.turn == "black");
                    updateHintStatus();
                    console.log("Parsing current map...");
                    data.payload.currentMap = normalizeMatrix(data.payload.currentMap);
                    loadMatrix(data.payload.currentMap);
                    console.log("Current map parsed.");
                    let playerName = data.payload.you.nickname;
                    let opponentName = data.payload.opponent.nickname;
                    if(opponentName == "Противник" && data.payload.opponent.avatar.length < 1) {
                        instance.sendResign();
                        return falseEnemy = true;
                    }
                    if(playerColor == colors.WHITE) {
                        whitePlayerName = playerName;
                        blackPlayerName = opponentName;
                        e("whitePlayerName").innerHTML = playerName;
                        e("blackPlayerName").innerHTML = opponentName;
                    } else {
                        whitePlayerName = opponentName;
                        blackPlayerName = playerName;
                        e("whitePlayerName").innerHTML = opponentName;
                        e("blackPlayerName").innerHTML = playerName;
                    }
                    if(firstMapLoad) {
                        loadStory();
                        getHintInfo();
                        firstMapLoad = false;
                    }
                }
                if(data.payload.type == "newTurn") {
                    data.payload.currentMap = normalizeMatrix(data.payload.currentMap);
                    loadMatrix(data.payload.currentMap);
                    let color = colors.BLACK;
                    if (data.payload.turn == "black") color = colors.WHITE;
                    let movePlace = data.payload.place;
                    if(data.payload.moveType == "pass") movePlace = null;
                    addMoveToStory(color, data.payload.move.split("(")[0], data.payload.place, false);
                    currentTurn = color==colors.BLACK?colors.WHITE:colors.BLACK;
                    if(playerColor == currentTurn) canPlace = true;
                    else canPlace = false;
                    updateHintStatus();
                }
                if(data.payload.type == "endGame") {
                    if(falseEnemy) return window.location.href = "/"
                    forceStage = 3;
                    stageDefinder();
                    let score = data.payload.finalScore; //string
                    let winner = data.payload.winner.toLowerCase(); //w/b
                    let loserPlayer = {
                        nickname: data.payload.loserPlayer.nickname,
                        finalScore: data.payload.loserPlayer.finalScore,
                        hintScore: data.payload.loserPlayer.hintScore
                    };
                    let winnerPlayer = {
                        nickname: data.payload.winnerPlayer.nickname,
                        finalScore: data.payload.winnerPlayer.finalScore,
                        hintScore: data.payload.winnerPlayer.hintScore
                    }
                    showModal(`Игра окончена`,`Счет: <b>${score}</b><br><br>
                                                Победитель: <b>${winnerPlayer.nickname}</b><br>
                                                Очки победителя: <b>${winnerPlayer.finalScore}</b> (подсказки: ${winnerPlayer.hintScore})<br><br>
                                                Проигравший: <b>${loserPlayer.nickname}</b><br>
                                                Очки проигравшего: <b>${loserPlayer.finalScore}</b> (подсказки: ${loserPlayer.hintScore})<br>
                                                `,
                                `<button class="w3-button w3-white w3-hover-white w3-card-4 tr" onclick="window.location.href='/'">В главное меню</button>`);
                }
                if(data.payload.type == "notify") {
                    try {
                        if(data.error.length > 0) {
                            if(data.error.includes("your turn1")) {
                                canPlace = false;
                                updateHintStatus();
                            } else {
                                canPlace = true;
                                updateHintStatus();
                            }
                        }
                    } catch(e) {}
                }
                if(data.payload.type == "userConnected") {
                    console.log(data.payload.turn);
                }
            } catch(e) {
                console.log(e)
            }
            console.log(data);
            try {
                if(data[4].code == 500) window.location.refresh();
            } catch(e) {}
        }
        this.client = client;
        let data = await this.loadGame();
        console.log(data);

        let canPlace = false;
        let playerColor = 0;
        let whitePlayerName = "";
        let blackPlayerName = "";
        let constants = [20];

        let fantom = [-1, -1];

        let selectorMode = false;
        let selectedPoints = [];
        let selectorLimit = -1;
        let selectorCallback;

        let hints = [];

        let size = 13;
        let putted = [];
        let blocks = [];
        let blockCount = 0;

        let turnWhiteEnd = -1;
        let turnBlackEnd = -1;
        let currentTurn = 0;

        let forceStage = -1;

        let moveStory = [];

        const colors = {
            BLACK: 1,
            WHITE: -1,
            HINT: 'hint',
            SELECTOR: 'selector'
        };
        const movePrefab = `<div class="w3-bar-item w3-card-4 main_color beetwin ">{MOVE}</div>`;

        class Helper {
            constructor(label, stage, sender, loseHinted) {
                this.label = label;
                this.stage = stage;
                this.sender = sender;
                this.enabled = true;
                this.loseHinted = loseHinted;
            }
        };
        function toggleSelector(label,limit,callback) {
            selectorMode = !selectorMode;
            if (selectorMode) {
                clearSelectors();
                selectedPoints = [];
                e("specialMessages").innerHTML = label;
            } else {
                e("specialMessages").innerHTML = "";
                clearSelectors();
            }
            selectorLimit = limit;
            selectorCallback = function(){
                e("specialMessages").innerHTML = "";
                callback();
            };
        }
        /*let helpers = [
            new Helper("Начальная 1", 0, function() {}),
            new Helper("Начальная 2", 0, function() {}),
            new Helper("SelectorMode", 0, function() {
                selectorMode = !selectorMode;
                if (selectorMode) {
                    clearSelectors();
                    selectedPoints = [];
                    e("specialMessages").innerHTML = "Выберите нужные поля (3 поля)";
                } else {
                    e("specialMessages").innerHTML = "";
                    clearSelectors();
                }
                selectorLimit = 3;
                selectorCallback = function() {
                    e("specialMessages").innerHTML = "";
                }
            }),
            new Helper("Основная 1", 1, function() {}),
            new Helper("Основная 2", 1, function() {}),
            new Helper("Финальная 1", 2, function() {}),
            new Helper("Финальная 2", 2, function() {})
        ];*/
        async function baseHint(hintName, invoke) {
            togglePlacement(true);
            console.log("Fetching "+hintName);
            await invoke();
            console.log("Hint fetched");
            togglePlacement();
            getHintInfo();
        }
        function getMaxOfArray(numArray) {return Math.max.apply(null, numArray);}
        async function getHintInfo() {
            let result = await hint.gameInfo();
            let creditBlack = result.data.credit_1;
            let creditWhite = result.data.credit_2;
            e("whiteHints").innerHTML = creditWhite;
            e("blackHints").innerHTML = creditBlack;
        }
        async function getGameStory() {
            let result = await hint.gameInfo();
            for(let i of result.data.moves.split(";")) {
                if(i.length<5) continue;
                let color = i[0]=="W"?colors.WHITE:colors.BLACK;
                let alphabet = "abcdefghijklm";
                let x = alphabet.indexOf(i[2]);
                if(x<0) {
                    addMoveToStory(color,color==colors.WHITE?whitePlayerName:blackPlayerName,null);
                    continue;
                }
                let y = alphabet.indexOf(i[3]);
                addMoveToStory(color,color==colors.WHITE?whitePlayerName:blackPlayerName,parseField(x,y));
            }
        }
        let hint = new Hint.default(gameId);
        let highlightHints = false;
        let helpers = [
            new Helper("Лучшая четверть для игры",0,function(){
                baseHint("best quarter", async function() {
                    const result = await hint.heatmapBestZone();
                    for(let x=0;x<size;x++) {
                        for(let y=0;y<size;y++) {
                            if(defineQuarter(x,y)==result) addHint(x,y);
                        }
                    }
                })
            },false),
            new Helper("Четверть игры противника",1,async function(){
                baseHint("best enemy quarter",async function() {
                    const result = await hint.heatmapEnemyBestZone();
                    for(let x=0;x<size;x++) {
                        for(let y=0;y<size;y++) {
                            if(defineQuarter(x,y)==result) addHint(x,y);
                        }
                    }
                });
            },false),
            new Helper("Лучший ход из выбранных",0,function(){
                toggleSelector("Выберите 4 поля",4,function(){
                    baseHint("best selected move", async function() {
                        let converted = [];
                        for(let i of selectedPoints) {
                            converted.push(parseField(i[0],i[1]));
                        }
                        const result = await hint.bestMovesOf(converted);
                        let coords = parseXY(result.data.hint);
                        if(coords[0] < 0)
                            showModal(`Лучший ход из 4`,`Выбранные вами ходы равносильны и не повлияют на игру - можете играть в любом поле`,false);
                        else addHint(coords[0],coords[1]);
                        clearSelectors();
                    });
                })
            },false),
            new Helper("Зона лучшего хода",1,async function(){
                baseHint("best move",async function() {
                    const result = await hint.bestMoves(1);
                    for(let i of result) {
                        let coords = parseXY(i);
                        addHintZone(coords[0],coords[1],3);
                    }
                });
            },false),
            new Helper("Зоны 2 лучших ходов",1,async function(){
                baseHint("best moves (2)",async function() {
                    const result = await hint.bestMoves(2);
                    for(let i of result) {
                        let coords = parseXY(i);
                        addHintZone(coords[0],coords[1],2);
                    }
                });
            },true),
            new Helper("4 лучших хода",2,async function(){
                baseHint("best moves (4)",async function() {
                    const result = await hint.bestMoves(4);
                    for(let i of result) {
                        let coords = parseXY(i);
                        addHint(coords[0],coords[1]);
                    }
                });
            },true),
            new Helper("Тепловая карта доски",1,async function(){
                baseHint("heatmap",async function() {
                    const result = await hint.fullHeatmap();
                    let matrix = normalizeMatrix(result);
                    let max = -1;
                    for(let i of matrix) {
                        let localMax = getMaxOfArray(i);
                        if(localMax > max) max = localMax
                    }
                    for(let x in matrix) {
                        for(let y in matrix[x]) {
                            let opacity = 0.9/(max/matrix[x][y])
                            if(opacity>0) opacity += 0.02;
                            addHint(x,y,opacity);
                        }
                    }
                });
            },false),
            new Helper("Тепловая карта 2 зон",0,async function(){
                toggleSelector("Выберите 2 поля, зоны которых вас интересуют",2,async function(){
                    baseHint("heatmap quarter",async function() {
                        e("specialMessages").innerHTML = "Получение данных...";
                        let quarter = [defineQuarter(selectedPoints[0][0],selectedPoints[0][1]),defineQuarter(selectedPoints[1][0],selectedPoints[1][1])];
                        const result = await hint.heatmapQuarters(quarter);
                        let matrix = normalizeMatrix(result);
                        let max = -1;
                        for(let i of matrix) {
                            let localMax = getMaxOfArray(i);
                            if(localMax > max) max = localMax
                        }
                        for(let x in matrix) {
                            for(let y in matrix[x]) {
                                let opacity = 0.9/(max/matrix[x][y])
                                if(opacity>0) opacity += 0.02;
                                addHint(x,y,opacity,false);
                            }
                        }
                        e("specialMessages").innerHTML = "";
                        clearSelectors();
                    });
                });
            },true),
            new Helper("Тепловая карта зоны",1,async function(){
                toggleSelector("Выберите поле, зона которого вас интересует",1,async function(){
                    baseHint("heatmap quarter",async function() {
                        e("specialMessages").innerHTML = "Получение данных...";
                        let quarter = defineQuarter(selectedPoints[0][0],selectedPoints[0][1]);
                        const result = await hint.heatmapQuarter(quarter);
                        let matrix = normalizeMatrix(result);
                        let max = -1;
                        for(let i of matrix) {
                            let localMax = getMaxOfArray(i);
                            if(localMax > max) max = localMax
                        }
                        for(let x in matrix) {
                            for(let y in matrix[x]) {
                                let opacity = 0.9/(max/matrix[x][y])
                                if(opacity>0) opacity += 0.02;
                                addHint(x,y,opacity,false);
                            }
                        }
                        e("specialMessages").innerHTML = "";
                        clearSelectors();
                    })
                });
            },true),
            new Helper("Самая опасная зона",1,async function(){
                baseHint("protect zones (1)",async function() {
                    const result = await hint.bestMovesEnemy(1);
                    for(let i of result) {
                        let coords = parseXY(i);
                        addHintZone(coords[0],coords[1],3);
                    }
                });
            },false),
            new Helper("4 опасных зоны",1,async function(){
                baseHint("protect zones (4)",async function() {
                    const result = await hint.bestMovesEnemy(4);
                    for(let i of result) {
                        let coords = parseXY(i);
                        addHintZone(coords[0],coords[1],2);
                    }
                });
            },true),
            new Helper("Прогноз игры (10 ходов)",1,async function(){
                baseHint("future moves (10)",async function() {
                    const result = await hint.futureMoves(10);
                    let baseOpacity = 0.8;
                    let count=0;
                    for(let i of result.data.hint) {
                        count++;
                        let coords = parseXY(i.move);
                        addHint(coords[0],coords[1],baseOpacity,count%2==1,count);
                        baseOpacity *= 0.95
                    }
                });
            },true),
            new Helper("Прогноз игры (6 ходов)",2,async function(){
                baseHint("future moves (6)",async function() {
                    const result = await hint.futureMoves(6);
                    let baseOpacity = 0.8;
                    let count=0;
                    for(let i of result.data.hint) {
                        count++;
                        let coords = parseXY(i.move);
                        addHint(coords[0],coords[1],baseOpacity,count%2==1,count);
                        baseOpacity *= 0.95
                    }
                });
            },false),
            new Helper("Перевес в очках",2,async function(){
                baseHint("superiority",async function() {
                    const result = await hint.superiority();
                    highlightHints = !((result.winner=="W"?colors.WHITE:colors.BLACK)==playerColor);
                    showModal(`Перевес в очках`,`Текущий перевес в очках: <b>${result.score}</b> (без учета подсказок)<br>
                                                На данный момент побеждают: <b>${result.winner=="W"?"Белые":"Черные"}</b><br>${highlightHints?`
                                                Вы находитесь в проигрышной ситуации, для удобства были подсвечены самые полезные подсказки - настоятельно рекомендуем вам их использовать для победы.`:`
                                                Вы находитесь в выигрышной ситуации, используйте подсказки для отражения последующих атак и победите в этой игре!`}`);
                });
            },false),
            new Helper("Худший ход противника",3,function(){
                toggleSelector("Выберите поле для которого искать худший ход",1,function(){
                    baseHint("worst enemy move", async function() {
                        const result = await hint.worstEnemyMove(parseField(selectedPoints[0],selectedPoints[1]));
                        let coords = parseXY(result.data.hint);
                        addHint(coords[0],coords[1]);
                        clearSelectors();
                    });
                })
            },false),
        ];
        let helpersBlocked = false;
        let allHelpersShown = false;

        function e(id) { return document.getElementById(id); }
        function parseField(x, y) {
            const xAlign = "ABCDEFGHJKLMN";
            return xAlign[x] + (13 - y);
        }
        function parseXY(field) {
            const xAlign = "ABCDEFGHJKLMN";
            return [xAlign.indexOf(field[0]),(13-field.slice(1,3))];
        }
        function defineQuarter(x,y) {
            if(x<=size/2) {
                if(y<=size/2)
                    return 2;
                return 3;
            }
            if(y<=size/2)
                return 1
            return 4;
        }
        function togglePlacement(clear) {
            if(clear) clearHints();
            canPlace = !canPlace;
            updateHintStatus();
        }
        function normalizeMatrix(matrix) {
            for(let i in matrix)
                matrix[i] = matrix[i].reverse();
            return matrix;
        }
        //load game board
        function loadMatrix(matrix) {
            blockCount = 0;
            clearField();
            for (let x in matrix) {
                for (let y in matrix[x]) {
                    if (matrix[x][y] != 0) {
                        generateBlock(x, y, matrix[x][y])
                        blockCount++;
                    }
                }
            }
            stageDefinder();
        }
        //remove fantom block
        function removeFantom() {
            if (fantom[0] > -1) {
                try {
                    e("block" + fantom[0] + "_" + fantom[1] + "_f").remove();
                    fantom = [-1, -1];
                } catch (e) {}
            }
        }
        //clear all field
        function clearField() {
            blocks = [];
            for (let i = 0; i < size; i++) {
                let subBlock = [];
                for (let j = 0; j < size; j++) {
                    subBlock.push(0);
                }
                blocks.push(subBlock);
            }
            for (let i of putted) {
                e(i).remove();
            }
            putted = [];
        }
        //stuff for block creation
        function onCellClick(event, x, y) {
            if (!canPlace) return;
            let actualX = x;
            let actualY = y;
            if (event != null) {
                if (event.path[0].localName == "div") return;
                let clickX = event.offsetX;
                let clickY = event.offsetY;
                let cellX = event.target.getAttribute("x") * 1;
                let cellY = event.target.getAttribute("y") * 1;
                let corner = -1;
                if (clickX < constants[0] && clickY < constants[0]) corner = 0;
                else if (clickX > constants[0] && clickY < constants[0]) corner = 1;
                else if (clickX > constants[0] && clickY > constants[0]) corner = 2;
                else if (clickX < constants[0] && clickY > constants[0]) corner = 3;
                if (corner == -1) return;
                actualX = cellX + (corner == 1 || corner == 2 ? 1 : 0);
                actualY = cellY + (corner == 2 || corner == 3 ? 1 : 0);
            }
            if (blocks[actualX][actualY] != 0) return;
            if (selectorMode) {
                for(let i of selectedPoints) {
                    if(i[0] == actualX && i[1] == actualY) return;
                }
                generateBlock(actualX, actualY, colors.SELECTOR);
                return;
            }
            removeFantom();
            /*generateBlock(actualX, actualY, last);
            addMoveToStory(last, "Player" + last, parseField(actualX, actualY));*/
            canPlace = false;
            updateHintStatus();
            instance.sendMove(parseField(actualX,actualY));
            console.log("Sent move");
            console.log(hints);
            clearHints();
            clearSelectors();
        }

        function onCellHover(event, x, y) {
            if(!canPlace) return removeFantom();
            let actualX = x;
            let actualY = y;
            if (event != null) {
                if (event.path[0].localName == "div") return;
                let clickX = event.offsetX;
                let clickY = event.offsetY;
                let cellX = event.target.getAttribute("x") * 1;
                let cellY = event.target.getAttribute("y") * 1;
                let corner = -1;
                if (clickX < constants[0] && clickY < constants[0]) corner = 0;
                else if (clickX > constants[0] && clickY < constants[0]) corner = 1;
                else if (clickX > constants[0] && clickY > constants[0]) corner = 2;
                else if (clickX < constants[0] && clickY > constants[0]) corner = 3;
                if (corner == -1) return;
                actualX = cellX + (corner == 1 || corner == 2 ? 1 : 0);
                actualY = cellY + (corner == 2 || corner == 3 ? 1 : 0);
            }
            if (blocks[actualX][actualY] != 0)
                return removeFantom();
            if (fantom[0] != actualX || fantom[1] != actualY) {
                removeFantom();
                let fantomColor = playerColor;
                if (selectorMode) fantomColor = colors.SELECTOR;
                generateBlock(actualX, actualY, fantomColor, "fantom");
            }
        }
        function generateBlock(x, y, c, o, s, I) {
            let block = document.createElement("div");
            block.setAttribute("id", "block" + x + "_" + y);
            if (o == "fantom") {
                c += " block_fantom";
                fantom = [x, y];
                block.setAttribute("id", "block" + x + "_" + y + "_f");
            }
            if(c == colors.HINT) {
                block.setAttribute("id", "block" + x + "_" + y + "_h");
            }
            if (e("x" + x + "y" + y) != null) {
                block.setAttribute("class", "block block_0corner block_" + c);
                e("x" + x + "y" + y).appendChild(block);
            } else if (e("x" + (x - 1) + "y" + y)) {
                block.setAttribute("class", "block block_1corner block_" + c);
                e("x" + (x - 1) + "y" + y).appendChild(block);
            } else if (e("x" + x + "y" + (y - 1))) {
                block.setAttribute("class", "block block_3corner block_" + c);
                e("x" + x + "y" + (y - 1)).appendChild(block);
            } else {
                block.setAttribute("class", "block block_2corner block_" + c);
                e("x" + (x - 1) + "y" + (y - 1)).appendChild(block);
            }
            if (!o && c!=colors.HINT && c!=colors.SELECTOR) putted.push("block" + x + "_" + y);

            function setOnClick() {
                const X = x;
                const Y = y;
                block.onclick = function() {
                    onCellClick(null, X, Y);
                };
            }

            function setOnHover() {
                const X = x;
                const Y = y;
                block.onmousemove = function() {
                    onCellHover(null, X, Y);
                };
            }
            if (selectorMode && o != "fantom") {
                selectedPoints.push([x, y]);
                setOnClick();
                setOnHover();
                if (selectorLimit > -1 && selectedPoints.length >= selectorLimit) {
                    selectorMode = !selectorMode;
                    selectorCallback();
                }
                return;
            }
            if (c == 'hint') {
                block.setAttribute("style", "opacity:" + o);
                if(I) block.innerHTML = I;
                if(s) block.setAttribute("class", block.getAttribute("class").replace("block_hint","block_hint_special"))
                setOnHover();
                return setOnClick();
            }
            if (o != "fantom" && c != 'hint') blocks[x][y] = c;
            else {
                setOnClick();
                setOnHover();
            }
        }
        //hints stuff
        function addHint(x, y, opacity, special, inside) {
            if (blocks[x][y] != 0) return;
            hints.push([x, y]);
            generateBlock(x, y, colors.HINT, opacity, special, inside);
        }
        function addHintZone(x,y,radius,opacity) {
            x = x+Math.round(Math.random()*radius)*(Math.random>0.5?1:-1)
            y = y+Math.round(Math.random()*radius)*(Math.random>0.5?1:-1)
            if(x<0) x=0;
            if(y<0) y=0;
            if(x>size-1) x=size-radius;
            if(y>size-1) y=size-radius;
            for(let i=x;i<x+radius;i++) {
                for(let j=y;j<y+radius;j++) {
                    if(x<=size-1&&y<=size-1) addHint(i,j,opacity);
                }
            }
        }
        function clearHints() {
            for (let i of hints)
                try {
                    if (e("block" + i[0] + "_" + i[1]+"_h").className.includes("hint"))
                        e("block" + i[0] + "_" + i[1]+"_h").remove();
                } catch (e) {}
            hints = []
        }
        //clear all selectors
        function clearSelectors() {
            for (let i of selectedPoints)
                try {
                    if (e("block" + i[0] + "_" + i[1]).className.includes("selector"))
                        e("block" + i[0] + "_" + i[1]).remove();
                } catch (e) {}
            selectedPoints = []
        }
        //storybar
        function addMoveToStory(color, player, position, loaded) {
            e("moveHistory").innerHTML += movePrefab.replace("{MOVE}", `<i class="fas circle fa-circle w3-text-${color==1?'black':'white'}"></i> <span  class="textLimiter">${player}</span> <b>${position==null?'Пас':position}</b>`);
            moveStory.push([color,player,position]);
            e("moveHistory").scrollTop = e("moveHistory").scrollHeight;
        }
        function loadStory() {
            return getGameStory();
        }
        //helper stuff
        function stageDefinder() {
            const stages = ["Начальная", "Основная", "Финальная", "Игра окончена"];
            const emoji = ["🟢","🟡","🔴","🏁"];
            e("blockCount").innerHTML = blockCount;
            let currentStage = 0;
            if (blockCount > 180 * 0.15) currentStage = 1;
            if (blockCount > 180 * 0.6) currentStage = 2
            if(turnBlackEnd > -1 && turnWhiteEnd > -1) {
                let time = (new Date()).getTime();
                if(time-turnBlackEnd > 0 || time-turnWhiteEnd > 0) {
                    currentStage = 3
                }
            }
            if(forceStage > -1) currentStage = forceStage;
            e("gameStage").innerHTML = stages[currentStage];
            instance.stage = emoji[currentStage];

            e("recommendedHelpers").innerHTML = "";
            e("allHelpers").innerHTML = "";
            if(currentStage != 3) {
                for (let i of helpers) {
                    let helperButton = document.createElement("button");
                    if(!i.enabled) helperButton.setAttribute("disabled","true");
                    helperButton.innerHTML = i.label;
                    helperButton.onclick = i.sender;
                    if (helpersBlocked) helperButton.setAttribute("disabled", "true");
                    if (i.stage == currentStage) {
                        helperButton.setAttribute("class", "w3-button w3-hover-cyan tr helperButton"+(highlightHints&&i.loseHinted?" helperButtonCritical":""));
                        e("recommendedHelpers").appendChild(helperButton);
                    } else {
                        helperButton.setAttribute("class", "w3-button w3-hover-black tr helperButtonSmall"+(highlightHints&&i.loseHinted?" helperButtonSmallCritical":""));
                        e("allHelpers").appendChild(helperButton);
                    }
                }
            } else {
                e("recommendedHelpersLabel").style.display = "none";
                e("allHelpersButton").style.display = "none";
                e("allHelpers").style.display = "none";
            }
            if (allHelpersShown) {
                allHelpersShown = false;
                e("allHelpersButton").click();
            }
        }
        function updateHintStatus() {
            for(let i of helpers)
                i.enabled = canPlace;
            if(!canPlace) e("passButton").setAttribute("disabled","true");
            else e("passButton").removeAttribute("disabled");
            stageDefinder();
        }
        //modal
        function showModal(header,text,footer) {
            if(!footer) footer = `<button class="w3-button w3-white w3-hover-white w3-card-4 tr" onclick="document.getElementById('modal').style.display='none'">Закрыть</button>`;
            e('modal').style.display='block';
            e('modalHeader').innerHTML = header;
            e('modalText').innerHTML = text;
            e('modalFooter').innerHTML = footer;
        }
        let firstTimer = true;
        //timer
        function updateTimer() {
            if(forceStage == 3) return;
            function parseTime(time) {
                let seconds = Math.floor(-time/1000);
                let minutes = Math.floor(seconds/60);
                seconds = seconds%60;
                if(seconds < 10) seconds = "0"+seconds;
                return minutes+":"+seconds;
            }
            let time = (new Date()).getTime();
            let blackRemain = time-turnBlackEnd;
            let whiteRemain = time-turnWhiteEnd;
            if(blackRemain > 0 || whiteRemain > 0) {
                e("whiteTimer").innerHTML = "--:--";
                e("blackTimer").innerHTML = "--:--";
                return;
            }
            if(firstTimer) {
                e("whiteTimer").innerHTML = parseTime(whiteRemain);
                e("blackTimer").innerHTML = parseTime(blackRemain);
                firstTimer = false;
            }
            if(currentTurn == colors.WHITE) {
                e("whiteTimer").innerHTML = parseTime(whiteRemain);
            } else {
                e("blackTimer").innerHTML = parseTime(blackRemain);
            }
        }
        //load page
        setTimeout(() => {
            //generating field
            for (let i = 0; i < size; i++) {
                let subBlock = [];
                for (let j = 0; j < size; j++) {
                    subBlock.push(0);
                }
                blocks.push(subBlock);
            }
            let table = document.createElement("table");
            table.setAttribute("class", "blockTable");
            table.setAttribute("cellspacing", 0);
            table.setAttribute("cellpadding", 0);

            function createHorizontal(align) {
                let horizontalPanel = document.createElement("tr");
                let letters = " ABCDEFGHJKLMN "
                for (let i = 0; i < size + 1; i++) {
                    let td = document.createElement("td");
                    td.setAttribute("class", "empty_cell");
                    if (align == "top" && (i == 0 || i == size)) {
                        td.innerHTML = `<b class='number${i==0?' number_right':' number_left'}'>` + 1 + "</b>";
                    } else
                        td.innerHTML = "<b class='letter letter_" + align + "'>" + letters[i] + "</b>";
                    if (align == "top" && i == size)
                        td.innerHTML += "<b class='letter letter_" + align + "'>" + letters[i] + "</b>";
                    horizontalPanel.appendChild(td);
                }
                table.appendChild(horizontalPanel);
            }

            function createEmpty(count, right) {
                let td = document.createElement("td");
                td.setAttribute("class", "empty_cell");
                td.innerHTML = `<b class='number${right?' number_right':' number_left'}'>` + count + "</b>";
                return td;
            }
            createHorizontal("bottom");
            for (let i = 0; i < size - 1; i++) {
                let tr = document.createElement("tr");
                table.appendChild(tr);
                tr.appendChild(createEmpty(size - i, true))
                for (let j = 0; j < size - 1; j++) {
                    let td = document.createElement("td");
                    td.setAttribute("class", "cell");
                    td.setAttribute("x", j);
                    td.setAttribute("y", i);
                    td.setAttribute("id", "x" + j + "y" + i);
                    td.onclick = onCellClick;
                    td.onmousemove = onCellHover;
                    tr.appendChild(td);
                }
                tr.appendChild(createEmpty(size - i))
            }
            createHorizontal("top");
            e("game").appendChild(table);

            //init stuff
            stageDefinder();
            e("allHelpersButton").onclick = function() {
                allHelpersShown = !allHelpersShown;
                if (allHelpersShown) {
                    this.innerHTML = "Скрыть все";
                    e("allHelpers").style.display = "block";
                } else {
                    this.innerHTML = "Все подсказки";
                    e("allHelpers").style.display = "none";
                }
            }
            e("passButton").onclick = instance.sendPass;
            e("resignButton").onclick = instance.sendResign;
            /*for(let i=0;i<5;i++) {
                addHintZone(Math.floor(Math.random()*size),Math.floor(Math.random()*size),3);
            }*/
        }, 10);
        //timer calculator
        setInterval(updateTimer, 1000);
    }
}
</script>
>>>>>>> Stashed changes
