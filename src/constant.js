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
const PLAYER_SPRITE_PATH2 = 'src/assets/sprites/cravate3.png'
const PLAYER_PATTERN_PATH = 'src/assets/sprites/pattern.jpg'

const TROMBI_X = innerWidth - 120;
const TROMBI_Y =  innerHeight - innerHeight / 3;
const BUBBLE_W = 250;
const BUBBLE_H = 170;
const TROMBI_SPRITE_PATH1 = 'src/assets/sprites/enemies/Trombi/Trombi_Phase_Une.png';
const TROMBI_SPRITE_PATH2 = 'src/assets/sprites/enemies/Trombi/Trombi_Phase_Deux.png';
const TROMBI_SPRITE_PATH3 = 'src/assets/sprites/enemies/Trombi/Trombi_Phase_Trois.png';

const WORDSHOT_SQUARE = 30
const ENEMY_SHOT_WIDTH = 10

const BORDER_ROOM_SPRITE_PATH = 'src/assets/sprites/wall.png'

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

const ENTITY_TYPES = {
  PLAYER: 'player',
  WALL: 'wall',
  PROJECTILE: 'projectile'
}

const PHONE_SPRITE_PATH1 = 'src/assets/sprites/enemies/Phone/Phone_Frame_1.png'
const PHONE_SPRITE_PATH2 = 'src/assets/sprites/enemies/Phone/Phone_Frame_2.png'
const PHONE_SPRITE_PATH3 = 'src/assets/sprites/enemies/Phone/Phone_Frame_3.png'
const CV_SPRITE_PATH1 = 'src/assets/sprites/enemies/CV/CV_Frame_1.png'
const CV_SPRITE_PATH2 = 'src/assets/sprites/enemies/CV/CV_Frame_2.png'
const MAIL_SPRITE_PATH1 = 'src/assets/sprites/enemies/Mail/Mail_Frame_1.png'
const MAIL_SPRITE_PATH2 = 'src/assets/sprites/enemies/Mail/Mail_Frame_2.png'
const MAIL_SPRITE_PATH3 = 'src/assets/sprites/enemies/Mail/Mail_Frame_3.png'