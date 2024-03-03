const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const scoreEl = document.querySelector("#scoreEl");
const liveEl = document.querySelector("#liveEl");

const maps = [
  /**
   * Level 1
   */
  [
    ["1", "-", "-", "-", "]", " ", "[", "-", "-", "-", "2"],
    ["|", " ", ".", ".", ".", ".", ".", ".", ".", "i", "|"],
    ["|", ".", "b", ".", "[", "7", "]", ".", "b", ".", "|"],
    ["|", ".", ".", ".", ".", "|", ".", ".", ".", ".", "|"],
    ["|", ".", "[", "]", ".", "_", ".", "[", "]", ".", "|"],
    ["_", ".", ".", ".", " ", " ", " ", ".", ".", ".", "_"],
    [" ", ".", "b", ".", "[", "5", "]", ".", "b", ".", " "],
    ["^", ".", ".", ".", " ", " ", " ", ".", ".", ".", "^"],
    ["|", ".", "[", "]", ".", "^", ".", "[", "]", ".", "|"],
    ["|", ".", ".", ".", ".", "|", ".", ".", ".", ".", "|"],
    ["|", ".", "b", ".", "[", "5", "]", ".", "b", ".", "|"],
    ["|", ".", ".", ".", ".", ".", ".", ".", ".", "p", "|"],
    ["4", "-", "-", "-", "]", " ", "[", "-", "-", "-", "3"],
  ],

  /**
   * Level 2
   */

  [
    ["1", "-", "-", "-", "7", "-", "-", "-", "7", "-", "-", "-", "2"],
    ["|", " ", ".", ".", "_", ".", ".", ".", "_", ".", ".", "p", "|"],
    ["|", ".", "^", ".", ".", ".", "^", ".", ".", ".", "^", ".", "|"],
    ["|", ".", "4", "]", ".", "[", "+", "]", ".", "[", "3", ".", "|"],
    ["|", ".", ".", ".", ".", ".", "|", ".", ".", ".", ".", ".", "|"],
    ["4", "]", ".", "1", "]", ".", "_", ".", "[", "2", ".", "[", "3"],
    [" ", ".", ".", "|", " ", " ", " ", " ", " ", "|", "i", ".", " "],
    ["[", "-", "-", "8", " ", "[", "5", "]", " ", "6", "-", "-", "]"],
    [" ", ".", "i", "|", " ", " ", " ", " ", " ", "|", ".", ".", " "],
    ["1", "]", ".", "4", "]", ".", "^", ".", "[", "3", ".", "[", "2"],
    ["|", ".", ".", ".", ".", ".", "|", ".", ".", ".", ".", ".", "|"],
    ["|", ".", "1", "]", ".", "[", "+", "]", ".", "[", "2", ".", "|"],
    ["|", ".", "_", ".", ".", ".", "_", ".", ".", ".", "_", ".", "|"],
    ["|", "p", ".", ".", "^", ".", ".", ".", "^", ".", ".", ".", "|"],
    ["4", "-", "-", "-", "5", "-", "-", "-", "5", "-", "-", "-", "3"],
  ],

  /**
   * Level 3
   */

  [
    [
      "1",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "]",
      " ",
      "[",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "2",
    ],
    [
      "|",
      " ",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      "i",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      "|",
    ],
    [
      "|",
      ".",
      "[",
      "]",
      ".",
      "[",
      "]",
      ".",
      "b",
      ".",
      "[",
      "]",
      ".",
      "[",
      "]",
      ".",
      "|",
    ],
    [
      "|",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      "p",
      "|",
    ],
    [
      "|",
      ".",
      "[",
      "]",
      ".",
      "^",
      ".",
      "[",
      "7",
      "]",
      ".",
      "^",
      ".",
      "[",
      "]",
      ".",
      "|",
    ],
    [
      "|",
      ".",
      ".",
      ".",
      ".",
      "|",
      ".",
      ".",
      "|",
      ".",
      ".",
      "|",
      ".",
      ".",
      ".",
      ".",
      "|",
    ],
    [
      "4",
      "-",
      "-",
      "2",
      ".",
      "6",
      "]",
      " ",
      "_",
      " ",
      "[",
      "8",
      ".",
      "1",
      "-",
      "-",
      "3",
    ],
    [
      " ",
      " ",
      " ",
      "|",
      ".",
      "|",
      " ",
      " ",
      " ",
      " ",
      " ",
      "|",
      ".",
      "|",
      " ",
      " ",
      " ",
    ],
    [
      "1",
      "-",
      "-",
      "3",
      ".",
      "_",
      " ",
      "[",
      "5",
      "]",
      " ",
      "_",
      ".",
      "4",
      "-",
      "-",
      "2",
    ],
    [
      "|",
      ".",
      ".",
      ".",
      ".",
      ".",
      " ",
      " ",
      " ",
      " ",
      " ",
      ".",
      ".",
      ".",
      ".",
      ".",
      "|",
    ],
    [
      "|",
      ".",
      "[",
      "2",
      ".",
      "[",
      "]",
      " ",
      "b",
      " ",
      "[",
      "]",
      ".",
      "1",
      "]",
      ".",
      "|",
    ],
    [
      "|",
      "p",
      ".",
      "|",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      "|",
      ".",
      ".",
      "|",
    ],
    [
      "6",
      "]",
      ".",
      "_",
      ".",
      "^",
      ".",
      "[",
      "7",
      "]",
      ".",
      "^",
      ".",
      "_",
      ".",
      "[",
      "8",
    ],
    [
      "|",
      ".",
      ".",
      ".",
      ".",
      "|",
      ".",
      ".",
      "|",
      ".",
      ".",
      "|",
      ".",
      ".",
      ".",
      ".",
      "|",
    ],
    [
      "|",
      ".",
      "[",
      "-",
      "-",
      "5",
      "]",
      ".",
      "_",
      ".",
      "[",
      "5",
      "-",
      "-",
      "]",
      ".",
      "|",
    ],
    [
      "|",
      "i",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      ".",
      "i",
      "|",
    ],
    [
      "4",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "]",
      " ",
      "[",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "3",
    ],
  ],
];

