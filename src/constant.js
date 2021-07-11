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
  START: 'Ground Floor - Reception',
  IT: '1st Floor - IT Department',
  MARKETING: '2nd Floor - Marketing Department',
  HR: '3rd Floor - HR Department',
  END: '4th Floor - Big Boss',
}

const PLAYER_WIDTH = 1
const PLAYER_HEIGHT = 50
const WALL_WIDTH = 1
const WALL_HEIGHT = 150
const WALL_SPRITE_PATH = 'src/assets/sprites/wall.png'
const BACKGROUND_COLOR = 0x000
const PLAYER_SPRITE_PATH = 'src/assets/sprites/cravate.png'
const PLAYER_SPRITE_PATH2 = 'src/assets/sprites/cravate3.png'
const PLAYER_SPRITE_DEFAULT_PATH = 'src/assets/sprites/cravate2.png'
const PLAYER_PATTERN_PATH = 'src/assets/sprites/pattern.jpg'
const DEATH_SPRITE_PATH = 'src/assets/sprites/enemies/death.png'

const TROMBI_X = innerWidth - 200;
const TROMBI_Y =  innerHeight - innerHeight / 2;
const BUBBLE_W = 250;
const BUBBLE_H = 170;
const TROMBI_SPRITE_PATH1 = 'src/assets/sprites/enemies/Trombi/Trombi_Phase_Une.png';
const TROMBI_SPRITE_PATH2 = 'src/assets/sprites/enemies/Trombi/Trombi_Phase_Deux.png';
const TROMBI_SPRITE_PATH3 = 'src/assets/sprites/enemies/Trombi/Trombi_Phase_Trois.png';

const WORDSHOT_SQUARE = 30
const ENEMY_SHOT_WIDTH = 10

const BORDER_ROOM_SPRITE_PATH = 'src/assets/sprites/wall.png'

const ROOM_SIZE = 1500;

const CORPORATE_TEXT = [
  "Actionable", "Gain traction", "Low-hanging fruit", "Quick fix", "Think outside the box", "30,000 foot view", "Bandwidth", "Benchmark", "Best practice", "Bottleneck", "Deliverable", "Downsize", "In the loop", "Win win", "Pouvoir d'achat", "Gagner un marché", "Scalable", "Hierarchie horizontale", "Scrum Master", "Itération", "Iterate", "Booster", "Closer le deal", "Business Angel", "Buzzword", "VC", "Licorne", "Unicorn", "Pitch", "Traction", "Disrupter", "Écosystème", "Innover", "Lean", "FOMO", "Bankable", "Blockchain", "Business Plan", "Business Model", "Coworking", "Crowdsourcing", "Norvegian Inquisition", "Fordism", "Monetisation", "Disruptif"
]
const LOVE_TEXT = [
  "Love"
]
const MIN_ENEMIES = 10;
const MAX_ENEMIES = 20;

const ENEMY_LIST = [
  EnemyCV,
  EnemyMail,
  EnemyPhone,
];

const ENTITY_TYPES = {
  PLAYER: 'player',
  WALL: 'wall',
  PROJECTILE: 'projectile'
}

const PROBA_LOVE_SHOT = 0.1

const PROJECTILE_TIME_TO_LIVE = 500
const TIME_TO_LIVE_DEATH = 200

