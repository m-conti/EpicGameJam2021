
const INPUT_KEYS = {
  UP: 'w',
  DOWN: 's',
  LEFT: 'a',
  RIGHT: 'd',
  FIRE: 'mouse0',
  INCREMENT_POWER: 'v',
  DECREMENT_POWER: 'c',
};

const FLOORS = {
  START: 'Welcome',
  IT: 'IT Department',
  MARKETING: 'Marketing Department',
  HR: 'HR Department',
  END: 'Big Boss',
}

const PLAYER_WIDTH = 1
const PLAYER_HEIGHT = 50
const WALL_WIDTH = 1
const WALL_HEIGHT = 150
const WALL_SPRITE_PATH = 'src/assets/sprites/wall.png'
const BACKGROUND_COLOR = 0xfac049
const PLAYER_SPRITE_PATH = 'src/assets/sprites/cravate.png'
const PLAYER_PATTERN_PATH = 'src/assets/sprites/pattern.jpg'


const ROOM_SIZE = 500;

const CORPORATE_TEXT = [
  "Actionable", "Gain traction", "Low-hanging fruit", "Quick fix", "Think outside the box", "30,000 foot view", "Bandwidth", "Benchmark", "Best practice", "Bottleneck", "Deliverable", "Downsize", "In the loop", "Win win", "Pouvoir d'achat", "Gagner un marché", "Scalable", "Hierarchie horizontale", "Scrum Master", "Itération", "Iterate", "Booster", "Closer le deal", "Business Angel", "Buzzword", "VC", "Licorne", "Unicorn", "Pitch", "Traction", "Disrupter", "Écosystème", "Innover", "Lean", "FOMO", "Bankable", "Blockchain", "Business Plan", "Business Model", "Coworking", "Crowdsourcing"
]
const MIN_ENEMIES = 10;
const MAX_ENEMIES = 20;

const ENEMY_LIST = [
  EnemyCV,
  EnemyMail,
  EnemyPhone,
]