let score = 0;
let lives = 3;
let pacman = {};
let ghosts = [];
let pellets = [];
let powerUps = [];
let items = [];
let currentLevelIndex = 0;
let accumatedTime = 0;
let prevMs = Date.now();
let animationId;
let lastKey = "";
let pelletSoundIndex = 0;
let ghostScaredSoundId;
let ghostSpeed = 75;
const GHOST_SPEED_INCREMENT = 50;
let ghostReleaseIntervals = [0, 5, 10, 15];
let boundaries = generateBoundaries(currentLevelIndex, maps);

const ghostPositions = [
  [
    {
      x: Boundary.width * 5 + Boundary.width / 2,
      y: Boundary.height * 5 + Boundary.height / 2,
    },
    {
      x: Boundary.width * 5 + Boundary.width / 2,
      y: Boundary.height * 6 + Boundary.height / 2,
    },
    {
      x: Boundary.width * 4 + Boundary.width / 2,
      y: Boundary.height * 6 + Boundary.height / 2,
    },
    {
      x: Boundary.width * 6 + Boundary.width / 2,
      y: Boundary.height * 6 + Boundary.height / 2,
    },
  ],
  [
    {
      x: Boundary.width * 6 + Boundary.width / 2,
      y: Boundary.height * 6 + Boundary.height / 2,
    },
    {
      x: Boundary.width * 6 + Boundary.width / 2,
      y: Boundary.height * 7 + Boundary.height / 2,
    },
    {
      x: Boundary.width * 5 + Boundary.width / 2,
      y: Boundary.height * 7 + Boundary.height / 2,
    },
    {
      x: Boundary.width * 7 + Boundary.width / 2,
      y: Boundary.height * 7 + Boundary.height / 2,
    },
  ],
  [
    {
      x: Boundary.width * 8 + Boundary.width / 2,
      y: Boundary.height * 7 + Boundary.height / 2,
    },
    {
      x: Boundary.width * 8 + Boundary.width / 2,
      y: Boundary.height * 8 + Boundary.height / 2,
    },
    {
      x: Boundary.width * 7 + Boundary.width / 2,
      y: Boundary.height * 8 + Boundary.height / 2,
    },
    {
      x: Boundary.width * 9 + Boundary.width / 2,
      y: Boundary.height * 8 + Boundary.height / 2,
    },
  ],
];

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

