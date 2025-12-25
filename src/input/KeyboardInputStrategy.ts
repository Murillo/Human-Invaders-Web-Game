import { InputStrategy } from './InputStrategy';
import { Command } from '../commands/Command';
import { MoveLeftCommand } from '../commands/MoveLeftCommand';
import { MoveRightCommand } from '../commands/MoveRightCommand';
import { MoveUpCommand } from '../commands/MoveUpCommand';
import { MoveDownCommand } from '../commands/MoveDownCommand';
import { StopCommand } from '../commands/StopCommand';
import { FireCommand } from '../commands/FireCommand';

const LEFT_KEYS = ['a', 'arrowleft'];
const RIGHT_KEYS = ['d', 'arrowright'];
const UP_KEYS = ['w', 'arrowup'];
const DOWN_KEYS = ['s', 'arrowdown'];

export class KeyboardInputStrategy implements InputStrategy {
    private pressedKeys: Set<string> = new Set<string>();
    private fireQueued: boolean = false;

    constructor() {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
    }

    public readCommands(): Command[] {
        const commands: Command[] = [];

        if (this.hasAny(LEFT_KEYS)) {
            commands.push(new MoveLeftCommand());
        }
        if (this.hasAny(RIGHT_KEYS)) {
            commands.push(new MoveRightCommand());
        }
        if (this.hasAny(UP_KEYS)) {
            commands.push(new MoveUpCommand());
        }
        if (this.hasAny(DOWN_KEYS)) {
            commands.push(new MoveDownCommand());
        }

        if (!this.hasDirectionalInput()) {
            commands.push(new StopCommand());
        }

        if (this.fireQueued) {
            commands.push(new FireCommand());
            this.fireQueued = false;
        }

        return commands;
    }

    private handleKeyDown = (event: KeyboardEvent): void => {
        const key = event.key.toLowerCase();
        this.pressedKeys.add(key);
        if (key === ' ') {
            this.fireQueued = true;
        }
    };

    private handleKeyUp = (event: KeyboardEvent): void => {
        const key = event.key.toLowerCase();
        this.pressedKeys.delete(key);
    };

    private hasAny(keys: string[]): boolean {
        return keys.some((key) => this.pressedKeys.has(key));
    }

    private hasDirectionalInput(): boolean {
        return this.hasAny(LEFT_KEYS) || this.hasAny(RIGHT_KEYS) || this.hasAny(UP_KEYS) || this.hasAny(DOWN_KEYS);
    }
}
