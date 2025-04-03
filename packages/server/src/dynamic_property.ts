import { Entity, ItemStack, Vector3 } from '@minecraft/server';

export class DynamicPropertyHelper {
    static setDynamicProperties(
        target: Entity | ItemStack,
        properties: Record<
            string,
            boolean | number | string | Vector3 | undefined
        >
    ): void {
        for (const key in properties)
            target.setDynamicProperty(key, properties[key]);
    }
}