const game = {
  isPaused: false,

  init() {
    Howler.stop();
    clearTimeout(ghostScaredSoundId);

    accumatedTime = 0;

    pacman = new Pacman({
      position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2,
      },
      velocity: {
        x: 0,
        y: 0,
      },
    });

    ghosts = [
      new Ghost({
        position: ghostPositions[currentLevelIndex][0],
        velocity: {
          x: Ghost.speed * (Math.random() < 0.5) ? -1 : 1,
          y: 0,
        },
        imgSrc: "./images/sprites/redGhost.png",
        state: "active",
        speed: ghostSpeed,
        outOfCage: true,
      }),
      new Ghost({
        position: ghostPositions[currentLevelIndex][1],
        velocity: {
          x: Ghost.speed * (Math.random() < 0.5) ? -1 : 1,
          y: 0,
        },
        imgSrc: "./images/sprites/orangeGhost.png",
        speed: ghostSpeed,
      }),
      new Ghost({
        position: ghostPositions[currentLevelIndex][2],
        velocity: {
          x: Ghost.speed * (Math.random() < 0.5) ? -1 : 1,
          y: 0,
        },
        imgSrc: "./images/sprites/greenGhost.png",
        speed: ghostSpeed,
      }),
      new Ghost({
        position: ghostPositions[currentLevelIndex][3],
        velocity: {
          x: Ghost.speed * (Math.random() < 0.5) ? -1 : 1,
          y: 0,
        },
        imgSrc: "./images/sprites/blueGhost.png",
        speed: ghostSpeed,
      }),
    ];
  },

  initStart() {
    pacman.state = "paused";
    ghosts.forEach((ghost) => {
      ghost.state = "paused";
    });

    setTimeout(() => {
      pacman.state = "active";
      ghosts[0].state = "active";
      ghosts[1].state = null;
      ghosts[2].state = null;
      ghosts[3].state = null;
      sound.siren.play();
    }, 1000);
  },

  nextRound() {
    Howler.stop();
    sound.success.play();
    pacman.state = "paused";
    ghosts.forEach((ghost) => {
      ghost.state = "paused";
    });

    ghostSpeed += GHOST_SPEED_INCREMENT;
    ghostReleaseIntervals = ghostReleaseIntervals.map((interval, index) => {
      if (index === 0) return interval;
      else if (index === 1 && interval > 1) return interval - 1;
      else if (index === 2 && interval > 2) return interval - 1;
      else if (index === 3 && interval > 3) return interval - 1;
    });

    setTimeout(() => {
      currentLevelIndex++;

      if (currentLevelIndex > maps.length - 1) currentLevelIndex = 0;
      boundaries = generateBoundaries(currentLevelIndex, maps);
      game.init();
      game.initStart();
    }, 1000);
  },

  pause() {
    Howler.stop();
    pacman.state = "paused";
    ghosts.forEach((ghost) => {
      if (ghost.state === "active" || ghost.state === "enteringGame")
        ghost.state = "paused";
    });
  },

  resume() {
    sound.siren.play();
    this.isPaused = false;
    pacman.state = "active";
    ghosts.forEach((ghost) => {
      if (ghost.state === "paused" || ghost.state === "enteringGame")
        ghost.state = "active";
    });
  },

  end() {
    Howler.stop();
    sound.gameOver.play();
    document.querySelector("#gameOverScoreLabel").innerHTML = score;
    document.querySelector("#endScreen").style.display = "block";
    document.querySelector("#pauseButton").style.display = "none";
  },

  restart() {
    score = 0;
    lives = 3;
    pellets = [];
    powerUps = [];
    items = [];
    scoreEl.innerHTML = score;
    liveEl.innerHTML = lives;
    currentLevelIndex = 0;
    ghostSpeed = 75;
    ghostReleaseIntervals = [0, 5, 10, 15];
    boundaries = generateBoundaries(currentLevelIndex, maps);
    document.querySelector("#pauseButton").style.display = "block";
  },
};

