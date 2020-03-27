import { board } from '../main.js';
import { drawOperations, drawPath } from '../utils/utils.js';
import { showNotification } from '../utils/notifications.js';

const BFS = () => {
  board.clearPath();
  const startNode = board.getStartNode();
  const endNode = board.getEndNode();
  if (!startNode || !endNode) {
    showNotification(true, 'You must first declare a start and end node');
    console.log('You must first declare a start and end node');
  } else {
    console.log('Searching...');
    const path = findPathBFS(startNode, endNode);
    if (path[0].length > 0) {
      console.log(path[0].length);
      drawPath(path[0], path[1]);
    } else {
    }
    setTimeout(function() {
      if (path[0].length === 0) {
        board.setSearchingFalse();
        showNotification(true, 'No path found');
      }
    }, path[1] * 10);
  }
};

const findPathBFS = (start, end) => {
  board.setSearchingTrue();
  let operationCount = 0;
  //TO DO: Implement queue based on a linked list, not array!
  let queue = [];
  queue.push([start]);

  while (queue.length > 0) {
    let path = queue.shift();
    let pos = path[path.length - 1];

    let direction = [
      [pos[0] + 1, pos[1]],
      [pos[0], pos[1] + 1],
      [pos[0] - 1, pos[1]],
      [pos[0], pos[1] - 1]
    ];

    let operations = [];

    for (let i = 0; i < direction.length; i++) {
      if (direction[i][0] == end[0] && direction[i][1] == end[1]) {
        return [path.concat([end]), operationCount];
      }

      if (
        direction[i][0] < 0 ||
        direction[i][0] >= board.numberCols() ||
        direction[i][1] < 0 ||
        direction[i][1] >= board.numberRows() ||
        board.GridValue([direction[i][0], direction[i][1]]) !== 0
      ) {
        continue;
      }

      board.GridVisited([direction[i][0], direction[i][1]]);
      operations.push([direction[i][0], direction[i][1]]);
      operationCount++;
      queue.push(path.concat([direction[i]]));
    }
    drawOperations(operations, operationCount);
  }
  console.log('No Path Found!');
  return [[], operationCount];
};

export { BFS };
