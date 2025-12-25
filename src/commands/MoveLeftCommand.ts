import { Command } from './Command';
import { SpaceAlienComponent } from '../components/models/SpaceAlienComponent';

export class MoveLeftCommand implements Command {
    public execute(target: SpaceAlienComponent): void {
        target.moveLeft();
    }
}
