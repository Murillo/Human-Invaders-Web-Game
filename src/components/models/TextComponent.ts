import { ColorRepresentation, Group, Mesh, MeshBasicMaterial, Scene, Vector3 } from 'three';
import { GameComponentBase } from '../GameComponentBase';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { Tween } from '@tweenjs/tween.js';
import { FONTS } from '../../library/game/assets';

export class TextComponent extends GameComponentBase {
    private _isLoaded: boolean = false;
    private _enable: boolean = false;
    private _size: number = 5;
    private _height: number = 2;
    private _color: ColorRepresentation = 0xff0000;
    private _position: Vector3;
    private _text: string;
    private _scene: Scene | undefined;
    private _material: MeshBasicMaterial;

    constructor(text: string, position: Vector3, transparent: boolean = true, opacity: number = 0) {
        super();
        this._text = text;
        this._position = position;
        this._material = new MeshBasicMaterial({
            color: this._color,
            transparent: transparent,
            opacity: opacity,
        });
    }

    public async load(scene: Scene): Promise<void> {
        this._scene = scene;
        const font = await new FontLoader().loadAsync(FONTS.helvetiker);
        const geometry = new TextGeometry(this._text, {
            font: font,
            size: this._size,
            height: this._height,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 0.25,
            bevelSegments: 3,
        });
        const mesh = new Mesh(geometry, this._material);
        mesh.position.set(this._position.x, this._position.y, this._position.z);
        this._scene.add(mesh);
        this._isLoaded = true;
    }

    public update(): void {
        if (this._isLoaded && this._enable) {
            this._enable = false;
            new Tween(this._material).to({ opacity: 1 }, 1000).start();
        }
    }

    /**
     * Method to enable the text component in the scene and add the animation to the text.
     * @param {boolean} enable true to enable the text, false otherwise.
     */
    public set enable(enable: boolean) {
        this._enable = enable;
    }
}
