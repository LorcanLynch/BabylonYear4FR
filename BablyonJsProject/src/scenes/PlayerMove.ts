import {Scene,
    Mesh, AnimationRange, Animatable, ArcRotateCamera, Animation, Vector3,Ray,
    Space, Bone, KeyboardInfo, KeyboardEventTypes, Epsilon, Quaternion, Scalar,TransformNode
} from "@babylonjs/core";
import { ICanvasRenderingContext } from "@babylonjs/core/Engines/ICanvas";
import { onKeyboardEvent, visibleInInspector ,fromScene} from "./decorators";
import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
import {Button, TextBlock } from "@babylonjs/gui";
import { meshUVSpaceRendererPixelShader } from "@babylonjs/core/Shaders/meshUVSpaceRenderer.fragment";





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
    public advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("myUI", true)
    public button1=   Button.CreateSimpleButton("but1","click");
    public quitButton =  Button.CreateSimpleButton("but2","Quit");
    public scoreText = new TextBlock();
    public score: number = 0;
    private gravitys : number;
    public time : number = new Date().getTime();
    public times : number = new Date().getTime();
    public speedF: number =1;
    @fromScene("Hazard") public hazard : Mesh 
    @fromScene("Hazard2") public hazard2 : Mesh 
    @fromScene("Hazard1") public hazard1 : Mesh 
    @fromScene("Map2") public map:TransformNode;
    public hazardArray : Mesh[] = new Array(3);
    public mapArray : Mesh[] = new Array(3);
    public canJump : boolean = true;
    @visibleInInspector("number","health",1)
    public health: number;
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
        this.hazardArray.push(this.hazard1)
        this.hazardArray.push(this.hazard2)
        this.hazardArray.push(this.hazard)
    }
    /**
     * Called on the scene starts.
     */
    public onStart(): void {
        // ...
       
       this.scoreText.text = "Score: 0"
       this.scoreText.outlineWidth = 3;
       this.scoreText.outlineColor= "black";
       this.scoreText.fontFamily = "Verdana";
       this.scoreText.fontStyle = "bold"    
       this.scoreText.top = "-40%"
       this.scoreText.left= "40%";
       this.scoreText.width = .2
       this.scoreText.height = 0.1;
this.scoreText.color = "white";
this.scoreText.fontSize = 20;
this.advancedTexture.addControl(this.scoreText);


        this.button1.width = .2;
this.button1.height = 0.1;
this.button1.color = "white";
this.button1.fontSize = 20;
this.button1.background = "red";
this.button1.textBlock.text = "Restart";
this.button1.onPointerUpObservable.add( ()=>{this.Reset();} );
this.button1.isVisible = false;
this.advancedTexture.addControl(this.button1);

this.quitButton.width = .2;
this.quitButton.height = 0.1;
this.quitButton.color = "white";
this.quitButton.fontSize = 20;
this.quitButton.background = "red";
this.quitButton.textBlock.text = "Quit.";
this.quitButton.onPointerUpObservable.add( ()=>{game.loadScene("UIScene/scene.babylon");} );
this.quitButton.isVisible = false;
this.quitButton.top = "20%";
this.advancedTexture.addControl(this.quitButton);
              
        this.skeleton.beginAnimation("Walk",true)

        
    }

    public anim(): void {
        // ...
        this.skeleton.beginAnimation("Walk",true)
      
    }

    
    /**
     * Called each frame.
     */

   public updateOverlay():void {
        
          this.scoreText.text = `${"Score: " + this.score}`
        
      }
    public onUpdate(): void {
        
       this.score++;
       if(this.score %10 == 0 && this.button1.isVisible == false)
       {this.updateOverlay();}
      this.hazardArray.forEach(element => {
        if(this.intersectsMesh(element,true,true))
        {
            element.setAbsolutePosition( new Vector3(element.getAbsolutePosition().x,element.getAbsolutePosition().y,element.getAbsolutePosition().z-200))
            this.button1.isVisible = true;
            this.quitButton.isVisible = true;
            this.speedF = 0;
        }
        else if(this.position.z < element.position.z)
        {
            
            
                element.setAbsolutePosition( new Vector3(Math.floor(Math.random() * (40-1) + 1),element.getAbsolutePosition().y,element.getAbsolutePosition().z-150))
                element.scaling.y =Math.floor(Math.random() * (20+6) + 6);
            
        }
       });

       if(this.position.z < this.map.position.z-150)
       {
        this.map.position.z -=400
       }
        
        
            this.locallyTranslate(new Vector3(this.speed,this.gravitys,-this.speedF))
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
           if(this.position.x >38)
           {
            this.position.x = 38;
           }
           if(this.position.x <0)
           {
            this.position.x = 0;
           }
          
    }
    public Reset(): void{
        
        game.loadScene("scene/scene.babylon");
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
