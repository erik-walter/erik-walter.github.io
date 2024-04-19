export default class Enemy {
  constructor(x, y, enemyNumber) {
    this.x = x;
    this.y = y;

    this.image = new Image();
    this.image.src = `images/enemy${enemyNumber}.png`;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y);
  }
}
