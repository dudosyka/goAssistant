let Hint = function (gameId) {
    this.gameId = gameId;
}

const ct = "DgiBGmNOfOAvlwo5";

Hint.prototype.get = function () {}

Hint.prototype.firstStage = function () {
    return {};
}

Hint.prototype.midStage = function () {
    return {};
}

Hint.prototype.lateGame = function () {
    return {};
}

Hint.prototype.bestMoves = async function (count) {
    return await get('/hints/best-moves?token='+storage("token")+'&centaur_token=' + ct + "&count=" + count + "&game_id=" + this.gameId, null, data => {
        return data.data.hint.map(el => {
            return el.move;
        });
    });
}

Hint.prototype.bestMovesEnemy = async function (count) {
    return await get('/hints/best-moves-enemy?token='+storage("token")+'&centaur_token=' + ct + "&count=" + count + "&game_id=" + this.gameId, null, data => {
        return data.data.hint.map(el => {
            return el.move;
        });
    });
}

Hint.prototype.bestMovesOf = async function (moves) {
    return await get('/hints/best-moves-enemy?token='+storage("token")+'&centaur_token=' + ct + "&moves=" + moves.join() + "&game_id=" + this.gameId, null, data => {
        return data.data.hint.map(el => {
            return el.move;
        });
    });
}

Hint.prototype.simpleRequest = async function (url) {
    return await get('/hints/'+ url +'?token='+storage("token")+'&centaur_token=' + ct + "&game_id=" + this.gameId, null, data => {
        return data.data.hint;
    });
}

Hint.prototype.superiority = async function () {
    return await this.simpleRequest('superiority');
}

Hint.prototype.winner = async function () {
    return await this.simpleRequest('winner');
}

Hint.prototype.heatmap = async function () {
    return await this.simpleRequest('heatmap');
}

Hint.prototype.fullHeatmap = async function () {
    return await this.simpleRequest('heatmap-full');
}

export default Hint;
