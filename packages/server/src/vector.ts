import { Vector3 } from '@minecraft/server';
import { Vector3Helper } from './vector_helper';

export class Vector3Builder implements Vector3 {
    x: number;
    y: number;
    z: number;

    constructor(vector: Vector3, arg?: never, arg2?: never);
    constructor(x: number, y: number, z: number);
    constructor(first: number | Vector3, second?: number, third?: number) {
        if (typeof first == 'object') {
            this.x = first.x;
            this.y = first.y;
            this.z = first.z;
        } else {
            this.x = first;
            this.y = second ?? 0;
            this.z = third ?? 0;
        }
    }

    assign(vector: Vector3): this {
        this.x = vector.x;
        this.y = vector.y;
        this.z = vector.z;

        return this;
    }

    equals(vector: Vector3): boolean {
        return Vector3Helper.equals(this, vector);
    }

    add(vector: Vector3): this {
        return this.assign(Vector3Helper.add(this, vector));
    }

    subtract(vector: Vector3): this {
        return this.assign(Vector3Helper.subtract(this, vector));
    }

    scale(scalar: number): this {
        return this.assign(Vector3Helper.scale(this, scalar));
    }

    dot(vector: Vector3): number {
        return Vector3Helper.dot(this, vector);
    }

    cross(vector: Vector3): this {
        return this.assign(Vector3Helper.cross(this, vector));
    }

    magnitude(): number {
        return Vector3Helper.magnitude(this);
    }

    distance(vector: Vector3): number {
        return Vector3Helper.magnitude(Vector3Helper.subtract(this, vector));
    }

    normalize(): this {
        return this.assign(Vector3Helper.normalize(this));
    }

    floor(): this {
        return this.assign(Vector3Helper.floor(this));
    }

    toString(options?: { decimals?: number; delimeter?: string }): string {
        return Vector3Helper.toString(this, options);
    }

    multiply(vector: Vector3): this {
        return this.assign(Vector3Helper.multiply(this, vector));
    }

    rotateX(angle: number): this {
        return this.assign(Vector3Helper.rotateX(this, angle));
    }

    rotateY(angle: number): this {
        return this.assign(Vector3Helper.rotateY(this, angle));
    }

    rotateZ(angle: number): this {
        return this.assign(Vector3Helper.rotateZ(this, angle));
    }

    clone(): Vector3 {
        return new Vector3Builder(this);
    }
}
