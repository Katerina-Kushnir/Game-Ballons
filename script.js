var clr = ['red', 'yellow', 'blue', 'green'];
var arr = [];
var score = 0;
var wrap = document.querySelector("#wrap");

wrap.style.lineHeight = "0px";

for (let i = 0; i < 8; i++) {
    for (let k = 0; k < 8; k++) {
        var div = document.createElement("div");
        div.className = "ball";
        div.style.border = "1px solid grey";
        div.style.width = "50px";
        div.style.height = "50px";
        div.style.display = "table-cell";
        div.style.borderRadius = "30px";
        div.style.backgroundColor = clr[Math.floor(Math.random() * 4)];
        
        arr.push(div);
        wrap.appendChild(div);
    }

    var br = document.createElement("br");
    wrap.appendChild(br);
}

var checkUp = function(bub, ind, chArr) {
    if (!arr[ind - 8]) {
        return;
    }

    if (bub.style.backgroundColor === arr[ind - 8].style.backgroundColor) {
        chArr.push(arr[ind - 8])
        checkUp(arr[ind - 8], ind - 8, chArr)
    }
}

var checkDown = function(bub, ind, chArr) {
    if (!arr[ind + 8]) {
        return;
    }

    if (bub.style.backgroundColor === arr[ind + 8].style.backgroundColor) {
        chArr.push(arr[ind + 8])
        checkDown(arr[ind + 8], ind + 8, chArr)
    }
}

var checkLeft = function(bub, ind, chArr, row) {
    var rowL = Math.floor((ind - 1) / 8) + 1;

    if (!arr[ind - 1] || row !== rowL) {
        return;
    }

    if (bub.style.backgroundColor === arr[ind - 1].style.backgroundColor) {
        chArr.push(arr[ind - 1])
        checkLeft(arr[ind - 1], ind - 1, chArr, row)
    }
}

var checkRight = function(bub, ind, chArr, row) {
    var rowL = Math.floor((ind + 1) / 8) + 1;

    if (!arr[ind + 1] || row !== rowL) {
        return;
    }

    if (bub.style.backgroundColor === arr[ind + 1].style.backgroundColor) {
        chArr.push(arr[ind + 1])
        checkRight(arr[ind + 1], ind + 1, chArr, row)
    }
}

addEventListener("click", function(event) {
    if (event.target.className != "ball") {
        return;
    }
    var index = arr.indexOf(event.target);
    
    var changeArr = [event.target];

    checkUp(event.target, index, changeArr);
    checkDown(event.target, index, changeArr);

    var row = Math.floor(index / 8) + 1;
    
    checkLeft (event.target, index,changeArr, row);
    checkRight (event.target, index,changeArr, row);

    if (changeArr.length >=3) {
        changeArr.forEach (element => {
            element.style.backgroundColor = clr[Math.floor(Math.random() * 4)];
        })

        score += changeArr.length;

        document.getElementById("score").innerHTML = "Score: " + score;
    }

    var countCom = 0;
    
    arr.forEach(element => {
        var index = arr.indexOf(element);
    
        var changeArr = [element];

        checkUp(element, index, changeArr);
        checkDown(element, index, changeArr);

        var row = Math.floor(index / 8) + 1;
    
        checkLeft (element, index,changeArr, row);
        checkRight (element, index,changeArr, row);

        if (changeArr.length >=3) {
            countCom +=1;
        }
    })

    if (countCom < 1) {
        alert("The Eng/ Your score: " + score)
    }
})