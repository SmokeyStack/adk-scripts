import { Direction, Entity } from '@minecraft/server';
import { Vector3Builder } from './vector';
import { Vector3Helper } from './vector_helper';
import { MathHelper } from './math';

export const DirectionType = {
    Horizontal: [
        Direction.North,
        Direction.East,
        Direction.South,
        Direction.West
    ],
    Vertical: [Direction.Up, Direction.Down]
};

export class DirectionHelper {
    static getOpposite(direction: Direction): Direction {
        switch (direction) {
            case Direction.North:
                return Direction.South;
            case Direction.East:
                return Direction.West;
            case Direction.South:
                return Direction.North;
            case Direction.West:
                return Direction.East;
            case Direction.Up:
                return Direction.Down;
            case Direction.Down:
                return Direction.Up;
        }
    }

    static toVector3(direction: Direction): Vector3Builder {
        switch (direction) {
            case Direction.Down:
                return new Vector3Builder(0, -1, 0);
            case Direction.Up:
                return new Vector3Builder(0, 1, 0);
            case Direction.North:
                return new Vector3Builder(0, 0, -1);
            case Direction.South:
                return new Vector3Builder(0, 0, 1);
            case Direction.West:
                return new Vector3Builder(-1, 0, 0);
            case Direction.East:
                return new Vector3Builder(1, 0, 0);
        }
    }

    static getOffsetX(direction: Direction): number {
        return this.toVector3(direction).x;
    }

    static getOffsetY(direction: Direction): number {
        return this.toVector3(direction).y;
    }

    static getOffsetZ(direction: Direction): number {
        return this.toVector3(direction).z;
    }

    static fromVector3(vector: Vector3Builder): Direction {
        if (Vector3Helper.equals(vector, new Vector3Builder(0, -1, 0)))
            return Direction.Down;
        if (Vector3Helper.equals(vector, new Vector3Builder(0, 1, 0)))
            return Direction.Up;
        if (Vector3Helper.equals(vector, new Vector3Builder(0, 0, -1)))
            return Direction.North;
        if (Vector3Helper.equals(vector, new Vector3Builder(0, 0, 1)))
            return Direction.South;
        if (Vector3Helper.equals(vector, new Vector3Builder(-1, 0, 0)))
            return Direction.West;
        if (Vector3Helper.equals(vector, new Vector3Builder(1, 0, 0)))
            return Direction.East;
    }

    static getEntityFacingDirection(entity: Entity): Direction[] {
        const pitch = MathHelper.degreesToRadians(entity.getRotation().x);
        const yaw = -MathHelper.degreesToRadians(entity.getRotation().y);
        const pitch_sin = Math.sin(pitch);
        const pitch_cos = Math.cos(pitch);
        const yaw_sin = Math.sin(yaw);
        const yaw_cos = Math.cos(yaw);
        const is_yaw_sin_positive = yaw_sin > 0.0;
        const is_pitch_sin_positive = pitch_sin < 0.0;
        const is_yaw_cos_positive = yaw_cos > 0.0;
        const abs_yaw_sin = is_yaw_sin_positive ? yaw_sin : -yaw_sin;
        const abs_pitch_sin = is_pitch_sin_positive ? -pitch_sin : pitch_sin;
        const abs_yaw_cos = is_yaw_cos_positive ? yaw_cos : -yaw_cos;
        const new_yaw_sin = abs_yaw_sin * pitch_cos;
        const new_yaw_cos = abs_yaw_cos * pitch_cos;
        const direction = is_yaw_sin_positive ? Direction.East : Direction.West;
        const direction2 = is_pitch_sin_positive
            ? Direction.Up
            : Direction.Down;
        const direction3 = is_yaw_cos_positive
            ? Direction.South
            : Direction.North;

        if (abs_yaw_sin > abs_yaw_cos) {
            if (abs_pitch_sin > new_yaw_sin)
                return this.getEntityFacingDirectionHelper(
                    direction2,
                    direction,
                    direction3
                );
            if (new_yaw_cos > abs_pitch_sin)
                return this.getEntityFacingDirectionHelper(
                    direction,
                    direction3,
                    direction2
                );
            return this.getEntityFacingDirectionHelper(
                direction,
                direction2,
                direction3
            );
        }
        if (abs_pitch_sin > new_yaw_cos)
            return this.getEntityFacingDirectionHelper(
                direction2,
                direction3,
                direction
            );
        if (new_yaw_sin > abs_pitch_sin)
            return this.getEntityFacingDirectionHelper(
                direction3,
                direction,
                direction2
            );
        return this.getEntityFacingDirectionHelper(
            direction3,
            direction2,
            direction
        );
    }

