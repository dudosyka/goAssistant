<template>
    <div class="home">
        <div style="text-align: center;">
            <div id="game"></div><br>
        </div>

        <div class="w3-sidebar w3-bar-block w3-white" style="width:270px;left:0;top:0px;line-height:2;overflow:hidden;">
            <div class="w3-container w3-card-2 w3-center" style="padding: 10px">GoAssistant</div>
			<div class="w3-center">Режим просмотра игры</div>
			<button class="w3-button w3-hover-cyan tr helperButton" onclick="window.location.href = '/passport'">Вернуться в профиль</button>
            <div class="bar" style="overflow:auto;padding-bottom:40px">
              <div class="section">
                <div>&#9899; <b id="blackPlayerName" class="textLimiter">Загрузка...</b></div>
                <div>&#9898; <b id="whitePlayerName" class="textLimiter">Загрузка...</b></div>
              </div>

              <div class="section">
                <span class="opposite"><div>Камней на поле: </div><b id="blockCount">0</b></span>
                <div style="margin-top:10px;margin-bottom:10px">
                    <div>Потрачено на подсказки: </div>
                    <span class="opposite"><div>&#9899; <b id="blackHints">0</b> очков</div><div><b id="whiteHints">0</b> очков &#9898;</div></span>
                </div>
                <span class="opposite"><div>{{stage}} Стадия игры: </div><b id="gameStage">N/A</b></span>
              </div>
            </div>
        </div>

        <div class="w3-sidebar w3-bar-block w3-white" style="width:250px;right:0;top:0px;overflow:hidden;">
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
	export default {
		name: "GameHistory",
		data() {
			return {
				game: null,
				client: null,
				stage: '🟢',
				moveIndex: 0
			};
		},
		methods: {
			async loadGame(gameId) {
				return get('/game/info/' + gameId + "?token=" + storage('token'), null, data => {
					return data;
				},err=>{
					window.location.href = '/passport';
				});
			},
		},
		async created() {
			let instance = this;
			let gameId = localStorage.getItem("watchGameId");
			let gameData = await this.loadGame(gameId);
			let gameLog = JSON.parse(gameData.data.log);
			console.log(gameData);


			let size = 13;
			let putted = [];
			let blocks = [];
			let blockCount = 0;

			let blackPlayerName = gameData.data.player_1.nickname;
			let whitePlayerName = gameData.data.player_2.nickname;

			const colors = {
				BLACK: 1,
				WHITE: -1,
				HINT: 'hint',
				SELECTOR: 'selector'
			};
			const movePrefab = `<div class="w3-bar-item w3-card-4 main_color w3-hover-purple beetwin clickableMove tr" id="move{INDEX}">{MOVE}</div>`;

			function e(id) { return document.getElementById(id); }
			function parseField(x, y) {
				const xAlign = "ABCDEFGHJKLMN";
				return xAlign[x] + (13 - y);
			}
			function parseXY(field) {
				const xAlign = "ABCDEFGHJKLMN";
				return [xAlign.indexOf(field[0]),(13-field.slice(1,3))];
			}
			function normalizeMatrix(matrix) {
				for(let i in matrix)
					matrix[i] = matrix[i].reverse();
				return matrix;
			}
			for(let i in gameLog) {
				gameLog[i] = normalizeMatrix(gameLog[i]);
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
			function getGameStory() {
				let result = gameData;
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
			getGameStory();
			let lastIndex = -1;
			function setPosition(index) {
				loadMatrix(gameLog[index]);
				if(lastIndex > -1) e("move"+lastIndex).setAttribute("class","w3-bar-item w3-card-4 main_color w3-hover-purple beetwin clickableMove tr")
				e("move"+index).setAttribute("class","w3-bar-item w3-card-4 w3-blue w3-hover-blue beetwin clickableMove tr")
				lastIndex = index;
			}
			function addMoveToStory(color, player, position, loaded) {
				let element = document.createElement('span');
				element.innerHTML = movePrefab.replace("{MOVE}", `<i class="fas circle fa-circle w3-text-${color==1?'black':'white'}"></i> <span  class="textLimiter">${player}</span> <b>${position==null?'Пас':position}</b>`).replace("{INDEX}",instance.moveIndex);
				function setOnclick(index) {
					const constIndex = index*1;
					element.onclick = function() {
						setPosition(constIndex);
					}
				}
				setOnclick(instance.moveIndex);
				instance.moveIndex++;
				e("moveHistory").appendChild(element);
				e("moveHistory").scrollTop = e("moveHistory").scrollHeight;
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
				putted.push("block" + x + "_" + y);
				blocks[x][y] = c;
			}
			function stageDefinder() {
				const stages = ["Начальная", "Основная", "Финальная", "Игра окончена"];
				const emoji = ["🟢","🟡","🔴","🏁"];
				e("blockCount").innerHTML = blockCount;
				let currentStage = 0;
				if (blockCount > 180 * 0.15) currentStage = 1;
				if (blockCount > 180 * 0.6) currentStage = 2;
				e("gameStage").innerHTML = stages[currentStage];
				instance.stage = emoji[currentStage];
			}
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
						tr.appendChild(td);
					}
					tr.appendChild(createEmpty(size - i))
				}
				createHorizontal("top");
				e("game").appendChild(table);

				//init stuff
				stageDefinder();
				e("blackPlayerName").innerHTML = gameData.data.player_1.nickname;
				e("whitePlayerName").innerHTML = gameData.data.player_2.nickname;
			}, 10);
		}
	}
</script>
