class EnemyProjectile extends Projectile {
    constructor(x, y, moveSpeed, direction, damage) {
        super(x, y, moveSpeed, direction, damage);
    }
    
    collidesWithEntity(entity) {
        if (entity.typeEntity === ENTITY_TYPES.PLAYER) {
    
            if (entity.sprite) {
              const maxXEntity = entity.sprite.x + entity.sprite.width;
              const maxYEntity = entity.sprite.y + entity.sprite.height;
    
              return (
                  ((this.sprite.x - ENEMY_SHOT_WIDTH / 2) <= maxXEntity && ((this.sprite.x + ENEMY_SHOT_WIDTH / 2) >= entity.sprite.x) ) &&
                  ((this.sprite.y - ENEMY_SHOT_WIDTH / 2) <= maxYEntity && ((this.sprite.y + ENEMY_SHOT_WIDTH / 2) >= entity.sprite.y) )
              )
            }
        }
        return false
      }
      tick(timeDelta) {
        let removed = false
        for (const entity of window.game.entities) {
            if (this.collidesWithEntity(entity)) {
                this.onCollide(entity)
                break
            }
        }
        if (!removed) {
          super.tick(timeDelta);
        }
      }
}