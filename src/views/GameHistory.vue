<template>
    <div class="home">
        <div style="text-align: center;">
            <div id="game" class="gobanTexture"></div><br class="ns">
			<h2 class="w3-text-white">
				<button class="w3-button tr w3-medium w3-hover-aqua" id="lButton">&larr;</button>
				{{localeData.moves}}
				<button class="w3-button tr w3-medium w3-hover-aqua" id="rButton">&rarr;</button>
			</h2>
			<div id="moveStoryShort"></div>
        </div>

        <div class="w3-sidebar w3-bar-block w3-white" style="width:270px;left:0;top:0px;line-height:2;overflow:hidden;">
            <div class="w3-container w3-card-2 w3-center" style="padding: 10px">GoAssistant</div>
			<div class="w3-center">{{localeData.viewMode}}</div>
			<button class="w3-button w3-hover-cyan tr helperButton" onclick="window.location.href = '/passport'">{{localeData.backToProfile}}</button>
            <div class="bar" style="overflow:auto;padding-bottom:40px">
              <div class="section">
                <div>&#9899; <b id="blackPlayerName" class="textLimiter">{{localeData.loading}}</b></div>
                <div>&#9898; <b id="whitePlayerName" class="textLimiter">{{localeData.loading}}</b></div>
              </div>

              <div class="section">
                <span class="opposite"><div>{{localeData.onBoard}}: </div><b id="blockCount">0</b></span>
                <span class="opposite"><div>{{stage}} {{localeData.gameStage}} </div><b id="gameStage">N/A</b></span>
              </div>
            </div>
        </div>
		<div style="right:0;top:0;position:absolute;">
            <button class="w3-button w3-card-4 tr w3-text-white w3-large" onclick="document.getElementById('gameStoryBar').style.display = 'block'">☰ {{localeData.historyShort}}</button>
        </div>
        <div class="w3-sidebar w3-bar-block w3-white w3-animate-right" style="width:270px;right:0;top:0px;overflow:hidden;display:none" id="gameStoryBar">
            <div class="w3-container w3-card-4 w3-center" style="padding: 10px">
                {{localeData.history}}
                <span onclick="document.getElementById('gameStoryBar').style.display='none'" class="w3-button w3-display-topright tr">&times;</span>
            </div>
            <div id="moveHistory" style="overflow: auto;max-height: calc(100% - 25px);padding-bottom:18px;"></div>
        </div>

        <div id="modal" class="w3-modal">
            <div class="w3-modal-content w3-animate-top w3-card-4">
                <header class="w3-container w3-purple">
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
	import * as Localization from "../Models/Localization";
	export default {
		name: "GameHistory",
		data() {
			return {
				game: null,
				client: null,
				stage: '🟢',
				moveIndex: 0,
				locale: null,
				localeData: {
					loading: "",
					onBoard: "",
					gameStage: "",
					historyShort: "",
					history: "",

					moves: "",
					viewMode: "",
					backToProfile: ""
				}
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
			//localization load
			if(localStorage.getItem("lang") == null) localStorage.setItem("lang","ru")
        	instance.locale = new Localization.default(localStorage.getItem("lang"));
			let lang = instance.locale.language;

			this.localeData.loading = lang.loading;
			this.localeData.onBoard = lang.onBoard;
			this.localeData.gameStage = lang.gameStage.label;
			this.localeData.historyShort = lang.historyShort;
			this.localeData.history = lang.history;

			this.localeData.moves = lang.moves;
			this.localeData.viewMode = lang.viewMode;
			this.localeData.backToProfile = lang.backToProfile;

			//main block
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
				if(lastIndex > -1) {
					e("move"+lastIndex).setAttribute("class","w3-bar-item w3-card-4 main_color w3-hover-purple beetwin clickableMove tr");
					e("moves"+lastIndex).setAttribute("class",e("moves"+lastIndex).getAttribute("class").replace(" clickedStoryBlock",""));
				}
				e("move"+index).setAttribute("class","w3-bar-item w3-card-4 w3-blue w3-hover-blue beetwin clickableMove tr");
				e("moves"+index).setAttribute("class",e("moves"+index).getAttribute("class")+" clickedStoryBlock");
				lastIndex = index;
			}
			function addMoveToStory(color, player, position, loaded) {
				let element = document.createElement('span');
				let shortElement = document.createElement('div');
				element.innerHTML = movePrefab.replace("{MOVE}", `<i class="fas circle fa-circle w3-text-${color==1?'black':'white'}"></i> <span  class="textLimiter">${player}</span> <b>${position==null?lang.pass:position}</b>`).replace("{INDEX}",position==null?"-2":instance.moveIndex);
				function setOnclick(index) {
					const constIndex = index*1;
					element.onclick = function() {
						setPosition(constIndex);
					}
					shortElement.onclick = function() {
						setPosition(constIndex);
					}
				}
				if(position!=null) {
					shortElement.setAttribute('class', 'storyBlock tr block_'+color);
					shortElement.setAttribute('id', "moves"+instance.moveIndex);
					shortElement.innerHTML = instance.moveIndex*1+1;
					setOnclick(instance.moveIndex);
					e("moveStoryShort").appendChild(shortElement);
					instance.moveIndex++;
				} else {
					element.innerHTML = element.innerHTML.replace("clickableMove ","").replace("w3-hover-purple ","");
				}
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
				const emoji = ["🟢","🟡","🔴","🏁"];
				e("blockCount").innerHTML = blockCount;
				let currentStage = 0;
				if (blockCount > 180 * 0.15) currentStage = 1;
				if (blockCount > 180 * 0.6) currentStage = 2;
				e("gameStage").innerHTML = lang.gameStage[currentStage];
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

				document.addEventListener("keydown", event => {
					if(event.keyCode == 39 || event.keyCode == 68) {
						e("rButton").click();
					} //right
					if(event.keyCode == 37 || event.keyCode == 65) {
						e("lButton").click();
					} //left
				});
				e("rButton").onclick = function() {
					if(lastIndex+1 >= gameLog.length) return;
					e("moveStoryShort").scrollLeft = lastIndex*40;
					setPosition(lastIndex+1);
				}
				e("lButton").onclick = function() {
					if(lastIndex-1 < 0) return;
					e("moveStoryShort").scrollLeft = (lastIndex-11)*40;
					setPosition(lastIndex-1);
				}
			}, 10);
		}
	}
</script>
