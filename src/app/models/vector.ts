 export class Vector {
  x: number;
  y: number;
  /**
   * Creates the vector with it's position of x and y,
   * that doesn't exactly mean the postition on the game's screen.
   */
  constructor(x: number, y: number) {
      this.set(x, y);
  }

  /**
   * Sets the new attributes to the vector
   */
  set(x: number, y: number) {
      this.x = x;
      this.y = y;
  }

  /**
   * Multiplies the vector on a given scale,
   * it is used to extend or shorten vector
   */
  mult(scale: number) {
      this.x *= scale;
      this.y *= scale;
      return this;
  }

  /**
   * Adding vector can help with for example
   * to change the position vector with the given velocity vector.
   */
  add(vector: Vector) {
      this.x += vector.x;
      this.y += vector.y;
      return this;
  }

  /**
   * It is to take the direction vector by
   * subtracting vector position 1 by vector position 2.
   */
  sub(vector: Vector) {
      this.x -= vector.x;
      this.y -= vector.y;
      return this;
  }

  /**
   * Returns the direction length (used to measure the distance between two vectors)
   */
  mag() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Returns the direction of the vector with lenght equal 1,
   * so it is useful because we can use it with many different operations like
   * move the player direction and multiply (.mult()) it
   * to apply the specified speed in given direction.
   */
  normalize() {
      const m = this.mag();
      this.x /= m;
      this.y /= m;
      return this;
  }
}
