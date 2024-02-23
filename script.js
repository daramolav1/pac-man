const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const scoreEl = document.querySelector("#scoreEl");

canvas.width = innerWidth;
canvas.height = innerHeight;

const pacman = new Pacman({
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

const ghosts = [
  new Ghost({
    position: {
      x: Boundary.width * 6 + Boundary.width / 2,
      y: Boundary.height + Boundary.height / 2,
    },
    velocity: {
      x: Ghost.speed,
      y: 0,
    },
  }),
  new Ghost({
    position: {
      x: Boundary.width * 6 + Boundary.width / 2,
      y: Boundary.height * 3 + Boundary.height / 2,
    },
    velocity: {
      x: Ghost.speed,
      y: 0,
    },
    color: "pink",
  }),
];

let score = 0;
let lastKey = "";
let animateId;

const keys = {
  w: { pressed: false },
  a: { pressed: false },
  s: { pressed: false },
  d: { pressed: false },
  ArrowUp: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowDown: { pressed: false },
  ArrowRight: { pressed: false },
};

const pellets = [];
const powerUps = [];
const boundaries = generateBoundaries();

function animate() {
  animationId = requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (
    (keys.w.pressed && lastKey === "w") ||
    (keys.ArrowUp.pressed && lastKey === "ArrowUp")
  )
    pacman.moveUp(boundaries);
  else if (
    (keys.a.pressed && lastKey === "a") ||
    (keys.ArrowLeft.pressed && lastKey === "ArrowLeft")
  )
    pacman.moveLeft(boundaries);
  else if (
    (keys.s.pressed && lastKey === "s") ||
    (keys.ArrowDown.pressed && lastKey === "ArrowDown")
  )
    pacman.moveDown(boundaries);
  else if (
    (keys.d.pressed && lastKey === "d") ||
    (keys.ArrowRight.pressed && lastKey === "ArrowRight")
  )
    pacman.moveRight(boundaries);

  boundaries.forEach((boundary) => {
    boundary.draw();

    if (collisionWithBoundary({ circle: pacman, rectangle: boundary })) {
      pacman.velocity.y = 0;
      pacman.velocity.x = 0;
    }
  });

  for (let i = pellets.length - 1; i >= 0; i--) {
    const pellet = pellets[i];

    pellet.draw();

    if (
      Math.hypot(
        pellet.position.x - pacman.position.x,
        pellet.position.y - pacman.position.y
      ) <
      pellet.radius + pacman.radius
    ) {
      pellets.splice(i, 1);
      score += 10;
      scoreEl.innerHTML = score;
    }
  }

  for (let i = powerUps.length - 1; i >= 0; i--) {
    const powerUp = powerUps[i];

    powerUp.draw();

    if (
      Math.hypot(
        powerUp.position.x - pacman.position.x,
        powerUp.position.y - pacman.position.y
      ) <
      powerUp.radius + pacman.radius
    ) {
      powerUps.splice(i, 1);

      ghosts.forEach((ghost) => {
        ghost.scared = true;

        setTimeout(() => {
          ghost.scared = false;
        }, 5000);
      });
    }
  }

  for (let i = ghosts.length - 1; i >= 0; i--) {
    const ghost = ghosts[i];

    if (
      Math.hypot(
        ghost.position.x - pacman.position.x,
        ghost.position.y - pacman.position.y
      ) <
      ghost.radius + pacman.radius
    ) {
      if (ghost.scared) {
        ghosts.splice(i, 1);
      } else {
        cancelAnimationFrame(animationId);
        console.log("You lose");
      }
    }
  }

  if (pellets.length === 0) {
    cancelAnimationFrame(animationId);
    console.log("You win");
  }

  pacman.update();

  ghosts.forEach((ghost) => {
    ghost.update();

    const collisions = [];

    boundaries.forEach((boundary) => {
      if (
        !collisions.includes("right") &&
        collisionWithBoundary({
          circle: { ...ghost, velocity: { x: ghost.speed, y: 0 } },
          rectangle: boundary,
        })
      ) {
        collisions.push("right");
      }

      if (
        !collisions.includes("left") &&
        collisionWithBoundary({
          circle: { ...ghost, velocity: { x: -ghost.speed, y: 0 } },
          rectangle: boundary,
        })
      ) {
        collisions.push("left");
      }

      if (
        !collisions.includes("up") &&
        collisionWithBoundary({
          circle: { ...ghost, velocity: { x: 0, y: -ghost.speed } },
          rectangle: boundary,
        })
      ) {
        collisions.push("up");
      }

      if (
        !collisions.includes("down") &&
        collisionWithBoundary({
          circle: { ...ghost, velocity: { x: 0, y: ghost.speed } },
          rectangle: boundary,
        })
      ) {
        collisions.push("down");
      }
    });

    if (collisions.length > ghost.prevCollisions.length) {
      ghost.prevCollisions = collisions;
    }

    if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
      if (ghost.velocity.x > 0) {
        ghost.prevCollisions.push("right");
      } else if (ghost.velocity.x < 0) {
        ghost.prevCollisions.push("left");
      } else if (ghost.velocity.y < 0) {
        ghost.prevCollisions.push("up");
      } else if (ghost.velocity.y > 0) {
        ghost.prevCollisions.push("down");
      }

      const pathways = ghost.prevCollisions.filter((collision) => {
        return !collisions.includes(collision);
      });

      const direction = pathways[Math.floor(Math.random() * pathways.length)];

      switch (direction) {
        case "up":
          ghost.velocity.x = 0;
          ghost.velocity.y = -ghost.speed;
          break;
        case "down":
          ghost.velocity.x = 0;
          ghost.velocity.y = ghost.speed;
          break;
        case "left":
          ghost.velocity.x = -ghost.speed;
          ghost.velocity.y = 0;
          break;
        case "right":
          ghost.velocity.x = ghost.speed;
          ghost.velocity.y = 0;
          break;
      }

      ghost.prevCollisions = [];
    }
  });

  if (pacman.velocity.x > 0) {
    pacman.rotation = 0;
  } else if (pacman.velocity.x < 0) {
    pacman.rotation = Math.PI;
  } else if (pacman.velocity.y > 0) {
    pacman.rotation = Math.PI / 2;
  } else if (pacman.velocity.y < 0) {
    pacman.rotation = Math.PI * 1.5;
  }
}

animate();
