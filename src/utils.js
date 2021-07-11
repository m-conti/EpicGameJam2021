
const getMousePos = () => {
  const { x, y } = window.game.app.renderer.plugins.interaction.mouse.global;
  const origin = window.game.camera;

  return { x: x + origin.x, y: y + origin.y };
};

const randomBetween = (min, max) => Math.floor(min + Math.random() * max);
const randomBetweenFloat = (min, max) => min + Math.random() * max;

const angleToVector = (angle) => ({ x: Math.cos(angle), y: Math.sin(angle) });

const getFireRotation = (source, target) => {
  const x = (target.x - source.x);
  const y = (target.y - source.y);
  return Math.atan2(y, x);
}

const getFireVector = (source, target) => {
  return angleToVector(getFireRotation(source, target));
};

const getDistance = (source, target) => {
  return Math.pow(source.x - target.x, 2) + Math.pow(source.y - target.y, 2);
}


const debugSprite = (sprite) => {
        const graphics = new PIXI.Graphics();
        graphics.moveTo(sprite.x, sprite.y);
        graphics.beginFill(0xFFFFFF);
        graphics.drawRect(0, 0, sprite.width, sprite.height);
        graphics.endFill();
        sprite.addChild(graphics);
};