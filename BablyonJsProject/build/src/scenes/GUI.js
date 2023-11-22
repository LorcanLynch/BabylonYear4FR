"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = require("@babylonjs/core/node");
var advancedDynamicTexture_1 = require("@babylonjs/gui/2D/advancedDynamicTexture");
var gui_1 = require("@babylonjs/gui");
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
var MyScript = /** @class */ (function (_super) {
    __extends(MyScript, _super);
    /**
     * Override constructor.
     * @warn do not fill.
     */
    // @ts-ignore ignoring the super call as we don't want to re-init
    function MyScript() {
        var _this = this;
        return _this;
    }
    /**
     * Called on the node is being initialized.
     * This function is called immediatly after the constructor has been called.
     */
    MyScript.prototype.onInitialize = function () {
        // ...
    };
    /**
     * Called on the node has been fully initialized and is ready.
     */
    MyScript.prototype.onInitialized = function () {
        // ...
    };
    MyScript.prototype.loadScene = function () {
        game.loadScene("scene/scene.babylon");
    };
    /**
     * Called on the scene starts.
     */
    MyScript.prototype.onStart = function () {
        // ...
        var _this = this;
        var advancedTexture = advancedDynamicTexture_1.AdvancedDynamicTexture.CreateFullscreenUI("myUI", true);
        var textTitle = new gui_1.TextBlock;
        textTitle.text = "Cyberun";
        textTitle.outlineWidth = 3;
        textTitle.outlineColor = "black";
        textTitle.fontFamily = "Verdana";
        textTitle.fontStyle = "bold";
        textTitle.color = "magenta";
        textTitle.fontSize = 60;
        textTitle.top = "-40%";
        advancedTexture.addControl(textTitle);
        var textControls = new gui_1.TextBlock;
        textControls.text = "Use A and D to move left and right!";
        textControls.outlineWidth = 3;
        textControls.outlineColor = "black";
        textControls.fontFamily = "Verdana";
        textControls.fontStyle = "bold";
        textControls.color = "magenta";
        textControls.fontSize = 20;
        textControls.top = "-20%";
        textControls.left = "30%";
        advancedTexture.addControl(textControls);
        var textControls1 = new gui_1.TextBlock;
        textControls1.text = "Use space to jump! ";
        textControls1.outlineWidth = 3;
        textControls1.outlineColor = "black";
        textControls1.fontFamily = "Verdana";
        textControls1.fontStyle = "bold";
        textControls1.color = "magenta";
        textControls1.fontSize = 20;
        textControls1.top = "-10%";
        textControls1.left = "30%";
        advancedTexture.addControl(textControls1);
        var textControls2 = new gui_1.TextBlock;
        textControls2.text = "You can pause with P!";
        textControls2.outlineWidth = 3;
        textControls2.outlineColor = "black";
        textControls2.fontFamily = "Verdana";
        textControls2.fontStyle = "bold";
        textControls2.color = "magenta";
        textControls2.fontSize = 20;
        textControls2.top = "0%";
        textControls2.left = "30%";
        advancedTexture.addControl(textControls2);
        var button1 = gui_1.Button.CreateSimpleButton("but1", "Play");
        button1.width = .2;
        button1.height = 0.15;
        button1.color = "white";
        button1.fontSize = 40;
        button1.background = "purple";
        button1.onPointerUpObservable.add(function () { _this.loadScene(); });
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
    };
    /**
     * Called each frame.
     */
    MyScript.prototype.onUpdate = function () {
        // ...
    };
    /**
     * Called on the object has been disposed.
     * Object can be disposed manually or when the editor stops running the scene.
     */
    MyScript.prototype.onStop = function () {
        // ...
    };
    /**
     * Called on a message has been received and sent from a graph.
     * @param name defines the name of the message sent from the graph.
     * @param data defines the data sent in the message.
     * @param sender defines the reference to the graph class that sent the message.
     */
    MyScript.prototype.onMessage = function (name, data, sender) {
        switch (name) {
            case "myMessage":
                // Do something...
                break;
        }
    };
    return MyScript;
}(node_1.Node));
exports.default = MyScript;
//# sourceMappingURL=GUI.js.map