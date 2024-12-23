import { ItemCooldownComponent, ItemStack, Player } from '@minecraft/server';

export class ComponentItemCooldown {
    static get(item: ItemStack): ItemCooldownComponent {
        return item.getComponent('cooldown') as ItemCooldownComponent;
    }

    static getCooldownCategory(item: ItemStack): string {
        return ComponentItemCooldown.get(item).cooldownCategory;
    }

    static getCooldownTicks(item: ItemStack): number {
        return ComponentItemCooldown.get(item).cooldownTicks;
    }

    static getCooldownTicksRemaining(item: ItemStack, player: Player): number {
        return ComponentItemCooldown.get(item).getCooldownTicksRemaining(
            player
        );
    }

    static isCooldownCategory(item: ItemStack, category: string): boolean {
        return ComponentItemCooldown.get(item).isCooldownCategory(category);
    }

    static startCooldown(item: ItemStack, player: Player): void {
        ComponentItemCooldown.get(item).startCooldown(player);
    }
}
