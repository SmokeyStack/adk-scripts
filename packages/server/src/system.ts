import {
    BlockCustomComponent,
    ItemCustomComponent,
    world
} from '@minecraft/server';

export class SystemHelper {
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

    static registerCustomComponentItem(
        id: string,
        component: ItemCustomComponent
    ): void {
        world.beforeEvents.worldInitialize.subscribe((eventData) => {
            eventData.itemComponentRegistry.registerCustomComponent(
                id,
                component
            );
        });
    }
}
