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

Hint.prototype.heatmapQuarter = async function (quarter) {
    return await get('/hints/heatmap-quarter?token='+storage("token")+'&centaur_token=' + ct + "&quarter=" + quarter + "&game_id=" + this.gameId, null, data => {
        return data.data.hint;
    });
}

Hint.prototype.heatmapQuarters = async function (quarters) {
    return await get('/hints/heatmap-two-quarters?token='+storage("token")+'&centaur_token=' + ct + "&quarters=" + quarters.join() + "&game_id=" + this.gameId, null, data => {
        return data.data.hint;
    });
}

Hint.prototype.heatmapBestZone = async function (is_quarters) {
    return await get('/hints/heatmap-best-move-zone?token='+storage("token")+'&centaur_token=' + ct + "&is_quarters=" + is_quarters + "&game_id=" + this.gameId, null, data => {
        return data.data.hint;
    });
}

Hint.prototype.heatmapEnemyBestZone = async function (is_quarters) {
    return await get('/hints/heatmap-best-enemy-move-zone?token='+storage("token")+'&centaur_token=' + ct + "&is_quarters=" + is_quarters + "&game_id=" + this.gameId, null, data => {
        return data.data.hint;
    });
}


export default Hint;
