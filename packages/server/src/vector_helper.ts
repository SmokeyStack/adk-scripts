import { Vector3 } from '@minecraft/server';

export class Vector3Helper {
    static equals(vector1: Vector3, vector2: Vector3): boolean {
        return (
            vector1.x == vector2.x &&
            vector1.y == vector2.y &&
            vector1.z == vector2.z
        );
    }

    static add(vector1: Vector3, vector2: Vector3): Vector3 {
        return {
            x: vector1.x + vector2.x,
            y: vector1.y + vector2.y,
            z: vector1.z + vector2.z
        };
    }

    static subtract(vector1: Vector3, vector2: Vector3): Vector3 {
        return {
            x: vector1.x - vector2.x,
            y: vector1.y - vector2.y,
            z: vector1.z - vector2.z
        };
    }

    static scale(vector: Vector3, scalar: number): Vector3 {
        return {
            x: vector.x * scalar,
            y: vector.y * scalar,
            z: vector.z * scalar
        };
    }

    static dot(vector1: Vector3, vector2: Vector3): number {
        return (
            vector1.x * vector2.x +
            vector1.y * vector2.y +
            vector1.z * vector2.z
        );
    }

    static cross(vector1: Vector3, vector2: Vector3): Vector3 {
        return {
            x: vector1.y * vector2.z - vector1.z * vector2.y,
            y: vector1.z * vector2.x - vector1.x * vector2.z,
            z: vector1.x * vector2.y - vector1.y * vector2.x
        };
    }

    static magnitude(vector: Vector3): number {
        return Math.sqrt(
            vector.x * vector.x + vector.y * vector.y + vector.z * vector.z
        );
    }

    static distance(vector1: Vector3, vector2: Vector3): number {
        return Vector3Helper.magnitude(
            Vector3Helper.subtract(vector1, vector2)
        );
    }

    static normalize(vector: Vector3): Vector3 {
        return Vector3Helper.scale(vector, 1 / Vector3Helper.magnitude(vector));
    }

    static floor(vector: Vector3): Vector3 {
        return {
            x: Math.floor(vector.x),
            y: Math.floor(vector.y),
            z: Math.floor(vector.z)
        };
    }

    static toString(
        vector: Vector3,
        options?: { decimals?: number; delimiter?: string }
    ): string {
        const decimals = options?.decimals ?? 2;
        const string: string[] = [
            vector.x.toFixed(decimals),
            vector.y.toFixed(decimals),
            vector.z.toFixed(decimals)
        ];

        return string.join(options?.delimiter ?? ', ');
    }

    static multiply(vector1: Vector3, vector2: Vector3): Vector3 {
        return {
            x: vector1.x * vector2.x,
            y: vector1.y * vector2.y,
            z: vector1.z * vector2.z
        };
    }

    static rotateX(vector: Vector3, angle: number): Vector3 {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        return {
            x: vector.x,
            y: vector.y * cos - vector.z * sin,
            z: vector.y * sin + vector.z * cos
        };
    }

    static rotateY(vector: Vector3, angle: number): Vector3 {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        return {
            x: vector.x * cos + vector.z * sin,
            y: vector.y,
            z: -vector.x * sin + vector.z * cos
        };
    }

    static rotateZ(vector: Vector3, angle: number): Vector3 {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        return {
            x: vector.x * cos - vector.y * sin,
            y: vector.x * sin + vector.y * cos,
            z: vector.z
        };
    }
}
