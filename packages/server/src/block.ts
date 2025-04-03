import { Block, Dimension } from '@minecraft/server';
import { Vector3Builder } from './vector';

export class BlockHelper {
    static blocksMovement(block: Block): boolean {
        return (
            block.typeId != 'minecraft:web' &&
            block.typeId != 'minecraft:bamboo_sapling' &&
            !block.isLiquid &&
            !block.isAir
        );
    }

    static destroyBlockAndSpawnLoot(
        dimension: Dimension,
        location: Vector3Builder
    ): void {
        dimension.runCommand(
            `setblock ${location.x} ${location.y} ${location.z} air destroy`
        );
    }
}
