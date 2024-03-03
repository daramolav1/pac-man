class Item {
  constructor({ position, imgSrc = "./images/sprites/cherry.png" }) {
    this.position = position;
    this.radius = 8;
    this.imageLoaded = false;
    this.image = new Image();
    this.image.src = imgSrc;
    this.image.onload = () => {
      this.imageLoaded = true;
    };
    this.center = JSON.parse(JSON.stringify(position));
    this.radians = 0;
  }

  draw() {
    if (!this.imageLoaded) return;

    context.drawImage(
      this.image,
      this.position.x - this.image.width / 2,
      this.position.y - this.image.height / 2
    );

    this.radians += 0.075;

    this.position.x = this.center.x + Math.cos(this.radians);
    this.position.y = this.center.y + Math.sin(this.radians);
  }
}
