import { Mesh, KeyboardInfo, TransformNode } from "@babylonjs/core";
import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
import { Button, TextBlock } from "@babylonjs/gui";
/**
 * This represents a script that is attached to a node in the editor.
 * Available nodes are:
 *      - Meshes
 *      - Lights
 *      - Cameras
 *      - Transform nodes
 *
 * You can extend the desired class according to the node type.
 * Example:
 *      export default class MyMesh extends Mesh {
 *          public onUpdate(): void {
 *              this.rotation.y += 0.04;
 *          }
 *      }
 * The function "onInitialize" is called immediately after the constructor is called.
 * The functions "onStart" and "onUpdate" are called automatically.
 */
export default class MyScript extends Mesh {
    /**
     * Override constructor.
     * @warn do not fill.
     */
    protected constructor();
    private _jump;
    private _song;
    private speed;
    advancedTexture: AdvancedDynamicTexture;
    button1: Button;
    quitButton: Button;
    scoreText: TextBlock;
    score: number;
    private gravitys;
    time: number;
    times: number;
    speedF: number;
    hazard: Mesh;
    hazard2: Mesh;
    hazard1: Mesh;
    map: TransformNode;
    map2: TransformNode;
    map3: TransformNode;
    map4: TransformNode;
    sky: Mesh;
    hazardArray: Mesh[];
    mapArray: TransformNode[];
    canJump: boolean;
    health: number;
    protected _keyup(info: KeyboardInfo): void;
    protected _keydown(info: KeyboardInfo): void;
    protected _dkeyup(info: KeyboardInfo): void;
    protected _dkeydown(info: KeyboardInfo): void;
    protected _spacekeydown(info: KeyboardInfo): void;
    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    onInitialize(): void;
    /**
     * Called on the node has been fully initialized and is ready.
     */
    onInitialized(): void;
    /**
     * Called on the scene starts.
     */
    onStart(): void;
    anim(): void;
    /**
     * Called each frame.
     */
    updateOverlay(): void;
    onUpdate(): void;
    Reset(): void;
    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    onStop(): void;
    /**
     * Called on a message has been received and sent from a graph.
     * @param name defines the name of the message sent from the graph.
     * @param data defines the data sent in the message.
     * @param sender defines the reference to the graph class that sent the message.
     */
    onMessage(name: string, data: any, sender: any): void;
}
