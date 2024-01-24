import { Scene } from "three";

/**
 * Abstract base class for game components.
 * This class provides the basic structure for components used in the game, such as models, characters, etc.
 * Each game component can have an initial state and provides methods to load the component into a scene and update it.
 */
export abstract class GameComponentBase {
    protected state: boolean;

    /**
     * Construtor for the GameComponentBase class
     * @param {boolean} state - The initial state of the game component. The default is false.
     */
    constructor(state: boolean = false) {
        this.state = state;
     }

    /**
     * Method to load the model and add it to the scene
     * @param {Scene} scene
     * @returns {Promise<void>}
     */
    public abstract load(scene: Scene): Promise<void>;


    /**
     * Method to update the model such as position, rotation, etc.
     * @returns {void}
     */
    public abstract update(): void;
}