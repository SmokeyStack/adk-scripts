import { RGB, RGBA, VectorXZ } from '@minecraft/server';
import { Vector3Builder } from './vector';

export class MathHelper {
    static clamp(value: number, min: number, max: number): number {
        return Math.min(Math.max(value, min), max);
    }

    static lerp(start: number, end: number, percent: number): number {
        return start + percent * (end - start);
    }

    static lerpAngle(start: number, end: number, percent: number): number {
        const angle = ((end - start + 180) % 360) - 180;

        return start + angle * percent;
    }

    static degreesToRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
    }

    static radiansToDegrees(radians: number): number {
        return radians * (180 / Math.PI);
    }

    static approximate(
        value: number,
        target: number,
        threshold: number = 0.0001
    ): boolean {
        return Math.abs(value - target) <= threshold;
    }

    static random(min: number, max: number): number {
        return min + Math.random() * (max - min);
    }

    static randomInt(min: number, max: number): number {
        return Math.floor(MathHelper.random(min, max));
    }

    static randomBoolean(): boolean {
        return Math.random() < 0.5;
    }

    static positionToChunk(position: Vector3Builder): VectorXZ {
        return {
            x: Math.floor(position.x / 16),
            z: Math.floor(position.z / 16)
        };
    }

    static chunkToPosition(chunk: VectorXZ): Vector3Builder {
        return new Vector3Builder(chunk.x * 16, 0, chunk.z * 16);
    }

    static wrap(value: number, min: number, max: number): number {
        const range = max - min + 1;
        return ((((value - min) % range) + range) % range) + min;
    }

    static wrapAngle(angle: number): number {
        return MathHelper.wrap(angle, 0, 359);
    }

    static hsvToRgb(h: number, s: number, v: number): RGB {
        let r: number, g: number, b: number;

        let i = Math.floor(h * 6);
        let f = h * 6 - i;
        let p = v * (1 - s);
        let q = v * (1 - f * s);
        let t = v * (1 - (1 - f) * s);

        switch (i % 6) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            case 5:
                r = v;
                g = p;
                b = q;
                break;
        }

        return {
            red: Math.round(r * 255),
            green: Math.round(g * 255),
            blue: Math.round(b * 255)
        };
    }

    static areRGBAEqual(a: RGBA, b: RGBA): boolean {
        return (
            this.approximate(a.alpha, b.alpha, 0.01) &&
            this.approximate(a.red, b.red, 0.01) &&
            this.approximate(a.green, b.green, 0.01) &&
            this.approximate(a.blue, b.blue, 0.01)
        );
    }
}
