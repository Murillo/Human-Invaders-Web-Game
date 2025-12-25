import { Command } from './Command';
import { SpaceAlienComponent } from '../components/models/SpaceAlienComponent';

export class StopCommand implements Command {
    public execute(target: SpaceAlienComponent): void {
        target.stopMovement();
    }
}
