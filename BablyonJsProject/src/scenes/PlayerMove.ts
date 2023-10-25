import {Scene,
    Mesh, AnimationRange, Animatable, ArcRotateCamera, Animation, Vector3,Ray,
    Space, Bone, KeyboardInfo, KeyboardEventTypes, Epsilon, Quaternion, Scalar,
} from "@babylonjs/core";
import { onKeyboardEvent, visibleInInspector ,fromScene} from "./decorators";



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
    private gravitys : number;
    public time : number = new Date().getTime();
    public times : number = new Date().getTime();
    public canJump : boolean = true;
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
    
    
    @onKeyboardEvent(" ", KeyboardEventTypes.KEYDOWN)
    protected _spacekeydown(info: KeyboardInfo): void {
        
        if(this.canJump)
        {
        this.time = new Date().getTime();
        this.gravitys = 3
        this.canJump = false;
        this.skeleton.beginAnimation("jump",false,3,this.anim)
        }
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
        
        this.skeleton.beginAnimation("Walk",true)
    }
    public anim(): void {
        // ...
        this.skeleton.beginAnimation("Walk")
      
    }
    /**
     * Called each frame.
     */
    public onUpdate(): void {
        
        
        
        
            this.locallyTranslate(new Vector3(this.speed,this.gravitys,-1))
            if(this.times - this.time > 200)
            {
            this.gravitys = 0;
            
            }
            if(this.times - this.time > 800)
            {
                this.canJump = true;
            }
            this.rotationQuaternion = Quaternion.Identity();
           this.times = new Date().getTime();
           if(this.position.x >23)
           {
            this.position.x = 23;
           }
           if(this.position.x <-13)
           {
            this.position.x = -13;
           }
          
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
