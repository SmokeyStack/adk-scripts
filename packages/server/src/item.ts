import { Component, ItemStack, RGB } from '@minecraft/server';
import { ComponentItemDurability } from './item_component';
import { MathHelper } from './math';

export class ItemHelper {
    static setDamge(item: ItemStack, damage: number): void {
        ComponentItemDurability.get(item).damage = damage;
    }

    static applyDamage(item: ItemStack, damage: number): void {
        ComponentItemDurability.get(item).damage += damage;
    }

    static getDurability(item: ItemStack): number {
        return (
            ComponentItemDurability.get(item).maxDurability -
            ComponentItemDurability.get(item).damage
        );
    }

    static isDamaged(item: ItemStack): boolean {
        return ComponentItemDurability.getDamage(item) > 0;
    }

    static splitStack(item: ItemStack, count: number): ItemStack {
        const amount = Math.min(count, item.amount);
        const newItem = item.clone();
        newItem.amount = amount;
        item.amount -= amount;

        return newItem;
    }

    static isDamageable(item: ItemStack): boolean {
        return item.hasComponent('durability');
    }

    static isEnchantable(item: ItemStack): boolean {
        return item.hasComponent('enchantable');
    }

    static getItemBarStep(item: ItemStack): number {
        return MathHelper.clamp(
            Math.round(
                13.0 -
                    (ComponentItemDurability.getDamage(item) * 13.0) /
                        ComponentItemDurability.getMaxDurability(item)
            ),
            0,
            13
        );
    }

    static getItemBarColor(item: ItemStack): RGB {
        const max_durability = ComponentItemDurability.getMaxDurability(item);
        const hue =
            Math.max(
                0.0,
                max_durability - ComponentItemDurability.getDamage(item)
            ) / max_durability;

        return MathHelper.hsvToRgb(hue / 3.0, 1.0, 1.0);
    }
}
