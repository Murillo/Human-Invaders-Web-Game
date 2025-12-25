import { Command } from './Command';
import { SpaceAlienComponent } from '../components/models/SpaceAlienComponent';

export class MoveDownCommand implements Command {
    public execute(target: SpaceAlienComponent): void {
        target.moveDown();
    }
}
