class Pacman {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
    this.radians = 0.75;
    this.openRate = 0.12;
    this.rotation = 0;
  }

  draw() {
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.rotation);
    context.translate(-this.position.x, -this.position.y);
    context.beginPath();
    context.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0 + this.radians,
      Math.PI * 2 - this.radians
    );
    context.lineTo(this.position.x, this.position.y);
    context.fillStyle = "yellow";
    context.fill();
    context.closePath();
    context.restore();
  }

  moveUp(boundaries) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      if (
        collisionWithBoundary({
          circle: { ...this, velocity: { x: 0, y: -5 } },
          rectangle: boundary,
        })
      ) {
        this.velocity.y = 0;
        break;
      } else {
        this.velocity.y = -5;
      }
    }
  }

  moveLeft(boundaries) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      if (
        collisionWithBoundary({
          circle: { ...this, velocity: { x: -5, y: 0 } },
          rectangle: boundary,
        })
      ) {
        this.velocity.x = 0;
        break;
      } else {
        this.velocity.x = -5;
      }
    }
  }

  moveDown(boundaries) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      if (
        collisionWithBoundary({
          circle: { ...this, velocity: { x: 0, y: 5 } },
          rectangle: boundary,
        })
      ) {
        this.velocity.y = 0;
        break;
      } else {
        this.velocity.y = 5;
      }
    }
  }

  moveRight(boundaries) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      if (
        collisionWithBoundary({
          circle: { ...this, velocity: { x: 5, y: 0 } },
          rectangle: boundary,
        })
      ) {
        this.velocity.x = 0;
        break;
      } else {
        this.velocity.x = 5;
      }
    }
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.radians < 0 || this.radians > 0.75) {
      this.openRate = -this.openRate;
    }

    this.radians += this.openRate;
  }
}
