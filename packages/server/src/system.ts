import {
    BlockCustomComponent,
    ItemCustomComponent,
    system
} from '@minecraft/server';

/**
 * A helper class for managing the registration of custom components for blocks and items.
 * This class ensures that custom components are registered with the system during startup.
 */
export class SystemHelper {
    /**
     * Registers a custom component for a block.
     *
     * @param id - The unique identifier for the custom block component.
     * @param component - The custom block component to register.
     *
     * @remarks
     * This method adds the block component to the internal registry and ensures
     * that the system is initialized to register the component during startup.
     */
    static registerCustomComponentBlock(
        id: string,
        component: BlockCustomComponent
    ): void {
        SystemHelper.block_component_registry.set(id, component);
        SystemHelper.initialize();
    }

    /**
     * Registers a custom component for an item.
     *
     * @param id - The unique identifier for the custom item component.
     * @param component - The custom item component to register.
     *
     * @remarks
     * This method adds the item component to the internal registry and ensures
     * that the system is initialized to register the component during startup.
     */
    static registerCustomComponentItem(
        id: string,
        component: ItemCustomComponent
    ): void {
        SystemHelper.item_component_registry.set(id, component);
        SystemHelper.initialize();
    }

    /**
     * Initializes the system by subscribing to the startup event and registering
     * all custom components for blocks and items.
     *
     * @remarks
     * This method ensures that the system is initialized only once. It subscribes
     * to the `system.beforeEvents.startup` event and registers all components stored
     * in the internal registries.
     */
    private static initialize(): void {
        if (SystemHelper.is_initialized) return;

        SystemHelper.is_initialized = true;
        system.beforeEvents.startup.subscribe((eventData) => {
            // Register all custom block components
            SystemHelper.block_component_registry.forEach((component, id) => {
                console.log(`Registering block component: ${id}`);
                eventData.blockComponentRegistry.registerCustomComponent(
                    id,
                    component
                );
            });

            // Register all custom item components
            SystemHelper.item_component_registry.forEach((component, id) => {
                eventData.itemComponentRegistry.registerCustomComponent(
                    id,
                    component
                );
            });
        });
    }

    /**
     * A registry for storing custom block components to be registered during system startup.
     */
    private static block_component_registry: Map<string, BlockCustomComponent> =
        new Map();

    /**
     * A registry for storing custom item components to be registered during system startup.
     */
    private static item_component_registry: Map<string, ItemCustomComponent> =
        new Map();

    /**
     * A flag to ensure the system is initialized only once.
     */
    private static is_initialized = false;
}
