import { Command } from './Command';
import { SpaceAlienComponent } from '../components/models/SpaceAlienComponent';

export class MoveUpCommand implements Command {
    public execute(target: SpaceAlienComponent): void {
        target.moveUp();
    }
}
