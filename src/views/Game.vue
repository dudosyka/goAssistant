<template>
    <div class="home">
        <div style="text-align: center;">
            <div id="game"></div><br>
            <button class="w3-button w3-white w3-hover-white tr" id="passButton" style="margin-right:10px;width:100px">Пас</button>
            <button class="w3-button w3-white w3-hover-white tr" id="giveUpButton" style="width:100px">Сдаться</button><br>
            <span id="specialMessages"></span>
        </div>
        <div class="w3-sidebar w3-bar-block w3-white" style="width:250px;left:0;top:0px;line-height:2">
            <div class="w3-container w3-card-2 w3-center" style="padding: 10px">GoAssistant</div>
            <div style="overflow: auto;max-height: calc(100% - 25px);padding:10px;font-size:13px">
                <span>Камней на поле: <b id="blockCount">0</b></span><br>
                <span>Стадия игры: <b id="gameStage">N/A</b></span><br>
                <span>Рекомендуемые подсказки:</span>
                <div id="recommendedHelpers">
                </div><br>
                <button class="w3-button main_color w3-hover-black tr helperButton" id="allHelpersButton">Все подсказки</button>
                <div id="allHelpers" style="display: none">
                </div>
            </div>
        </div>
        <div class="w3-sidebar w3-bar-block w3-white" style="width:250px;right:0;top:0px;overflow:hidden;">    
            <div class="w3-container w3-card-4 w3-center" style="padding: 10px">История ходов</div>    
            <div id="moveHistory" style="overflow: auto;max-height: calc(100% - 25px);"></div>
        </div>
    </div>
</template>

<style>
    @import "../assets/styles/board.css";
    @import "../assets/styles/side.css";
    @import "../assets/styles/pallete.css";
</style>

<script>
export default {
    name: 'Home',
    components: {},
    data() {
        return {
            game: null
        }
    },
    methods: {
        async loadGame(gameId) {
            return get('/game/info/' + storage('curGameId') + "?token=" + storage('token'), null, data => {
                return data;
            });
        },
        
        move(type) {
            client.send(JSON.stringify([
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
            client.send(JSON.stringify([
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
            move('pass');
        },
        sendResign() {
            move('resign');
        }
    },
    async created() {
        this.client = new W3CWebSocket('ws://172.104.137.176:41239');
        this.client.onopen = function () {
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
        this.client.onmessage = function (event) {
            let data = JSON.parse(event.data);
            console.log(data);
        }
        let data = await this.loadGame();
        console.log(data);

        let canPlace = true;
        let last = -1;
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

        const colors = {
            BLACK: 1,
            WHITE: -1,
            HINT: 'hint',
            SELECTOR: 'selector'
        };
        const movePrefab = `<div class="w3-bar-item w3-card-4 main_color moveDiv">{MOVE}</div>`;

        class Helper {
            constructor(label, stage, sender) {
                this.label = label;
                this.stage = stage;
                this.sender = sender;
            }
        };
        let helpers = [
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
        ];
        let helpersBlocked = false;
        let allHelpersShown = false;

        function e(id) { return document.getElementById(id); }
        function parseField(x, y) {
            const xAlign = "ABCDEFGHJKLMN";
            return xAlign[x] + (13 - y);
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
            for (i of putted) {
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
            if (last == colors.BLACK) last = colors.WHITE;
            else last = colors.BLACK;
            removeFantom();
            generateBlock(actualX, actualY, last);
            addMoveToStory(last, "Player" + last, parseField(actualX, actualY));
        }

        function onCellHover(event, x, y) {
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
                let fantomColor = last == colors.BLACK ? colors.WHITE : colors.BLACK;
                if (selectorMode) fantomColor = colors.SELECTOR;
                generateBlock(actualX, actualY, fantomColor, "fantom");
            }
        }
        function generateBlock(x, y, c, o) {
            let block = document.createElement("div");
            block.setAttribute("id", "block" + x + "_" + y);
            if (o == "fantom") {
                c += " block_fantom";
                fantom = [x, y];
                block.setAttribute("id", "block" + x + "_" + y + "_f");
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
            if (!o) putted.push("block" + x + "_" + y);

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
                setOnHover();
                return setOnClick();
            }
            if (o != "fantom") blocks[x][y] = c;
            else {
                setOnClick();
                setOnHover();
            }
        }
        //hints stuff
        function addHint(x, y, opacity) {
            if (blocks[x][y] != 0) return;
            hints.push([x, y]);
            generateBlock(x, y, colors.HINT, opacity);
        }
        function clearHints() {
            for (let i of hints)
                try {
                    if (e("block" + i[0] + "_" + i[1]).className.includes("hint"))
                        e("block" + i[0] + "_" + i[1]).remove();
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
            hints = []
        }
        //sidebar
        function addMoveToStory(color, player, position) {
            e("moveHistory").innerHTML += movePrefab.replace("{MOVE}", `<i class="fas circle fa-circle w3-text-${color==1?'black':'white'}"></i> <span>${player}</span> <b>${position}</b>`);
        }
        //parse incoming data
        function loadTurn(data) {
            data = JSON.parse(data);
            loadMatrix(data.payload.currentMap);
            let color = colors.BLACK;
            if (data.payload.turn == "black") color = colors.WHITE;
            addMoveToStory(color, data.payload.move.split("(")[0], data.payload.place);
        }
        //helper stuff
        function stageDefinder() {
            const stages = ["Начальная", "Основная", "Финальная"];
            e("blockCount").innerHTML = blockCount;
            let currentStage = 0;
            if (blockCount > 15) currentStage = 1;
            if (blockCount > size * size * 0.7) currentStage = 2
            e("gameStage").innerHTML = stages[currentStage];

            e("recommendedHelpers").innerHTML = "";
            e("allHelpers").innerHTML = "";

            for (let i of helpers) {
                let helperButton = document.createElement("button");
                helperButton.innerHTML = i.label;
                helperButton.onclick = i.sender;
                if (helpersBlocked) helperButton.setAttribute("disabled", "true")
                if (i.stage == currentStage) {
                    helperButton.setAttribute("class", "w3-button w3-purple w3-hover-cyan tr helperButton");
                    e("recommendedHelpers").appendChild(helperButton);
                } else {
                    helperButton.setAttribute("class", "w3-button w3-gray w3-hover-black tr helperButtonSmall");
                    e("allHelpers").appendChild(helperButton);
                }
            }
            if (allHelpersShown) {
                allHelpersShown = false;
                e("allHelpersButton").click();
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
        }, 10);
    }
}
</script>
>>>>>>> Stashed changes
