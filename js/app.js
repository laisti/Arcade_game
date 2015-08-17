// Define the class Enemy with 3 parameters: the x coordinate, the y coordinate and speed
var Enemy = function(x, y) {
    'use strict';
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 400 + 100);
    this.sprite = 'images/enemy-bug.png';
};

// Update enemy's position to the beginning of the stone blocks when enemies are off the canvas window
// Make enemies to move with random speed
// Parameter: dt, a time delta between ticks,
// which will ensure the game runs at the same speed for all computers.
Enemy.prototype.update = function(dt) {
    'use strict';
    if (this.x > 505) {
        this.x = -100;
    } else {
        this.x += this.speed * dt;
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    'use strict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Define the class Player
var Player = function() {
    'use strict';
    this.sprite = 'images/char-boy.png';
    this.setStartPosition();
};

Player.prototype.update = function() {
    'use strict';
    // Moves the player back to the start square if he reaches the water blocks
    if (this.y <= 0) {
        this.setStartPosition();
    }
    // Moves the player back to the start square if he has got collision with any enemy
    for (var enemyObject in allEnemies) {
        if (this.x >= allEnemies[enemyObject].x - 99 && this.x <= allEnemies[enemyObject].x + 99) {
            if (this.y >= allEnemies[enemyObject].y - 10 && this.y <= allEnemies[enemyObject].y + 10) {
                this.setStartPosition();
            }
        }
    }
};

// Draw the player on the screen
Player.prototype.render = function() {
    'use strict';
    ctx.drawImage(Resources.get(this.sprite),  this.x , this.y);
};

// Moves the player to the different grass and stone blocks using up\down\right\left arrow keys
// The upper-left corner of the canvas has the coordinates (0,0)
Player.prototype.handleInput = function(key) {
    'use strict';
    if (key == 'right' && this.x + 101 < 505) {
        this.x += 101;
    }
    if (key == 'left' && this.x - 101 >= 0) {
        this.x -= 101;
    }
    if (key == 'down' && this.y + 83 < 487) {
        this.y += 83;
    }
    if (key == 'up' && this.y - 83 >= -11) {
        this.y -= 83;
    }
};

//Define start position of player
Player.prototype.setStartPosition = function() {
    'use strict';
    this.x = 202;
    this.y = 404;
};

// Create 3 objects of class Enemy and push them in the array allEnemies
var enemy1 = new Enemy(0, 63);
var enemy2 = new Enemy(0, 145);
var enemy3 = new Enemy(0, 228);

var allEnemies = [enemy1, enemy2, enemy3];

// Create 1 object of class Player
var player = new Player();

// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    'use strict';
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
