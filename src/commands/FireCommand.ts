import { Command } from './Command';
import { SpaceAlienComponent } from '../components/models/SpaceAlienComponent';

export class FireCommand implements Command {
    public execute(target: SpaceAlienComponent): void {
        target.triggerShot();
    }
}
