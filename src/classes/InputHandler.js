
class InputHandler {
  constructor(app) {
    this.keyPressed = {};
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
    window.addEventListener('mousedown', this.onMouseDown.bind(this));
    window.addEventListener('mouseup', this.onMouseUp.bind(this));
    // app.stage.on('mouseleave', this.onMouseUp.bind(this));
    console.log(app);
  }

  onKeyDown({ key }) {
    this.keyPressed[key] = true;
  //   switch(key) {
  //     case INPUT_KEYS.DECREMENT_POWER: this.decrementPower(); break;
  //     case INPUT_KEYS.INCREMENT_POWER: this.incrementPower(); break;
  //     default: break;
  //   }
  }

  onKeyUp({ key }) {
    this.keyPressed[key] = false;
  }

  onMouseDown(event) {
    this.keyPressed[`mouse${event.button}`] = true;
  }

  onMouseUp({ button }) {
    this.keyPressed[`mouse${button}`] = false;
  }

  decrementPower() {
    window.game.player.decrementPower(0, -10);
  }

  incrementPower() {
    console.log('up');
    window.game.player.incrementPower(0, 10);
  }
}