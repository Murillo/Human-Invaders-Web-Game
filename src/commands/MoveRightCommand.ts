import { Command } from './Command';
import { SpaceAlienComponent } from '../components/models/SpaceAlienComponent';

export class MoveRightCommand implements Command {
    public execute(target: SpaceAlienComponent): void {
        target.moveRight();
    }
}
