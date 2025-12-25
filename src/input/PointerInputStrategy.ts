import { InputStrategy } from './InputStrategy';
import { Screen } from '../util/Screen';
import { Bounds } from '../types/Bounds';
import { Command, FireCommand, MoveLeftCommand, MoveRightCommand, StopCommand } from '../commands';

export class PointerInputStrategy implements InputStrategy {
    private readonly element: HTMLElement;
    private readonly getTargetBounds: () => Bounds;
    private queuedCommands: Command[] = [];
    private isPointerHeld: boolean = false;
    private heldDirection: 'left' | 'right' | null = null;

    constructor(element: HTMLElement, getTargetBounds: () => { centerX: number; width: number }) {
        this.element = element;
        this.getTargetBounds = getTargetBounds;
        this.element.addEventListener('pointerdown', this.handlePointerDown);
        this.element.addEventListener('pointerup', this.handlePointerUp);
        this.element.addEventListener('pointercancel', this.handlePointerUp);
        this.element.addEventListener('pointerleave', this.handlePointerUp);
    }

    public readCommands(): Command[] {
        const commands = [...this.queuedCommands];
        this.queuedCommands = [];

        if (this.isPointerHeld && this.heldDirection) {
            commands.push(
                this.heldDirection === 'left' ? new MoveLeftCommand() : new MoveRightCommand()
            );
        }

        return commands;
    }

    private handlePointerDown = (event: PointerEvent): void => {
        const target = this.getTargetBounds();
        const side = Screen.isLeftHalf(event, this.element, target.centerX, target.width);
        if (side === null) {
            this.queuedCommands.push(new FireCommand());
            return;
        }
        const isLeftSide = side === true;
        this.heldDirection = isLeftSide ? 'left' : 'right';
        this.isPointerHeld = true;
        this.queuedCommands.push(isLeftSide ? new MoveLeftCommand() : new MoveRightCommand());
    };

    private handlePointerUp = (_event: PointerEvent): void => {
        this.isPointerHeld = false;
        this.heldDirection = null;
        this.queuedCommands.push(new StopCommand());
    };
}
