
const getMousePos = () => window.game.app.renderer.plugins.interaction.mouse.global;

const getFireVector = (source, target) => {
  const x = (target.x - source.x);
  const y = (target.y - source.y);
  const angle = Math.atan2(y, x);
  return { x: Math.cos(angle), y: Math.sin(angle) };
};