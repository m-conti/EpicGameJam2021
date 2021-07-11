const ENEMY_PROJECTILE_TEXTURE = PIXI.Texture.from(ENEMY_PROJECTILE_PATH);

class EnemyProjectile extends Projectile {
    constructor(x, y, moveSpeed, direction, damage) {
        super(x, y, moveSpeed, direction, damage);

        this.sprite = new PIXI.Sprite(ENEMY_PROJECTILE_TEXTURE);
        this.sprite.rotation = Math.atan2(this.direction.y, this.direction.x);
        this.sprite.anchor.x = 0.25;
        this.sprite.anchor.y = 0.6;
        this.sprite.scale.x = 0.1
        this.sprite.scale.y = 0.1
    }
    
    collidesWithEntity(entity) {
        if (entity.typeEntity === ENTITY_TYPES.PLAYER) {
    
            if (entity.sprite) {
              const maxXEntity = entity.sprite.x + entity.sprite.width;
              const maxYEntity = entity.sprite.y + entity.sprite.height;
    
              return (
                  ((this.sprite.x) <= maxXEntity && ((this.sprite.x + ENEMY_SHOT_WIDTH / 2) >= entity.sprite.x) ) &&
                  ((this.sprite.y) <= maxYEntity && ((this.sprite.y + ENEMY_SHOT_WIDTH / 2) >= entity.sprite.y) )
              )
            }
        }
        return false
      }

      tick(timeDelta) {
        let removed = false
        if (this.collidesWithEntity(window.game.player)) {
            this.onCollide(window.game.player)
        }
        if (!removed) {
          super.tick(timeDelta);
        }
      }
}