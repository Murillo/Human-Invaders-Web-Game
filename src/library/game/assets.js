import SpaceCraftModel from './SpaceCraft.glb';
import SpaceShuttle from './SpaceShuttle.glb';
import particle from './particle.png';

export const MODEL = {
	"spaceCraft": {
		"name": "SpaceCraft",
		"path" : SpaceCraftModel 
	},
	"spaceShuttle": {
		"name": "SpaceShuttle",
		"path" : SpaceShuttle 
	},
	"stars": {
		"name": "Stars",
		"path" : particle 
	}
}

export const FONTS = {
	"helvetiker": "https://cdn.rawgit.com/mrdoob/three.js/master/examples/fonts/helvetiker_regular.typeface.json"
}