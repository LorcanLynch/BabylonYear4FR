import {
    Mesh, AnimationRange, Animatable, ArcRotateCamera, Animation, Vector3,
    Space, Bone, KeyboardInfo, KeyboardEventTypes, Epsilon, Quaternion, Scalar,
} from "@babylonjs/core";
import { onKeyboardEvent } from "./decorators";



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
    // @ts-ignore ignoring the super call as we don't want to re-init
    protected constructor() { }
    private speed : number;
    

    @onKeyboardEvent("a", KeyboardEventTypes.KEYUP)
    protected _keyup(info: KeyboardInfo): void {
        this.speed = 0
    };
    @onKeyboardEvent("a", KeyboardEventTypes.KEYDOWN)
    protected _keydown(info: KeyboardInfo): void {
        this.speed = 1
    };
    @onKeyboardEvent("d", KeyboardEventTypes.KEYUP)
    protected _dkeyup(info: KeyboardInfo): void {
        this.speed = 0
    };
    @onKeyboardEvent("d", KeyboardEventTypes.KEYDOWN)
    protected _dkeydown(info: KeyboardInfo): void {
        this.speed = -1
    };
    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    public onInitialize(): void {
        // ...
    }

    /**
     * Called on the node has been fully initialized and is ready.
     */
    public onInitialized(): void {
        // ...
    }

    /**
     * Called on the scene starts.
     */
    public onStart(): void {
        // ...
    }

    /**
     * Called each frame.
     */
    public onUpdate(): void {
        
       
            this.moveWithCollisions(new Vector3(.01,0,this.speed));
        
    }

    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    public onStop(): void {
        // ...
    }

    /**
     * Called on a message has been received and sent from a graph.
     * @param name defines the name of the message sent from the graph.
     * @param data defines the data sent in the message.
     * @param sender defines the reference to the graph class that sent the message.
     */
    public onMessage(name: string, data: any, sender: any): void {
        switch (name) {
            case "myMessage":
                // Do something...
                break;
        }
    }
}
