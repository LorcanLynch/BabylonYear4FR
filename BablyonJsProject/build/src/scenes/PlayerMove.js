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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@babylonjs/core");
var decorators_1 = require("./decorators");
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
    MyScript.prototype._keyup = function (info) {
        this.speed = 0;
    };
    ;
    MyScript.prototype._keydown = function (info) {
        this.speed = 1;
    };
    ;
    MyScript.prototype._dkeyup = function (info) {
        this.speed = 0;
    };
    ;
    MyScript.prototype._dkeydown = function (info) {
        this.speed = -1;
    };
    ;
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
    /**
     * Called on the scene starts.
     */
    MyScript.prototype.onStart = function () {
        // ...
    };
    /**
     * Called each frame.
     */
    MyScript.prototype.onUpdate = function () {
        this.moveWithCollisions(new core_1.Vector3(.01, 0, this.speed));
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
    __decorate([
        (0, decorators_1.onKeyboardEvent)("a", core_1.KeyboardEventTypes.KEYUP)
    ], MyScript.prototype, "_keyup", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)("a", core_1.KeyboardEventTypes.KEYDOWN)
    ], MyScript.prototype, "_keydown", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)("d", core_1.KeyboardEventTypes.KEYUP)
    ], MyScript.prototype, "_dkeyup", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)("d", core_1.KeyboardEventTypes.KEYDOWN)
    ], MyScript.prototype, "_dkeydown", null);
    return MyScript;
}(core_1.Mesh));
exports.default = MyScript;
//# sourceMappingURL=PlayerMove.js.map