import { BlockPermutation, Dimension, world } from '@minecraft/server';

const dimensions: { [key: string]: Dimension } = {};
const dimensionsHeightRange: { [key: string]: [number, number] } = {};
const permutations: { [key: string]: BlockPermutation } = {};

export class Cache {
    static getDimension(name: string): Dimension {
        if (dimensions[name]) return dimensions[name];
        return (dimensions[name] = world.getDimension(name));
    }

    static getDimensionHeightRange(name: string): [number, number] {
        const dimension = Cache.getDimension(name);
        return (dimensionsHeightRange[name] = [
            dimension.heightRange.min,
            dimension.heightRange.max
        ]);
    }

    static getBlockPermutation(
        block: string,
        states?: Record<string, boolean | number | string>
    ): BlockPermutation {
        const key = `${block}:${JSON.stringify(states)}`;

        if (permutations[key]) return permutations[key];
        return (permutations[key] = BlockPermutation.resolve(block, states));
    }
}
