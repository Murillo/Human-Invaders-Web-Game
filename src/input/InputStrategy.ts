import { Command } from '../commands/Command';

export interface InputStrategy {
    readCommands(): Command[];
}
