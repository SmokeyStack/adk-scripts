import {
    Block,
    BlockFluidContainerComponent,
    BlockInventoryComponent,
    BlockPistonComponent,
    BlockPistonState,
    BlockRecordPlayerComponent,
    BlockSignComponent,
    Container,
    DyeColor,
    FluidType,
    ItemStack,
    ItemType,
    RawMessage,
    RawText,
    RGBA,
    SignSide
} from '@minecraft/server';
import { Vector3Builder } from './vector';

export class ComponentBlockFluidContainer {
    static get(block: Block): BlockFluidContainerComponent | undefined {
        return block.getComponent(
            'fluidContainer'
        ) as BlockFluidContainerComponent;
    }

    static getFillLevel(block: Block): number {
        return ComponentBlockFluidContainer.get(block).fillLevel;
    }

    static getFluidColor(block: Block): RGBA {
        return ComponentBlockFluidContainer.get(block).fluidColor;
    }

    static setFluidColor(block: Block, color: RGBA): void {
        ComponentBlockFluidContainer.get(block).fluidColor = color;
    }

    static addDye(block: Block, dye: ItemType): void {
        ComponentBlockFluidContainer.get(block).addDye(dye);
    }

    static getFluidType(block: Block): FluidType {
        return ComponentBlockFluidContainer.get(block).getFluidType();
    }

    static setFluidType(block: Block, fluidType: FluidType): void {
        ComponentBlockFluidContainer.get(block).setFluidType(fluidType);
    }

    static setPotion(block: Block, potion: ItemStack): void {
        ComponentBlockFluidContainer.get(block).setPotion(potion);
    }
}

export class ComponentBlockInventory {
    static get(block: Block): BlockInventoryComponent {
        return block.getComponent('inventory') as BlockInventoryComponent;
    }

    static getContainer(block: Block): Container {
        return ComponentBlockInventory.get(block).container;
    }
}

export class ComponentBlockPiston {
    static get(block: Block): BlockPistonComponent {
        return block.getComponent('piston') as BlockPistonComponent;
    }

    static isMoving(block: Block): boolean {
        return ComponentBlockPiston.get(block).isMoving;
    }

    static getState(block: Block): BlockPistonState {
        return ComponentBlockPiston.get(block).state;
    }

    static getAttachedBlocks(block: Block): Block[] {
        return ComponentBlockPiston.get(block).getAttachedBlocks();
    }

    static getAttachedBlocksLocations(block: Block): Vector3Builder[] {
        const locations =
            ComponentBlockPiston.get(block).getAttachedBlocksLocations();

        return locations.map((location) => new Vector3Builder(location));
    }
}

export class ComponentBlockRecordPlayer {
    static get(block: Block): BlockRecordPlayerComponent {
        return block.getComponent(
            'record_player'
        ) as BlockRecordPlayerComponent;
    }

    static ejectRecord(block: Block): void {
        return ComponentBlockRecordPlayer.get(block).ejectRecord();
    }

    static getRecord(block: Block): ItemStack {
        return ComponentBlockRecordPlayer.get(block).getRecord();
    }

    static isPlaying(block: Block): boolean {
        return ComponentBlockRecordPlayer.get(block).isPlaying();
    }

    static pauseRecord(block: Block): void {
        ComponentBlockRecordPlayer.get(block).pauseRecord();
    }

    static playRecord(block: Block): void {
        ComponentBlockRecordPlayer.get(block).playRecord();
    }

    static setRecord(block: Block, record?: ItemType | string): void {
        ComponentBlockRecordPlayer.get(block).setRecord(record);
    }
}

export class ComponentBlockSign {
    static get(block: Block): BlockSignComponent {
        return block.getComponent('sign') as BlockSignComponent;
    }

    static isWaxed(block: Block): boolean {
        return ComponentBlockSign.get(block).isWaxed;
    }

    static getRawText(block: Block, side?: SignSide): RawText {
        return ComponentBlockSign.get(block).getRawText(side);
    }

    static getText(block: Block, side?: SignSide): string {
        return ComponentBlockSign.get(block).getText(side);
    }

    static getTextDyeColor(block: Block, side?: SignSide): DyeColor {
        return ComponentBlockSign.get(block).getTextDyeColor(side);
    }

    static setText(
        block: Block,
        text: RawMessage | RawText | string,
        side?: SignSide
    ): void {
        ComponentBlockSign.get(block).setText(text, side);
    }

    static setTextDyeColor(
        block: Block,
        color: DyeColor,
        side?: SignSide
    ): void {
        ComponentBlockSign.get(block).setTextDyeColor(color, side);
    }

    static setWaxed(block: Block, waxed: boolean): void {
        ComponentBlockSign.get(block).setWaxed(waxed);
    }
}
