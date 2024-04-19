import Enemy from "./Enemy.js";

export default class EnemyController {
  enemyMap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
    [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  ];
  enemyRows = [];

  constructor(canvas) {
    this.canvas = canvas;
    this.createEnemies();
  }

  draw(ctx) {
    this.drawEnemies(ctx);
  }

  drawEnemies(ctx) {
    this.enemyRows.flat().forEach((enemy) => {
      enemy.draw(ctx);
    });
  }

  createEnemies() {
    for (let rowIndex = 0; rowIndex < this.enemyMap.length; rowIndex++) {
      const row = this.enemyMap[rowIndex];
      this.enemyRows[rowIndex] = [];
      for (let enemyIndex = 0; enemyIndex < row.length; enemyIndex++) {
        const enemyNumber = row[enemyIndex];
        if (enemyNumber > 0) {
          const enemy = new Enemy(enemyIndex * 50, rowIndex * 35, enemyNumber);
          this.enemyRows[rowIndex].push(enemy);
        }
      }
    }
  }
}
