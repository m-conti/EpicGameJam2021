
const getMousePos = () => {
  const { x, y } = window.game.app.renderer.plugins.interaction.mouse.global;
  const resolution = window.game.app.renderer.resolution;
  return { x: x / resolution, y: y / resolution };
};

const getFireVector = (source, target) => {
  const x = (target.x - source.x);
  const y = (target.y - source.y);
  console.log(Math.atan2(x, y));
};