import {
    Block,
    BlockComponentTypes,
    BlockFluidContainerComponent,
    BlockInventoryComponent,
    BlockPermutation,
    BlockPistonComponent,
    BlockRecordPlayerComponent,
    BlockSignComponent,
    Container,
    Dimension,
    Entity,
    EntityRideableComponent,
    EntityTypeFamilyComponent,
    ItemDurabilityComponent,
    ItemEnchantableComponent,
    ItemStack,
    Player,
    SignSide
} from '@minecraft/server';

export class Debug {
    static logEventData(
        data: Record<string, any>,
        prefix = '',
        skip: string[] = []
    ): Record<string, any> {
        const result: Record<string, any> = {};
        const prototype = Object.getPrototypeOf(data);
        let parent_name: string = '';

        for (const key in data) {
            if (skip.includes(key)) continue;

            const value = data[key];
            parent_name = Debug.getParentPrototypeName(data, key);
            let full_key = prefix ? `${prefix}.${key}` : key;

            if (typeof value === 'object' && value !== null) {
                if (!prototype.hasOwnProperty(key))
                    full_key = parent_name ? `${parent_name}.${key}` : key;

                result[full_key] = Debug.logEventData(
                    value,
                    value.constructor.name,
                    skip
                );
            } else if (typeof value === 'function')
                result[full_key] = Debug.handleFunctionLogging(data, key, skip);
            else result[full_key] = value;
        }

        return Debug.sortObjectKeys(result);
    }

    private static handleFunctionLogging(
        data: Record<string, any>,
        key: string,
        skip: string[]
    ): any {
        switch (data.constructor) {
            case Dimension:
                return Debug.logDimensionData(data, key);
            case Entity:
                return Debug.logEntityData(data, key, skip);
            case Player:
                return Debug.logPlayerData(data, key, skip);
            case Block:
                return Debug.logBlockKey(data, key, skip);
            case BlockPermutation:
                return Debug.logBlockPermutationKey(data, key);
            case ItemStack:
                return Debug.logItemStackKey(data, key, skip);
            case Container:
                return Debug.logContainerKey(data, key, skip);
            case EntityTypeFamilyComponent:
                return Debug.logEntityTypeFamilyComponentKey(data, key);
            case EntityRideableComponent:
                return Debug.logEntityRideableComponentKey(data, key);
            case BlockFluidContainerComponent:
                return Debug.logBlockFluidContainerComponent(data, key);
            case BlockSignComponent:
                return Debug.logBlockSignComponentKey(data, key);
            case BlockPistonComponent:
                return Debug.logBlockPistonComponentKey(data, key);
            case BlockRecordPlayerComponent:
                return Debug.logBlockRecordPlayerComponentKey(data, key);
            case ItemDurabilityComponent:
                return Debug.logItemDurabilityComponentKey(data, key);
            case ItemEnchantableComponent:
                return Debug.logItemEnchantableComponentKey(data, key);
            default:
                return undefined;
        }
    }

    private static sortObjectKeys(
        result: Record<string, any>
    ): Record<string, any> {
        return Object.keys(result)
            .sort()
            .reduce(
                (sorted, key) => {
                    sorted[key] = result[key];
                    return sorted;
                },
                {} as Record<string, any>
            );
    }

    private static logDimensionData(data: any, key: string): any {
        switch (key) {
            case 'getPlayers':
                return Debug.logEventData(data[key](), '', ['dimension']);
            case 'getEntities':
                return Debug.logEventData(data[key](), '', ['dimension']);
            case 'getWeather':
                return data[key]();
            default:
                return undefined;
        }
    }

    private static logEntityData(
        data: any,
        key: string,
        skip: string[] = []
    ): any {
        switch (key) {
            case 'getBlockFromViewDirection':
                if (data[key]() === undefined) return;
                return Debug.logEventData(data[key](), '', ['dimension']);
            case 'getComponents':
                skip.push('entity');
                return data[key]().map((component: any) =>
                    Debug.logEventData(
                        component,
                        component.constructor.name,
                        skip
                    )
                );
            case 'getDynamicPropertyIds':
                return data[key]().map((id: string) => ({
                    key: id,
                    value: data.getDynamicProperty(id)
                }));
            case 'getDynamicPropertyTotalByteCount':
                return data[key]();
            case 'getEffects':
                return data[key]().map((effect: any) =>
                    Debug.logEventData(effect, effect.constructor.name)
                );
            case 'getEntitiesFromViewDirection':
                return Debug.logEventData(data[key](), '', ['dimension']);
            case 'getHeadLocation':
                return data[key]();
            case 'getRotation':
                return data[key]();
            case 'getTags':
                return data[key]();
            case 'getVelocity':
                return data[key]();
            case 'getViewDirection':
                return data[key]();
            default:
                return undefined;
        }
    }

    private static logPlayerData(
        data: any,
        key: string,
        skip: string[] = []
    ): any {
        switch (key) {
            case 'getGameMode':
                return data[key]();
            case 'getSpawnPoint':
                if (data[key]() === undefined) return;
                return Debug.logEventData(data[key](), '', skip);
            case 'getTotalXp':
                return data[key]();
            case 'isOp':
                return data[key]();
            default:
                return this.logEntityData(data, key, skip);
        }
    }

    private static logBlockFluidContainerComponent(
        data: any,
        key: string
    ): any {
        switch (key) {
            case 'getFluidType':
                return Debug.logEventData(data[key](), '');
            default:
                return undefined;
        }
    }

