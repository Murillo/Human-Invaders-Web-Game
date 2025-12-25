import { SpaceAlienComponent } from '../components/models/SpaceAlienComponent';

export interface Command {
    execute(target: SpaceAlienComponent): void;
}
