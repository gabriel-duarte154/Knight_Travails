function getGameBoard() {
  const gameBoard = [];

  for (let i = 0; i < 8; i++) {
    let arr = [];
    for (let j = 0; j < 8; j++) {
      arr.push(0);
    }
    gameBoard.push(arr);
  }

  return gameBoard;
}

function children(data) {
  return {
    data,
    children: [],
  };
}

function graph(cell) {
  let root = children(cell);
  let visited = [];
  let q = [];
  visited.push(cell);
  q.push(root);

  while (q.length > 0) {
    let node = q.shift();
    let moves = getPossibleMoves(node.data);

    moves.forEach((move) => {
      if (includes(visited, move)) return;
      let child = children(move);
      q.push(child);
      node.children.push(child);
      visited.push(move);
    });
  }

  return root;
}

function getPossibleMoves(postion) {
  let x = postion[0];
  let y = postion[1];
  let possibleMoves = [
    [x + 2, y - 1],
    [x + 2, y + 1],
    [x - 2, y - 1],
    [x - 2, y + 1],
    [x - 1, y + 2],
    [x + 1, y + 2],
    [x - 1, y - 2],
    [x + 1, y - 2],
  ];

  return removeNegatives(possibleMoves);
}

function includes(arr, element) {
  for (let i in arr) {
    if (arr[i][0] === element[0] && arr[i][1] === element[1]) {
      return true;
    }
  }
  return false;
}

function removeNegatives(arr) {
  return arr.filter(
    (subArr) =>
      subArr[0] >= 0 && subArr[0] <= 7 && subArr[1] >= 0 && subArr[1] <= 7
  );
}

function searchForShortPath(currentPosition, destination) {
  let tree = graph(currentPosition);
  let stack = [];
  let path = [];
  stack.push(tree);

  while (true) {
    let node = stack[stack.length - 1];
    if (equal(node.data, destination)) {
      break;
    }

    if (node.children.length > 0) {
      stack.push(node.children[0]);
      path.push(node.children[0].data);
      node.children.shift();
    } else {
      stack.pop();
    }
  }

  return stack;
}

function equal(el1, el2) {
  return el1[0] === el2[0] && el1[1] === el2[1];
}

const game = getGameBoard();

function knightMoves(currentPosition, destination) {
  if (ilegalPosition(currentPosition) || ilegalPosition(destination)) {
    console.warn('Enter a legal position, between 0 and 7.');
    return;
  }
  let path = getData(searchForShortPath(currentPosition, destination));
  setMoves(path, game);
  setKnight(currentPosition, game);
  printMsg(path);
  return path;
}

function ilegalPosition(position) {
  return (
    position[0] < 0 || position[0] > 7 || position[1] < 0 || position[1] > 7
  );
}

function getData(arr) {
  return (arr = arr.map((item) => item.data));
}

function setMoves(moves, gameBoard) {
  for (let i in moves) {
    gameBoard[moves[i][0]][moves[i][1]] = i;
  }
}

function setKnight(position, gameBoard) {
  gameBoard[position[0]][position[1]] = 'K';
}

function printMsg(data) {
  console.log(getMsg(data));
  printGameBoard(game);
}

function getMsg(path) {
  let string = `You made it in ${path.length - 1} moves! Here's your path:`;
  for (let i in path) {
    string += '\n' + `[${path[i]}]`;
  }
  return string;
}

function printGameBoard(gameBoard) {
  let print = `     ${'-'.repeat(49)}`;
  for (let i = 7; i >= 0; i--) {
    print += `\n  ${i + 1}  `;
    for (let j in gameBoard[i]) {
      if (gameBoard[i][j] === 0) {
        print += '|     ';
      } else {
        print += `|  ${gameBoard[i][j]}  `;
      }
    }
    print += `| \n     ${'-'.repeat(49)}`;
  }

  print += '\n        ';

  for (let i = 97; i < 105; i++) {
    print += `${String.fromCharCode(i)}     `;
  }

  console.log(print);
}

knightMoves([0, 0], [0, 7]);