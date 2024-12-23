import { BlockCustomComponent, world } from '@minecraft/server';

export default class SystemHelper {
    static registerCustomComponentBlock(
        id: string,
        component: BlockCustomComponent
    ): void {
        world.beforeEvents.worldInitialize.subscribe((eventData) => {
            eventData.blockComponentRegistry.registerCustomComponent(
                id,
                component
            );
        });
    }
}