game.init();
game.pause();

function animate() {
  animationId = requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  const currentMs = Date.now();
  const delta = (currentMs - prevMs) / 1000;
  prevMs = currentMs;

  if (pacman.state === "active") accumatedTime += delta;

  if (
    (keys.w.pressed && lastKey === "w") ||
    (keys.ArrowUp.pressed && lastKey === "ArrowUp")
  )
    pacman.move("up");
  else if (
    (keys.a.pressed && lastKey === "a") ||
    (keys.ArrowLeft.pressed && lastKey === "ArrowLeft")
  )
    pacman.move("left");
  else if (
    (keys.s.pressed && lastKey === "s") ||
    (keys.ArrowDown.pressed && lastKey === "ArrowDown")
  )
    pacman.move("down");
  else if (
    (keys.d.pressed && lastKey === "d") ||
    (keys.ArrowRight.pressed && lastKey === "ArrowRight")
  )
    pacman.move("right");

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
      sound.pellets[pelletSoundIndex].play();
      pelletSoundIndex = pelletSoundIndex === 1 ? 0 : pelletSoundIndex++;

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
      Howler.stop();
      sound.powerUp.play();
      sound.ghostScared.play();
      powerUps.splice(i, 1);

      ghostScaredSoundId = setTimeout(() => {
        Howler.stop();
        if (ghosts.length > 0 && isPaused) sound.siren.play();
      }, 5000);

      ghosts.forEach((ghost) => {
        ghost.state = "preScared";

        setTimeout(() => {
          ghost.state = "preActive";
        }, 5000);
      });
    }
  }

  for (let i = items.length - 1; i >= 0; i--) {
    const item = items[i];

    item.draw();

    if (
      Math.hypot(
        item.position.x - pacman.position.x,
        item.position.y - pacman.position.y
      ) <
      item.radius + pacman.radius
    ) {
      sound.cherry.play();
      items.splice(i, 1);
      score += 50;
      scoreEl.innerHTML = score;
    }
  }

  for (let i = ghosts.length - 1; i >= 0; i--) {
    const ghost = ghosts[i];

    if (
      Math.hypot(
        ghost.position.x - pacman.position.x,
        ghost.position.y - pacman.position.y
      ) <
        ghost.radius + pacman.radius &&
      pacman.state === "active"
    ) {
      if (ghost.state === "scared") {
        ghosts.splice(i, 1);
      } else {
        lives--;
        liveEl.innerHTML = lives;
        pacman.die(lives, game);
        ghosts.forEach((ghost) => {
          ghost.state = "paused";
        });
      }
    }
  }

  if (
    pellets.length === 0 &&
    powerUps.length === 0 &&
    pacman.state === "active"
  ) {
    game.nextRound();
  }

  boundaries.forEach((boundary) => {
    boundary.draw();
  });

  pacman.update(delta, boundaries);

  ghosts.forEach((ghost, index) => {
    ghost.update(delta, boundaries);

    if (accumatedTime > ghostReleaseIntervals[index] && !ghost.outOfCage)
      ghost.enterGame(ghostPositions[currentLevelIndex][1]);
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

document.querySelector("#startButton").addEventListener("click", () => {
  sound.success.play();
  document.querySelector("#startScreen").style.display = "none";
  document.querySelector("#readyTag").style.display = "block";

  setTimeout(() => {
    document.querySelector("#readyTag").style.display = "none";
    document.querySelector("#goTag").style.display = "block";
    document.querySelector("#liveCounter").style.display = "block";
    document.querySelector("#pauseButton").style.display = "block";
    gsap.to("#goTag", {
      delay: 0.25,
      opacity: 0,
    });
    game.init();
    sound.siren.play();
  }, 1500);
});

document.querySelector("#restartButton").addEventListener("click", () => {
  document.querySelector("#endScreen").style.display = "none";
  game.restart();
  game.init();
  game.initStart();
});

document.querySelector("#pauseButton").addEventListener("click", () => {
  if (game.isPaused) {
    game.resume();
  } else {
    game.pause();
    game.isPaused = true;
  }
});
