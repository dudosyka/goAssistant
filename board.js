let last = -1;
let constants = [
    20
]
function e(id) {return document.getElementById(id);}
function onCellClick(event,x,y) {
    let actualX = x;
    let actualY = y;
    if(event!=null) {
        if(event.path[0].localName == "div") return;
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
    if (last == colors.BLACK) last = colors.WHITE;
    else last = colors.BLACK;
    generateBlock(actualX, actualY, last);
}
function clearField() {
    blocks = [];
    for (i = 0; i < size; i++) {
        subBlock = [];
        for (j = 0; j < size; j++) {
            subBlock.push(0);
        }
        blocks.push(subBlock);
    }
    for (i of putted) {
        e(i).remove();
    }
    putted = [];
}
function generateBlock(x, y, c, o) {
    let block = document.createElement("div");
    block.setAttribute("id", "block" + x + "_" + y);
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
    if(c != 'hint')
        blocks[x][y] = c;
    else {
        block.setAttribute("style","opacity:"+o)
        function a() {
            const X = x;
            const Y = y;
            block.onclick = function() {
                onCellClick(null,X,Y);
            };
        }
        a();
    }
}
let size = 13;
let putted = [];
let blocks = [];
for (i = 0; i < size; i++) {
    subBlock = [];
    for (j = 0; j < size; j++) {
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
    for (i=0;i<size+1;i++) {
        let td = document.createElement("td");
        td.setAttribute("class", "empty_cell");
        if(align=="top"&&(i==0||i==size)) {
            td.innerHTML = `<b class='number${i==0?' number_right':' number_left'}'>`+1+"</b>";
        } else
            td.innerHTML = "<b class='letter letter_"+align+"'>"+letters[i]+"</b>";
        if(align=="top"&&i==size)
            td.innerHTML += "<b class='letter letter_"+align+"'>"+letters[i]+"</b>";
        horizontalPanel.appendChild(td);
    }
    table.appendChild(horizontalPanel);
}
function createEmpty(count, right) {
    let td = document.createElement("td");
    td.setAttribute("class", "empty_cell");
    td.innerHTML = `<b class='number${right?' number_right':' number_left'}'>`+count+"</b>";
    return td;
}
createHorizontal("bottom");
for (i = 0; i < size - 1; i++) {
    let tr = document.createElement("tr");
    table.appendChild(tr);
    tr.appendChild(createEmpty(size-i,true))
    for (j = 0; j < size - 1; j++) {
        let td = document.createElement("td");
        td.setAttribute("class", "cell");
        td.setAttribute("x", j);
        td.setAttribute("y", i);
        td.setAttribute("id", "x" + j + "y" + i);
        td.onclick = onCellClick;
        tr.appendChild(td);
    }
    tr.appendChild(createEmpty(size-i))
}
createHorizontal("top");
e("game").appendChild(table);
const colors = {
    BLACK: 1,
    WHITE: -1,
    HINT: 'hint'
};
class Player {
    constructor(name, rating) {
        this.name = name;
        this.rating = rating;
    }
}
class Move {
    constructor(color, x, y) {
        this.color = color;
        this.x = x;
        this.y = y;
    }
}

let players = [];
let moves = [];

function moveReplay(move) {
    e("currentMove").innerHTML = move;
    clearField();
    if (move == 0) return;
    for (var i = 0; i < move; i++) {
        generateBlock(moves[i].x, moves[i].y, moves[i].color);
    }
}
function loadGame() {
    e("currentMove").innerHTML = "0";
    e("maxMove").innerHTML = moves.length;
    e("p1name").innerHTML = players[0].name;
    e("p2name").innerHTML = players[1].name;
    e("moveSlider").setAttribute("max", moves.length);
}

function loadMatrix(matrix) {
    clearField();
    for(x in matrix) {
        for(y in matrix[x]) {
            if(matrix[x][y] != 0)
                generateBlock(x,y,matrix[x][y])
        }
    }
}
hints = [];
function clearHints() {
    for(i of hints)
        try {
            if(e("block"+i[0]+"_"+i[1]).className.includes("hint"))
                e("block"+i[0]+"_"+i[1]).remove();
        } catch(e){}
    hints=[]
}
function addHint(x,y,opacity) {
    if(blocks[x][y] != 0) return;
    hints.push([x,y]);
    generateBlock(x,y,colors.HINT,opacity);
}