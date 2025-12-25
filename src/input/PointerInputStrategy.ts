import { InputStrategy } from './InputStrategy';
import { Command } from '../commands/Command';
import { MoveLeftCommand } from '../commands/MoveLeftCommand';
import { MoveRightCommand } from '../commands/MoveRightCommand';
import { StopCommand } from '../commands/StopCommand';
import { Screen } from '../util/Screen';

export class PointerInputStrategy implements InputStrategy {
    private readonly element: HTMLElement;
    private queuedCommands: Command[] = [];
    private isPointerHeld: boolean = false;
    private heldDirection: 'left' | 'right' | null = null;

    constructor(element: HTMLElement) {
        this.element = element;
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
        const isLeftSide = Screen.isLeftHalf(event, this.element);
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
