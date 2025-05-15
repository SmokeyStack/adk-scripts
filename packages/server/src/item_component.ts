import {
    Container,
    Enchantment,
    EnchantmentSlot,
    EnchantmentType,
    ItemCooldownComponent,
    ItemDurabilityComponent,
    ItemEnchantableComponent,
    ItemFoodComponent,
    ItemInventoryComponent,
    ItemStack,
    Player
} from '@minecraft/server';
import * as minecraftcommon from '@minecraft/common';

class ComponentItemCooldown {
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

class ComponentItemDurability {
    static get(item: ItemStack): ItemDurabilityComponent {
        return item.getComponent('durability') as ItemDurabilityComponent;
    }

    static getDamage(item: ItemStack): number {
        return ComponentItemDurability.get(item).damage;
    }

    static getMaxDurability(item: ItemStack): number {
        return ComponentItemDurability.get(item).maxDurability;
    }

    static getDamageChance(
        item: ItemStack,
        unbreakingEnchantmentLevel?: number
    ): number {
        return ComponentItemDurability.get(item).getDamageChance(
            unbreakingEnchantmentLevel
        );
    }

    static getDamageChanceRange(item: ItemStack): minecraftcommon.NumberRange {
        return ComponentItemDurability.get(item).getDamageChanceRange();
    }
}

class ComponentItemEnchantable {
    static get(item: ItemStack): ItemEnchantableComponent {
        return item.getComponent('enchantable') as ItemEnchantableComponent;
    }

    static getSlots(item: ItemStack): EnchantmentSlot[] {
        return ComponentItemEnchantable.get(item).slots;
    }

    static addEnchantment(item: ItemStack, enchantment: Enchantment): void {
        ComponentItemEnchantable.get(item).addEnchantment(enchantment);
    }

    static addEnchantments(item: ItemStack, enchantments: Enchantment[]): void {
        ComponentItemEnchantable.get(item).addEnchantments(enchantments);
    }

    static canAddEnchantment(
        item: ItemStack,
        enchantment: Enchantment
    ): boolean {
        return ComponentItemEnchantable.get(item).canAddEnchantment(
            enchantment
        );
    }

    static getEnchantment(
        item: ItemStack,
        enchantmentType: EnchantmentType | string
    ): Enchantment | undefined {
        return ComponentItemEnchantable.get(item).getEnchantment(
            enchantmentType
        );
    }

    static getEnchantments(item: ItemStack): Enchantment[] {
        return ComponentItemEnchantable.get(item).getEnchantments();
    }

    static hasEnchantment(
        item: ItemStack,
        enchantmentType: EnchantmentType | string
    ): boolean {
        return ComponentItemEnchantable.get(item).hasEnchantment(
            enchantmentType
        );
    }

    static removeAllEnchantments(item: ItemStack): void {
        ComponentItemEnchantable.get(item).removeAllEnchantments();
    }

    static removeEnchantment(
        item: ItemStack,
        enchantmentType: EnchantmentType | string
    ): void {
        ComponentItemEnchantable.get(item).removeEnchantment(enchantmentType);
    }
}

class ComponentItemFood {
    static get(item: ItemStack): ItemFoodComponent {
        return item.getComponent('food') as ItemFoodComponent;
    }

    static getCanAlwaysEat(item: ItemStack): boolean {
        return ComponentItemFood.get(item).canAlwaysEat;
    }

    static getNutrition(item: ItemStack): number {
        return ComponentItemFood.get(item).nutrition;
    }

    static getSaturationModifier(item: ItemStack): number {
        return ComponentItemFood.get(item).saturationModifier;
    }

    static getUsingConvertsTo(item: ItemStack): string {
        return ComponentItemFood.get(item).usingConvertsTo;
    }
}

class ComponentItemInventory {
    static get(item: ItemStack): ItemInventoryComponent {
        return item.getComponent('inventory') as ItemInventoryComponent;
    }

    static getContainer(item: ItemStack): Container {
        return ComponentItemInventory.get(item).container;
    }
}

export {
    ComponentItemCooldown,
    ComponentItemDurability,
    ComponentItemEnchantable,
    ComponentItemFood,
    ComponentItemInventory
};
