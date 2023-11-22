import {Scene,
    Mesh, AnimationRange, Animatable, ArcRotateCamera, Animation, Vector3,Ray,
    Space, Bone, KeyboardInfo, KeyboardEventTypes, Epsilon, Quaternion, Scalar,TransformNode,Sound,Material
} from "@babylonjs/core";
import { ICanvasRenderingContext } from "@babylonjs/core/Engines/ICanvas";
import { onKeyboardEvent, visibleInInspector ,fromScene,fromSounds,fromMaterials} from "./decorators";
import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
import {Button, TextBlock } from "@babylonjs/gui";
import { meshUVSpaceRendererPixelShader } from "@babylonjs/core/Shaders/meshUVSpaceRenderer.fragment";
import { fluentBackplatePixelShader } from "@babylonjs/gui/3D/materials/fluentBackplate/shaders/fluentBackplate.fragment";
import { diffieHellman } from "crypto";

import { LoadFile } from "@babylonjs/core/Misc/fileTools";



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
    @fromSounds("Sounds/jump.wav", "global") private _jump : Sound;
    @fromSounds("Sounds/music.mp3", "global") private _song : Sound;
    
    private horizontalSpeed : number;
    public advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("myUI", true)
    public resetButton=   Button.CreateSimpleButton("but1","click");
    public quitButton =  Button.CreateSimpleButton("but2","Quit");
    public resumeButton=   Button.CreateSimpleButton("but3","click");
    public scoreText = new TextBlock();
    public score: number = 1;
    private verticalSpeed : number;
    public timeOfJump : number = new Date().getTime();
    public currentTime : number = new Date().getTime();
    public speedF: number =1;
    public canMove: boolean = true;
    public paused:  boolean = false;
    @fromScene("Hazard1") public hazard1 : Mesh 
    @fromScene("Hazard2") public hazard2 : Mesh 
    @fromScene("Hazard3") public hazard3 : Mesh
    @fromScene("Hazard4") public hazard4 : Mesh 
    @fromScene("Hazard5") public hazard5 : Mesh 
    @fromScene("Hazard6") public hazard6 : Mesh 
    @fromScene("Hazard7") public hazard7 : Mesh 
    @fromScene("Hazard8") public hazard8 : Mesh 
    @fromScene("Hazard9") public hazard9: Mesh 
    @fromScene("Hazard10") public hazard10 : Mesh 
    @fromScene("Hazard11") public hazard11 : Mesh 
    @fromScene("Hazard12") public hazard12: Mesh 
    //@fromMaterials("materials/wallmat2.material") private newMat : Material;
    private newMat : Material = null;
    private newMat2 : Material = null;
    private newMat3 : Material = null;
    @fromScene("Map") public map:TransformNode;
    @fromScene("Map2") public map2:TransformNode;
    @fromScene("Map3") public map3:TransformNode;
    @fromScene("Map4") public map4:TransformNode;
    @fromScene("Sky") public sky:Mesh;
    public hazardArray : Mesh[] = new Array(3);
    public mapArray : TransformNode[] = new Array(4);
    public canJump : boolean = true;
    @visibleInInspector("number","health",1)
    public health: number;
    @onKeyboardEvent("a", KeyboardEventTypes.KEYUP)
    protected _keyup(info: KeyboardInfo): void {
        if(this.canMove)
        {
        this.horizontalSpeed = 0
        }
    };
    @onKeyboardEvent("a", KeyboardEventTypes.KEYDOWN)
    protected _keydown(info: KeyboardInfo): void {
        if(this.canMove)
        {
        this.horizontalSpeed = 1
        }
    };
    @onKeyboardEvent("d", KeyboardEventTypes.KEYUP)
    protected _dkeyup(info: KeyboardInfo): void {
        if(this.canMove)
        {
        this.horizontalSpeed = 0
        }
    };
    @onKeyboardEvent("d", KeyboardEventTypes.KEYDOWN)
    protected _dkeydown(info: KeyboardInfo): void {
        if(this.canMove)
        {
        this.horizontalSpeed = -1
        }
    };
 
    
    @onKeyboardEvent(" ", KeyboardEventTypes.KEYDOWN)
    protected _spacekeydown(info: KeyboardInfo): void {
        
        if(this.canJump)
        {
            
        this.timeOfJump = new Date().getTime();
        this.verticalSpeed = 3
        this.canJump = false;
        
        this.skeleton.beginAnimation("jump",false,3,this.anim)
       this._jump.play();
        }
    };

    @onKeyboardEvent("p", KeyboardEventTypes.KEYDOWN)
    protected _pauseKey(info: KeyboardInfo): void {
        
        if(this.paused)
        {
            this.resumeButton.isVisible = false;

            this.quitButton.isVisible = false;
            this.canMove = true;
            this.canJump = true;
            this.paused = false
        }
        if(this.paused == false)
        {
            this.resumeButton.isVisible = true;

            this.quitButton.isVisible = true;
            this.canMove = false;
            this.canJump = false;
            this.paused = true;
            
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
        this.hazardArray.push(this.hazard3)
        this.hazardArray.push(this.hazard4)
        this.hazardArray.push(this.hazard5)
        this.hazardArray.push(this.hazard6)
        this.hazardArray.push(this.hazard7)
        this.hazardArray.push(this.hazard8)
        this.hazardArray.push(this.hazard9)
        this.hazardArray.push(this.hazard10)
        this.hazardArray.push(this.hazard11)
        this.hazardArray.push(this.hazard12)
        this.mapArray.push(this.map)
        this.mapArray.push(this.map2)
        this.mapArray.push(this.map3)
        this.mapArray.push(this.map4)
        
    }
    /**
     * Called on the scene starts.
     */
    public onStart(): void {
        // ...
        this._song.loop = true;
        this._song.play();
        this.newMat = this.hazard1.material;
        this.newMat2 = this.hazard2.material;
        
        this.newMat3 = this.hazard3.material;
        this.hazardArray.forEach(element => {
            element.scaling.y =Math.floor((Math.random() * (1+2)) + 1);
            element.setAbsolutePosition( new Vector3(Math.floor(Math.random() * (40-1) + 1),element.getAbsolutePosition().y,element.getAbsolutePosition().z))
            let random = Math.random();
            if(random < .33)
            {
                element.material = this.newMat;
            }
            else if(random > .66){
                element.material = this.newMat2;
            }
            else{
                element.material = this.newMat3;
            }
            
        });
       
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


        this.resetButton.width = .2;
    this.resetButton.height = 0.1;
    this.resetButton.color = "white";
    this.resetButton.fontSize = 20;
    this.resetButton.background = "red";
    this.resetButton.textBlock.text = "Restart";
    this.resetButton.onPointerUpObservable.add( ()=>{this.Reset();} );
    this.resetButton.isVisible = false;
    this.advancedTexture.addControl(this.resetButton);

    this.resumeButton.width = .2;
    this.resumeButton.height = 0.1;
    this.resumeButton.color = "white";
    this.resumeButton.fontSize = 20;
    this.resumeButton.background = "red";
    this.resumeButton.textBlock.text = "Resume";
    this.resumeButton.onPointerUpObservable.add( ()=>{this.Resume();} );
    this.resumeButton.isVisible = false;
    this.advancedTexture.addControl(this.resumeButton);

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
        
        if(!this.paused)
        {
       this.score++;
       if(this.score %10 == 0 && this.resetButton.isVisible == false)
       {this.updateOverlay();}
        }
      this.hazardArray.forEach(element => {
        if(this.intersectsMesh(element,true,true))
        {
            element.setAbsolutePosition( new Vector3(element.getAbsolutePosition().x,element.getAbsolutePosition().y,element.getAbsolutePosition().z-200))
            this.resetButton.isVisible = true;
            this.quitButton.isVisible = true;
            
            this.horizontalSpeed = 0;
            this.canMove = false;
            this.canJump = false;
            
        }
        else if(this.position.z < element.position.z)
        {
            
            if(!this.canJump && (Vector3.Distance(new Vector3(element.getAbsolutePosition().x,0,0),new Vector3(this.getAbsolutePosition().x,0,0)) < 10))
                {
                    
                    this.score += 200;
                }
                console.debug(Vector3.Distance(new Vector3(element.getAbsolutePosition().x,0,0),new Vector3(this.getAbsolutePosition().x,0,0)));
                element.setAbsolutePosition( new Vector3(Math.floor(Math.random() * (40-1) + 1),element.getAbsolutePosition().y,element.getAbsolutePosition().z-650))
                element.scaling.y =Math.floor((Math.random() * (1+2)) + 1);
                
                
            
        }
       });
       this.mapArray.forEach(element => {
        if(this.position.z < element.position.z-150)
       {
        element.position.z -=900
       }
       });
       
        
        if(this.canMove)
        {
            this.locallyTranslate(new Vector3(this.horizontalSpeed ,this.verticalSpeed,-this.speedF - ((this.score+1) /10000)))
            
            this.sky.locallyTranslate(new Vector3(0,0,-this.speedF - ((this.score+1) /10000)))
            if(this.currentTime - this.timeOfJump > 200)
            {
            this.verticalSpeed = 0;
            
            }
            if(this.currentTime - this.timeOfJump > 800)
            {
                this.canJump = true;
                
            }
            this.rotationQuaternion = Quaternion.Identity();
           this.currentTime = new Date().getTime();
           if(this.position.x >38)
           {
            this.position.x = 38;
           }
           if(this.position.x <0)
           {
            this.position.x = 0;
           }
        }
          
    }
    public Reset(): void{
        
        game.loadScene("scene/scene.babylon");
    }

    public Resume(): void{
        this.canJump = true;
        this.canMove = true;    
        this.resumeButton.isVisible = false;

        this.quitButton.isVisible = false;
        this.paused = false;
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
