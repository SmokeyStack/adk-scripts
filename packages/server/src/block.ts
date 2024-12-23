import { Block } from '@minecraft/server';

export default class BlockHelper {
    static blocksMovement(block: Block): boolean {
        return (
            block.typeId != 'minecraft:cobweb' &&
            block.typeId != 'minecraft:bamboo_sapling' &&
            !block.isLiquid &&
            !block.isAir
        );
    }
}
