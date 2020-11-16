const canvas = document.querySelector("canvas")

canvas.width = 800;
canvas.height = 500;

const ctx = canvas.getContext("2d")

// ball
const ball = new Ball(400, 400)

// players
const paddle1 = new Paddle(10, 200, "KeyW", "KeyS")
const paddle2 = new Paddle(770, 200, "ArrowUp", "ArrowDown")

// render game
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // dashed line
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.setLineDash([10, 5]);
  ctx.lineWidth = 5;
  ctx.moveTo(400, 0);
  ctx.lineTo(400, 500);
  ctx.stroke();

  // ball interaction
  ball.draw()
  ball.update()
  
  if (ball.x <= 0) {
    paddle2.score ++
    ball.rerender()
  } else if (ball.x + ball.w >= 800) {
    paddle1.score++
    ball.rerender()
  }

  // paddle interactions 
  paddle1.draw()
  paddle1.update()

  paddle2.draw()
  paddle2.update()

  // score
  ctx.font = '64px sans-serif'
  ctx.fillText(paddle1.score.toString(), 180, 70)
  ctx.fillText(paddle2.score.toString(), 580, 70)



  requestAnimationFrame(render)
}

render()