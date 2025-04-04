import { NumberRange } from '@minecraft/common';
import { BlockPermutation, Dimension, world } from '@minecraft/server';

/**
 * A cache utility class for storing and retrieving Minecraft dimensions, height ranges,
 * and block permutations to improve performance by avoiding redundant computations.
 */
export class Cache {
    /**
     * Retrieves a `Dimension` object by its name. If the dimension is already cached,
     * it returns the cached instance; otherwise, it fetches the dimension from the world
     * and caches it.
     *
     * @param name - The name of the dimension (e.g., "overworld", "nether", "the_end").
     * @returns The `Dimension` object corresponding to the given name.
     */
    static getDimension(name: string): Dimension {
        if (dimensions[name]) return dimensions[name];
        return (dimensions[name] = world.getDimension(name));
    }

    /**
     * Retrieves the height range of a dimension by its name. If the height range is
     * already cached, it returns the cached value; otherwise, it fetches the height
     * range from the dimension and caches it.
     *
     * @param name - The name of the dimension (e.g., "overworld", "nether", "the_end").
     * @returns A `NumberRange` object representing the height range of the dimension.
     */
    static getDimensionHeightRange(name: string): NumberRange {
        if (dimensions_height_range[name]) return dimensions_height_range[name];
        return (dimensions_height_range[name] =
            Cache.getDimension(name).heightRange);
    }

    /**
     * Retrieves a `BlockPermutation` object for a given block and its states. If the
     * permutation is already cached, it returns the cached instance; otherwise, it
     * resolves the permutation and caches it.
     *
     * @param block - The identifier of the block (e.g., "minecraft:stone").
     * @param states - An optional object representing the block's states (e.g., `{ facing: "north" }`).
     * @returns The `BlockPermutation` object for the specified block and states.
     */
    static getBlockPermutation(
        block: string,
        states?: Record<string, boolean | number | string>
    ): BlockPermutation {
        const key = `${block}:${JSON.stringify(states)}`;

        if (permutations[key]) return permutations[key];
        return (permutations[key] = BlockPermutation.resolve(block, states));
    }
}

// Internal caches for dimensions, height ranges, and block permutations.
const dimensions: { [key: string]: Dimension } = {};
const dimensions_height_range: { [key: string]: NumberRange } = {};
const permutations: { [key: string]: BlockPermutation } = {};
