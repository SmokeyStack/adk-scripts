import { Direction } from '@minecraft/server';
import Vector3Builder from './vector';

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
                return new Vector3Builder(-1, 0, 0);
        }
    }
}
