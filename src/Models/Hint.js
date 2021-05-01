let Hint = function () {  }

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

Hint.prototype.quarter = function () {
    get('/hints/best-moves', { token: storage('token'), centaur_token: ct, count: 1, game_id: })
}

module.export = Hint;
