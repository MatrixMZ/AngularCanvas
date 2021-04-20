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
  set(x: number, y: number): void {
      this.x = x;
      this.y = y;
  }

  /**
   * Multiplies the vector on a given scale,
   * it is used to extend or shorten vector
   */
  scale(scale: number): Vector {
      this.x *= scale;
      this.y *= scale;
      return this;
  }

  /**
   * Multiplies the vector
   * TODO: FIX DOCS
   */
   mult(scale: Vector): Vector {
      this.x *= scale.x;
      this.y *= scale.y;
      return this;
  }

  /**
   * Adding vector can help with for example
   * to change the position vector with the given velocity vector.
   */
  add(vector: Vector): Vector {
      this.x += vector.x;
      this.y += vector.y;
      return this;
  }

  /**
   * It is to take the direction vector by
   * subtracting vector position 1 by vector position 2.
   */
  sub(vector: Vector): Vector {
      this.x -= vector.x;
      this.y -= vector.y;
      return this;
  }

  /**
   * Returns the direction length (used to measure the distance between two vectors)
   */
  mag(): number {
      return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  distance(vector: Vector): number {
    return Math.sqrt(Math.pow(this.x - vector.x, 2) + Math.pow(this.y - vector.y, 2));
  }

  /**
   * Returns the direction of the vector with lenght equal 1,
   * so it is useful because we can use it with many different operations like
   * move the player direction and multiply (.mult()) it
   * to apply the specified speed in given direction.
   */
  normalize(): Vector {
      const m = this.mag();
      this.x /= m;
      this.y /= m;
      return this;
  }

  /**
   * Copies vector data and creates new to remove reference between objects.
   * @returns Vector with removed reference
   */
  clone(): Vector {
    return new Vector(this.x, this.y);
  }

  // https://shiffman.net/general/2011/02/03/rotate-a-vector-processing-js/
  rotate(theta: number): Vector {
    const x: number = this.x;
    this.x = this.x * Math.cos(theta) - this.y * Math.sin(theta);
    this.y = x * Math.sin(theta) + this.y * Math.cos(theta);

    return this;
  }
}
