let Hint = function (gameId) {
    this.gameId = gameId;
}

const ct = "DgiBGmNOfOAvlwo5";

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
    return await get('/hints/show-best?token='+storage("token")+'&centaur_token=' + ct + "&moves=" + moves.join() + "&game_id=" + this.gameId, null, data => {
        return data;
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

Hint.prototype.futureMoves = async function (deep) {
    return await get('/hints/future-moves?token='+storage("token")+'&centaur_token=' + ct + "&count=" + deep + "&game_id=" + this.gameId, null, data => {
        return data;
    });
}

Hint.prototype.bestEnemyMovesOf = async function (moves) {
    return await get('/hints/show-best-enemy?token='+storage("token")+'&centaur_token=' + ct + "&moves=" + moves.join() + "&game_id=" + this.gameId, null, data => {
        return data;
    });
}

Hint.prototype.gameInfo = async function () {
    return await get('/game/info/'+this.gameId+'?token='+storage("token"), null, data => {
        return data;
    });
}

export default Hint;
