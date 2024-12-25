import {
    Player,
    EntityInventoryComponent,
    Container,
    ItemStack,
    GameMode,
    ItemDurabilityComponent,
    EquipmentSlot,
    EntityEquippableComponent
} from '@minecraft/server';

export class PlayerHelper {
    static decrementStack(player: Player, amount: number = 1): void {
        if (player.getGameMode() == GameMode.creative) return;

        const item: ItemStack = (
            player.getComponent('inventory') as EntityInventoryComponent
        ).container.getItem(player.selectedSlotIndex);
        const inventory: Container = (
            player.getComponent('inventory') as EntityInventoryComponent
        ).container;

        if (item.amount < -amount)
            inventory.setItem(player.selectedSlotIndex, undefined);
        else
            inventory.setItem(
                player.selectedSlotIndex,
                new ItemStack(item.typeId, item.amount - amount)
            );
    }

    static decrementDurability(player: Player, amount: number = 1): void {
        if (player.getGameMode() == GameMode.creative) return;

        const item: ItemStack = (
            player.getComponent('inventory') as EntityInventoryComponent
        ).container.getItem(player.selectedSlotIndex);
        const inventory: Container = (
            player.getComponent('inventory') as EntityInventoryComponent
        ).container;
        const durability: ItemDurabilityComponent = item.getComponent(
            'durability'
        ) as ItemDurabilityComponent;
        durability.damage += amount;
        inventory.setItem(player.selectedSlotIndex, item);
    }

    static getItemFromEquippable(
        player: Player,
        slot: EquipmentSlot
    ): ItemStack {
        return (
            player.getComponent('equippable') as EntityEquippableComponent
        ).getEquipment(slot);
    }

    static getItemFromInventory(player: Player, slot: number): ItemStack {
        return (
            player.getComponent('inventory') as EntityInventoryComponent
        ).container.getItem(slot);
    }
}
