import { Node} from "@babylonjs/core/node";
import { Scene ,Mesh,Vector3} from "@babylonjs/core";
import { BabylonFileLoaderConfiguration, Engine, SceneLoader } from "@babylonjs/core";
import { guiComponent,fromScene } from "./decorators";
import { AdvancedDynamicTexture } from "@babylonjs/gui/2D/advancedDynamicTexture";
import {Button, TextBlock } from "@babylonjs/gui";
import { platform } from "os";
import { sceneUboDeclaration } from "@babylonjs/core/Shaders/ShadersInclude/sceneUboDeclaration";
import { Game } from "..";
import { text } from "stream/consumers";

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
export default class MyScript extends Node {
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    protected constructor() { }
    
    
    
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
    public loadScene()
    {
        game.loadScene("scene/scene.babylon");
    }
    /**
     * Called on the scene starts.
     */
    public onStart(): void {
        // ...
        
        const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("myUI", true)

        var textTitle=   new TextBlock;
   textTitle.text = "Cyberun"
   textTitle.outlineWidth = 3;
   textTitle.outlineColor= "black";
   textTitle.fontFamily = "Verdana";
    textTitle.fontStyle = "bold"    
    textTitle.color = "magenta";
    textTitle.fontSize = 60;
    textTitle.top = "-40%";
   
    
    advancedTexture.addControl(textTitle);

    var textControls=   new TextBlock;
    textControls.text = "Use A and D to move left and right!"
    textControls.outlineWidth = 3;
    textControls.outlineColor= "black";
    textControls.fontFamily = "Verdana";
    textControls.fontStyle = "bold"    
    textControls.color = "magenta";
    textControls.fontSize = 20;
   
    textControls.top = "-20%";
    textControls.left = "30%";
   
    
    advancedTexture.addControl(textControls);
    
    var textControls1=   new TextBlock;
   textControls1.text = "Use space to jump! "
   textControls1.outlineWidth = 3;
   textControls1.outlineColor= "black";
   textControls1.fontFamily = "Verdana";
    textControls1.fontStyle = "bold"    
    textControls1.color = "magenta";
    textControls1.fontSize = 20;
   
    textControls1.top = "-10%";
    textControls1.left = "30%";
   
   
    
    advancedTexture.addControl(textControls1);

    var textControls2=   new TextBlock;
    textControls2.text = "You can pause with P!"
    textControls2.outlineWidth = 3;
    textControls2.outlineColor= "black";
    textControls2.fontFamily = "Verdana";
    textControls2.fontStyle = "bold"    
    textControls2.color = "magenta";
    textControls2.fontSize = 20;
   
    textControls2.top = "0%";
    textControls2.left = "30%";
   
   
    
    advancedTexture.addControl(textControls2);
    
             var button1=   Button.CreateSimpleButton("but1","Play");
             button1.width = .2;
    button1.height = 0.15;
    button1.color = "white";
    button1.fontSize = 40;
    button1.background = "purple";
    button1.onPointerUpObservable.add(()=>{this.loadScene();} 
        
    
        
    );
    advancedTexture.addControl(button1);
                

    //var buttonQuit=   Button.CreateSimpleButton("but2","Quit");
             //buttonQuit.width = .2;
             //buttonQuit.height = 0.15;
             //buttonQuit.color = "white";
    //buttonQuit.fontSize = 40;
    //buttonQuit.background = "purple";
    //buttonQuit.onPointerUpObservable.add(()=>{window.close();} );
    //buttonQuit.top = "20%";
        
    
        
    
    //advancedTexture.addControl(buttonQuit);


    }

    /**
     * Called each frame.
     */
    public onUpdate(): void {
        // ...
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
