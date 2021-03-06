import { Board } from './display/board.js';
import { setUpButtons } from './display/buttons.js';
import './styles/index.css';

const board = new Board();

setUpButtons();
board.tableCreate();
board.unloadScrollBars();
board.mouseListeners();

export { board };