    private static getEntityFacingDirectionHelper(
        direction: Direction,
        direction2: Direction,
        direction3: Direction
    ): Direction[] {
        return [
            direction,
            direction2,
            direction3,
            this.getOpposite(direction),
            this.getOpposite(direction2),
            this.getOpposite(direction3)
        ];
    }

    static rotateYClockwise(direction: Direction): Direction {
        switch (direction) {
            case Direction.North:
                return Direction.East;
            case Direction.East:
                return Direction.South;
            case Direction.South:
                return Direction.West;
            case Direction.West:
                return Direction.North;
            default:
                throw new Error(
                    `Unable to get Y-rotated facing of ${direction}`
                );
        }
    }

    static rotateYCounterClockwise(direction: Direction): Direction {
        switch (direction) {
            case Direction.North:
                return Direction.West;
            case Direction.East:
                return Direction.North;
            case Direction.South:
                return Direction.East;
            case Direction.West:
                return Direction.South;
            default:
                throw new Error(
                    `Unable to get Y-rotated facing of ${direction}`
                );
        }
    }

    static rotateXClockwise(direction: Direction): Direction {
        switch (direction) {
            case Direction.Up:
                return Direction.North;
            case Direction.North:
                return Direction.Down;
            case Direction.Down:
                return Direction.South;
            case Direction.South:
                return Direction.Up;
            default:
                throw new Error(
                    `Unable to get X-rotated facing of ${direction}`
                );
        }
    }

    static rotateXCounterClockwise(direction: Direction): Direction {
        switch (direction) {
            case Direction.Up:
                return Direction.South;
            case Direction.North:
                return Direction.Up;
            case Direction.Down:
                return Direction.North;
            case Direction.South:
                return Direction.Down;
            default:
                throw new Error(
                    `Unable to get X-rotated facing of ${direction}`
                );
        }
    }

    static rotateZClockwise(direction: Direction): Direction {
        switch (direction) {
            case Direction.Up:
                return Direction.East;
            case Direction.East:
                return Direction.Down;
            case Direction.Down:
                return Direction.West;
            case Direction.West:
                return Direction.Up;
            default:
                throw new Error(
                    `Unable to get Z-rotated facing of ${direction}`
                );
        }
    }

    static rotateZCounterClockwise(direction: Direction): Direction {
        switch (direction) {
            case Direction.Up:
                return Direction.West;
            case Direction.East:
                return Direction.Up;
            case Direction.Down:
                return Direction.East;
            case Direction.West:
                return Direction.Down;
            default:
                throw new Error(
                    `Unable to get Z-rotated facing of ${direction}`
                );
        }
    }

    static fromHorizontalIndex(index: number): Direction {
        return DirectionType.Horizontal[
            index % DirectionType.Horizontal.length
        ];
    }

    static fromVerticalIndex(index: number): Direction {
        return DirectionType.Vertical[index % DirectionType.Vertical.length];
    }

    static fromRotation(rotation: number): Direction {
        return DirectionType.Horizontal[
            Math.floor(MathHelper.wrap(rotation, 0, 360) / 90)
        ];
    }

    static toRotation(direction: Direction): number {
        return DirectionType.Horizontal.indexOf(direction) * 90;
    }

    static random(): Direction {
        const randomIndex = MathHelper.randomInt(
            0,
            Object.keys(Direction).length
        );
        return Direction[Object.keys(Direction)[randomIndex]];
    }
}
