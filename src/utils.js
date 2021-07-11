
const getMousePos = () => {
  const { x, y } = window.game.app.renderer.plugins.interaction.mouse.global;
  const origin = window.game.camera;

  return { x: x + origin.x, y: y + origin.y };
};

const randomBetween = (min, max) => Math.floor(min + Math.random() * max);
const randomBetweenFloat = (min, max) => min + Math.random() * max;

const angleToVector = (angle) => ({ x: Math.cos(angle), y: Math.sin(angle) });

const getFireVector = (source, target) => {
  const x = (target.x - source.x);
  const y = (target.y - source.y);
  const angle = Math.atan2(y, x);
  return angleToVector(angle);
};


const debugSprite = (sprite) => {
        const graphics = new PIXI.Graphics();
        graphics.moveTo(sprite.x, sprite.y);
        graphics.beginFill(0xFFFFFF);
        graphics.drawRect(0, 0, sprite.width, sprite.height);
        graphics.endFill();
        sprite.addChild(graphics);
};