class GameObject {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

  draw() {
    ctx.fillStyle = "white"
    ctx.fillRect(this.x, this.y, this.w, this.h)
  }
}

function randomSign() {
  return Math.sign([-1, 1][Math.floor(Math.random() * 2)])
}

function randomNumber(min, max) {
  return Math.random() * (max - min + 1) + min
}

class Ball extends GameObject {
  constructor(x, y) {
    super(x, y, 20, 20)
    this.speedx = randomSign() * randomNumber(3, 6)
    this.speedy = randomSign() * randomNumber(3, 6)
  }

  update() {

    if (this.y <= 0 || this.y + this.h >= 500) this.speedy *= -1;

    this.x += this.speedx
    this.y += this.speedy
  }

  rerender() {
    this.x = 400 - this.w / 2;
    this.y = 250 - this.h / 2;

    this.speedx = randomSign() * randomNumber(3, 6)
    this.speedy = randomSign() * randomNumber(3, 6)

  }

}

class Paddle extends GameObject {
  constructor(x, y, keyMoveUp, keyMoveDown) {
    super(x, y, 20, 80)
    this.direction = 0
    this.speed = 10

    this.keyMoveDown = keyMoveDown
    this.keyMoveUp = keyMoveUp
    this.score = 0

    this.keydownActions = {
      moveUp: () => this.direction = -1,
      moveDown: () => this.direction = 1
    }

    this.keyupActions = {
      moveUp: () => this.direction = 0,
      moveDown: () => this.direction = 0
    }
  }

  update() {
    document.addEventListener('keydown', (ev) => {
      switch (ev.code) {
        case this.keyMoveUp:
          this.keydownActions.moveUp()
          break;
      
        case this.keyMoveDown:
          this.keydownActions.moveDown()
          break;
      }
    })

    document.addEventListener('keyup', (ev) => {

      switch (ev.code) {
        case this.keyMoveUp:
          this.keyupActions.moveUp()
          break;
      
        case this.keyMoveDown:
          this.keyupActions.moveDown()
          break;
      }
    })

    document.addEventListener('keyup', (ev) => {
      
    })

    if (this.direction === -1 && this.y <= 10) return
    if (this.direction === 1 && this.y + this.h >= 490) return


    this.y += this.speed * this.direction
  }
}