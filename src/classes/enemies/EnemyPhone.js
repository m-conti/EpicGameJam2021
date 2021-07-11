const TEXTURES_PHONE = [
  PIXI.Texture.from(PHONE_SPRITE_PATH1),
  PIXI.Texture.from(PHONE_SPRITE_PATH2),
  PIXI.Texture.from(PHONE_SPRITE_PATH3),
];

class ProjectilePhone extends EnemyProjectile {
  constructor(x, y, direction={ x: 0, y: 0 }) {
    const moveSpeed = 16;
    const damage = 4;
    super(x, y, moveSpeed, direction, damage);

    this.sprite.position.set(this.x, this.y);
    const audio = new Audio('src/assets/audio/fire/phone.wav');
    audio.volume = 0.06
    audio.muted = window.game.music.muted;
    audio.play();
  }
}

class EnemyPhone extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.fireRate = 12;
    this.targetRange = 1000;
    this.moveSpeed = 8;

    this.isAnimate = true;
    this.animationClock = 12;
    this.textures = TEXTURES_PHONE;
    const enemySprite = new PIXI.Sprite(this.textures[0]);
    enemySprite.scale.x = 0.1;
    enemySprite.scale.y = 0.1;
    this.sprite = enemySprite;
    app.stage.addChild(enemySprite);

    this.Projectile = ProjectilePhone;
    this.sprite.tint = Math.round(Math.random() * 0xFFFFFF);
  }
}