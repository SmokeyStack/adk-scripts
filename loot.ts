import { Dimension, Entity, Player } from '@minecraft/server';

const enum LootSlot {
    MainHand = 'mainhand',
    OffHand = 'offhand'
}

const enum LootMethod {
    Kill = 'kill',
    Loot = 'loot',
    Mine = 'mine'
}

class LootHelper {
    static giveLoot(
        players: Player | string,
        type: LootMethod,
        entity: Entity | string,
        tool?: LootSlot | string
    ): void {
        const command: string = `loot give ${players} ${type} ${entity} ${tool || ''}`;
        console.log(command);
    }
}
