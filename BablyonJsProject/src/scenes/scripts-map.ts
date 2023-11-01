import { ScriptMap } from "./tools";

/**
 * Defines the interface that exposes all exported scripts in this project.
 */
export interface ISceneScriptMap {
	"src/scenes/GUI.ts": ScriptMap;
	"src/scenes/Hazard.ts": ScriptMap;
	"src/scenes/PlayerMove.ts": ScriptMap;
}

/**
 * Defines the map of all available scripts in the project.
 */
export const scriptsMap: ISceneScriptMap = {
	"src/scenes/GUI.ts": require("./GUI"),
	"src/scenes/Hazard.ts": require("./Hazard"),
	"src/scenes/PlayerMove.ts": require("./PlayerMove"),
}
