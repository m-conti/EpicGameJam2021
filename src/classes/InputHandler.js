
class InputHandler {
  constructor() {
    this.keyPressed = {};
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  onKeyDown({ key }) {
    this.keyPressed[key] = true;
    // switch(key) {
    //   case INPUT_KEYS.UP: this.moveUp(); break;
    //   case INPUT_KEYS.DOWN: this.moveDown(); break;
    //   case INPUT_KEYS.LEFT: this.moveLeft(); break;
    //   case INPUT_KEYS.RIGHT: this.moveRight(); break;
    //   default: break;
    // }
  }

  onKeyUp({ key }) {
    this.keyPressed[key] = false;
  }

  moveUp() {
    window.game.player.move(0, -10);
  }

  moveDown() {
    console.log('up');
    window.game.player.move(0, 10);
  }

  moveLeft() {
    window.game.player.move(-10, 0);
  }

  moveRight() {
    window.game.player.move(10, 0);
  }
}