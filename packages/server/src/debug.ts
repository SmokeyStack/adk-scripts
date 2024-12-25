import {
    Block,
    BlockComponentTypes,
    BlockInventoryComponent,
    BlockPermutation,
    BlockPistonComponent,
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
        data: Object,
        prefix = '',
        skip: string[] = []
    ): Object {
        return Debug.logEventData(data, prefix, skip);
    }

    private logEventData(
        data: Object,
        prefix = '',
        skip: string[] = []
    ): Object {
        const prototype: Object = Object.getPrototypeOf(data);
        let result: Object = {};
        let parentName: string = '';

        for (const key in data) {
            if (skip.includes(key)) continue;
            const value: any = data[key];
            parentName = this.getParentPrototypeName(data, key);
            let fullKey: string = prefix ? `${prefix}.${key}` : key;

            if (typeof data[key] === 'object' && value !== null) {
                if (!prototype.hasOwnProperty(key))
                    fullKey = parentName ? `${parentName}.${key}` : key;

                result[fullKey] = this.logEventData(
                    value,
                    value.constructor.name,
                    skip
                );
            } else if (typeof data[key] === 'function') {
                // console.warn('private: ' + fullKey);
                switch (data.constructor) {
                    case Dimension:
                        result[fullKey] = this.logDimensionprivates(data, key);
                        break;
                    case Entity:
                        result[fullKey] = this.logEntityprivates(
                            data,
                            key,
                            skip
                        );
                        break;
                    case Player:
                        result[fullKey] = this.logPlayerprivates(
                            data,
                            key,
                            skip
                        );
                        break;
                    case Block:
                        result[fullKey] = this.logBlockprivates(
                            data,
                            key,
                            skip
                        );
                        break;
                    case BlockPermutation:
                        result[fullKey] = this.logBlockPermutationprivates(
                            data,
                            key
                        );
                        break;
                    case ItemStack:
                        result[fullKey] = this.logItemStackprivates(
                            data,
                            key,
                            skip
                        );
                        break;
                    case Container:
                        result[fullKey] = this.logContainerprivates(
                            data,
                            key,
                            skip
                        );
                        break;
                    case EntityTypeFamilyComponent:
                        result[fullKey] =
                            this.logEntityTypeFamilyComponentprivates(
                                data,
                                key
                            );
                        break;
                    case EntityRideableComponent:
                        result[fullKey] =
                            this.logEntityRideableComponentprivates(data, key);
                        break;
                    case BlockSignComponent:
                        result[fullKey] = this.logBlockSignComponentprivates(
                            data,
                            key
                        );
                        break;
                    case BlockInventoryComponent:
                        result[fullKey] =
                            this.logBlockInventoryComponentprivates(data, key);
                        break;
                    case BlockPistonComponent:
                        result[fullKey] = this.logBlockPistonComponentprivates(
                            data,
                            key
                        );
                        break;
                    case ItemDurabilityComponent:
                        result[fullKey] =
                            this.logItemDurabilityComponentprivates(data, key);
                        break;
                    case ItemEnchantableComponent:
                        result[fullKey] =
                            this.logItemEnchantableComponentprivates(data, key);
                        break;
                    default:
                        break;
                }
            } else {
                if (prototype.hasOwnProperty(key)) {
                    result[fullKey] = value;
                } else {
                    fullKey = parentName ? `${parentName}.${key}` : key;
                    result[fullKey] = value;
                }
            }
        }

        result = Object.keys(result)
            .sort()
            .reduce((object, key) => {
                object[key] = result[key];
                return object;
            }, {});

        return result;
    }

    private logDimensionprivates(data: any, key: string): any {
        switch (key) {
            case 'getPlayers':
                return this.logEventData(data[key](), '', ['dimension']);
            case 'getWeather':
                return data[key]();
            default:
                break;
        }
    }

    private logEntityprivates(
        data: any,
        key: string,
        skip: string[] = []
    ): any {
        switch (key) {
            case 'getBlockFromViewDirection':
                if (
                    data[key]({
                        includeLiquidBlocks: true,
                        includePassableBlocks: true
                    }) === undefined
                )
                    return;
                return this.logEventData(
                    data[key]({
                        includeLiquidBlocks: true,
                        includePassableBlocks: true
                    }),
                    '',
                    ['dimension']
                );
            case 'getComponents':
                skip.push('entity');
                return data[key]().map((component: any) =>
                    this.logEventData(
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
                    this.logEventData(effect, effect.constructor.name)
                );
            case 'getEntitiesFromViewDirection':
                return this.logEventData(
                    data[key]({
                        ignoreBlockCollision: false,
                        includeLiquidBlocks: false,
                        includePassableBlocks: false
                    }),
                    '',
                    ['dimension']
                );
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
                break;
        }
    }

    private logPlayerprivates(
        data: any,
        key: string,
        skip: string[] = []
    ): any {
        switch (key) {
            case 'getGameMode':
                return data[key]();
            case 'getSpawnPoint':
                if (data[key]() === undefined) return;
                return this.logEventData(data[key](), '', skip);
            case 'getTotalXp':
                return data[key]();
            case 'isOp':
                return data[key]();
            default:
                return this.logEntityprivates(data, key, skip);
        }
    }

    private logBlockprivates(data: any, key: string, skip: string[]): any {
        switch (key) {
            case 'getComponent': {
                skip.push('block');
                let result: any[] = [];
                for (const component in BlockComponentTypes) {
                    if (data[key](BlockComponentTypes[component]) === undefined)
                        continue;
                    result.push(
                        this.logEventData(
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
                return this.logEventData(data[key]());
            case 'getRedstonePower':
                return data[key]();
            case 'getTags':
                return data[key]();
            default:
                break;
        }
    }

    private logBlockPermutationprivates(data: any, key: string): any {
        switch (key) {
            case 'getAllStates':
                return data[key]();
            case 'getItemStack':
                if (data[key]() === undefined) return;
                return this.logEventData(data[key]());
            case 'getTags':
                return data[key]();
            default:
                break;
        }
    }

    private logItemStackprivates(data: any, key: string, skip: string[]): any {
        switch (key) {
            case 'getCanDestroy':
                return data[key]();
            case 'getCanPlaceOn':
                return data[key]();
            case 'getComponents':
                return data[key]().map((component: any) =>
                    this.logEventData(component, component.constructor.name)
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
                break;
        }
    }

    private logContainerprivates(data: any, key: string, skip: string[]): any {
        switch (key) {
            case 'getItem': {
                let size: number = data['size'];
                let result: any[] = [];
                for (let index = 0; index < size; index++) {
                    if (data[key](index) === undefined) continue;
                    result.push({
                        slot: index,
                        content: this.logEventData(data[key](index))
                    });
                }
                return result;
            }
            default:
                break;
        }
    }

    private logEntityBreathableComponentprivates(data: any, key: string): any {
        switch (key) {
            case 'getBreatheBlocks':
                return this.logEventData(data[key]());
            case 'getNonBreatheBlocks':
                return this.logEventData(data[key]());
            default:
                break;
        }
    }

    private logEntityTypeFamilyComponentprivates(data: any, key: string): any {
        switch (key) {
            case 'getTypeFamilies':
                return this.logEventData(data[key]());
            default:
                break;
        }
    }

    private logEntityRideableComponentprivates(data: any, key: string): any {
        switch (key) {
            case 'getFamilyTypes':
                return this.logEventData(data[key]());
            case 'getRiders':
                return this.logEventData(data[key](), '', [
                    'entityRidingOn',
                    'dimension'
                ]);
            default:
                break;
        }
    }

    private logBlockSignComponentprivates(data: any, key: string): any {
        switch (key) {
            case 'getRawText': {
                let result: any[] = [];
                for (const side in SignSide) {
                    if (data[key](side) === undefined) continue;
                    result.push(this.logEventData(data[key](side)));
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
                break;
        }
    }

    private logBlockInventoryComponentprivates(data: any, key: string): any {
        switch (key) {
            case 'getRawText': {
                let result: any[] = [];
                for (const side in SignSide) {
                    if (data[key](side) === undefined) continue;
                    result.push(this.logEventData(data[key](side)));
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
                break;
        }
    }

    private logBlockPistonComponentprivates(data: any, key: string): any {
        switch (key) {
            case 'getAttachedBlocks':
                return this.logEventData(data[key]());
            case 'getAttachedBlocksLocations':
                return this.logEventData(data[key]());
            default:
                break;
        }
    }

    private logBlockRecordPlayerComponentprivates(data: any, key: string): any {
        switch (key) {
            case 'isPlaying':
                return data[key]();
            case 'getRecord':
                if (data[key]() === undefined) return;
                return this.logEventData(data[key]());
            default:
                break;
        }
    }

    private logItemDurabilityComponentprivates(data: any, key: string): any {
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
                break;
        }
    }

    private logItemEnchantableComponentprivates(data: any, key: string): any {
        switch (key) {
            case 'getEnchantments':
                return data[key]().map((enchantment: any) =>
                    this.logEventData(enchantment, enchantment.constructor.name)
                );
            default:
                break;
        }
    }

    private getParentPrototypeName(obj: any, key: string): string {
        const prototype = Object.getPrototypeOf(obj);

        if (!prototype) return ''; // No parent prototype (reached the top of the chain)
        if (prototype.hasOwnProperty(key))
            return prototype.constructor.name; // Prototype has own properties
        else return this.getParentPrototypeName(prototype, key); // Recurse to the parent prototype
    }
}