    private static logBlockKey(data: any, key: string, skip: string[]): any {
        switch (key) {
            case 'getComponent': {
                skip.push('block');
                let result: any[] = [];
                for (const component in BlockComponentTypes) {
                    if (data[key](BlockComponentTypes[component]) === undefined)
                        continue;
                    result.push(
                        Debug.logEventData(
                            data[key](BlockComponentTypes[component]),
                            component,
                            skip
                        )
                    );
                }
                return result;
            }
            case 'getItemStack':
                if (data[key]() === undefined) return;
                return Debug.logEventData(data[key]());
            case 'getRedstonePower':
                return data[key]();
            case 'getTags':
                return data[key]();
            default:
                return undefined;
        }
    }

    private static logBlockPermutationKey(data: any, key: string): any {
        switch (key) {
            case 'getAllStates':
                return data[key]();
            case 'getItemStack':
                if (data[key]() === undefined) return;
                return Debug.logEventData(data[key]());
            case 'getTags':
                return data[key]();
            default:
                return undefined;
        }
    }

    private static logItemStackKey(
        data: any,
        key: string,
        skip: string[]
    ): any {
        switch (key) {
            case 'getCanDestroy':
                return data[key]();
            case 'getCanPlaceOn':
                return data[key]();
            case 'getComponents':
                return data[key]().map((component: any) =>
                    Debug.logEventData(component, component.constructor.name)
                );
            case 'getDynamicPropertyIds':
                return data[key]().map((id: string) => ({
                    key: id,
                    value: data.getDynamicProperty(id)
                }));
            case 'getDynamicPropertyTotalByteCount':
                return data[key]();
            case 'getLore':
                return data[key]();
            case 'getTags':
                return data[key]();
            default:
                return undefined;
        }
    }

    private static logContainerKey(
        data: any,
        key: string,
        skip: string[]
    ): any {
        switch (key) {
            case 'getItem': {
                let size: number = data['size'];
                let result: any[] = [];
                for (let index = 0; index < size; index++) {
                    if (data[key](index) === undefined) continue;
                    result.push({
                        slot: index,
                        content: Debug.logEventData(data[key](index))
                    });
                }
                return result;
            }
            default:
                return undefined;
        }
    }

    private static logEntityBreathableComponentKey(
        data: any,
        key: string
    ): any {
        switch (key) {
            case 'getBreatheBlocks':
                return Debug.logEventData(data[key]());
            case 'getNonBreatheBlocks':
                return Debug.logEventData(data[key]());
            default:
                return undefined;
        }
    }

    private static logEntityTypeFamilyComponentKey(
        data: any,
        key: string
    ): any {
        switch (key) {
            case 'getTypeFamilies':
                return Debug.logEventData(data[key]());
            default:
                return undefined;
        }
    }

    private static logEntityRideableComponentKey(data: any, key: string): any {
        switch (key) {
            case 'getFamilyTypes':
                return Debug.logEventData(data[key]());
            case 'getRiders':
                return Debug.logEventData(data[key](), '', [
                    'entityRidingOn',
                    'dimension'
                ]);
            default:
                return undefined;
        }
    }

    private static logBlockSignComponentKey(data: any, key: string): any {
        switch (key) {
            case 'getRawText': {
                let result: any[] = [];
                for (const side in SignSide) {
                    if (data[key](side) === undefined) continue;
                    result.push(Debug.logEventData(data[key](side)));
                }
                return result;
            }
            case 'getText': {
                let result: any[] = [];
                for (const side in SignSide) {
                    if (data[key](side) === undefined) continue;
                    result.push({
                        side: side,
                        content: data[key](side)
                    });
                }
                return result;
            }
            case 'getTextDyeColor': {
                let result: any[] = [];
                for (const side in SignSide) {
                    if (data[key](side) === undefined) continue;
                    result.push({
                        side: side,
                        content: data[key](side)
                    });
                }
                return result;
            }
            default:
                return undefined;
        }
    }

    private static logBlockPistonComponentKey(data: any, key: string): any {
        switch (key) {
            case 'getAttachedBlocks':
                return Debug.logEventData(data[key]());
            case 'getAttachedBlocksLocations':
                return Debug.logEventData(data[key]());
            default:
                return undefined;
        }
    }

    private static logBlockRecordPlayerComponentKey(
        data: any,
        key: string
    ): any {
        switch (key) {
            case 'isPlaying':
                return data[key]();
            case 'getRecord':
                if (data[key]() === undefined) return;
                return Debug.logEventData(data[key]());
            default:
                return undefined;
        }
    }

    private static logItemDurabilityComponentKey(data: any, key: string): any {
        switch (key) {
            case 'getDamageChance':
                let result: any[] = [];
                for (let index = 0; index < 4; index++) {
                    result.push({
                        'Unbreaking Level': index,
                        'Damage Chance': data[key](index)
                    });
                }
                return result;
            default:
                return undefined;
        }
    }

    private static logItemEnchantableComponentKey(data: any, key: string): any {
        switch (key) {
            case 'getEnchantments':
                return data[key]().map((enchantment: any) =>
                    Debug.logEventData(
                        enchantment,
                        enchantment.constructor.name
                    )
                );
            default:
                return undefined;
        }
    }

    private static getParentPrototypeName(obj: any, key: string): string {
        const prototype = Object.getPrototypeOf(obj);

        if (!prototype) return ''; // No parent prototype (reached the top of the chain)
        if (prototype.hasOwnProperty(key))
            return prototype.constructor.name; // Prototype has own properties
        else return this.getParentPrototypeName(prototype, key); // Recurse to the parent prototype
    }
}
