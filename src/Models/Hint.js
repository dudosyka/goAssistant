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
/*
4 лучших хода ++
Зоны 2 лучших ходов ++
Зона лучшего хода ++
*/

Hint.prototype.bestMovesEnemy = async function (count) {
    return await get('/hints/best-moves-enemy?token='+storage("token")+'&centaur_token=' + ct + "&count=" + count + "&game_id=" + this.gameId, null, data => {
        return data.data.hint.map(el => {
            return el.move;
        });
    });
}
/*
Самая опасная зона ++
Зоны требующие защиту ++
*/

Hint.prototype.bestMovesOf = async function (moves) {
    return await get('/hints/show-best?token='+storage("token")+'&centaur_token=' + ct + "&moves=" + moves.join() + "&game_id=" + this.gameId, null, data => {
        return data;
    });
}
/*
Лучший ход из 4 ++
*/

Hint.prototype.simpleRequest = async function (url) {
    return await get('/hints/'+ url +'?token='+storage("token")+'&centaur_token=' + ct + "&game_id=" + this.gameId, null, data => {
        return data.data.hint;
    });
}

Hint.prototype.superiority = async function () {
    return await this.simpleRequest('superiority');
}
/*
Перевес в очках ++
//Подсветить прогноз игры и другие сильные подсказки в случае проигрышной ситуации?
*/

Hint.prototype.fullHeatmap = async function () {
    return await this.simpleRequest('heatmap-full');
}
/*
Тепловая карта доски ++
*/

Hint.prototype.heatmapQuarter = async function (quarter) {
    return await get('/hints/heatmap-quarter?token='+storage("token")+'&centaur_token=' + ct + "&quarter=" + quarter + "&game_id=" + this.gameId, null, data => {
        return data.data.hint;
    });
}
/*
Тепловая карта зоны ++
*/

Hint.prototype.heatmapQuarters = async function (quarters) {
    return await get('/hints/heatmap-two-quarters?token='+storage("token")+'&centaur_token=' + ct + "&quarters=" + quarters.join() + "&game_id=" + this.gameId, null, data => {
        return data.data.hint;
    });
}
/*
Тепловая карта 2 зон ++
*/

Hint.prototype.heatmapBestZone = async function (is_quarters) {
    return await get('/hints/heatmap-best-move-zone?token='+storage("token")+'&centaur_token=' + ct + "&is_quarters=" + is_quarters + "&game_id=" + this.gameId, null, data => {
        return data.data.hint;
    });
}
/*
В какой четверти играть ++
*/

Hint.prototype.heatmapEnemyBestZone = async function (is_quarters) {
    return await get('/hints/heatmap-best-enemy-move-zone?token='+storage("token")+'&centaur_token=' + ct + "&is_quarters=" + is_quarters + "&game_id=" + this.gameId, null, data => {
        return data.data.hint;
    });
}
/*
Четверть игры противника ++
*/

Hint.prototype.futureMoves = async function (deep) {
    return await get('/hints/future-moves?token='+storage("token")+'&centaur_token=' + ct + "&count=" + deep + "&game_id=" + this.gameId, null, data => {
        return data;
    });
}
/*
Прогноз игры 10 ходов ++
Прогноз игры 6 ходов ++
*/


export default Hint;
