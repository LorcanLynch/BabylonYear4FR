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
        _this.advancedTexture = advancedDynamicTexture_1.AdvancedDynamicTexture.CreateFullscreenUI("myUI", true);
        _this.resetButton = gui_1.Button.CreateSimpleButton("but1", "click");
        _this.quitButton = gui_1.Button.CreateSimpleButton("but2", "Quit");
        _this.resumeButton = gui_1.Button.CreateSimpleButton("but3", "click");
        _this.scoreText = new gui_1.TextBlock();
        _this.score = 1;
        _this.timeOfJump = new Date().getTime();
        _this.currentTime = new Date().getTime();
        _this.speedF = 1;
        _this.canMove = true;
        _this.paused = false;
        _this.hazardArray = new Array(3);
        _this.mapArray = new Array(4);
        _this.canJump = true;
        return _this;
    }
    MyScript.prototype._keyup = function (info) {
        if (this.canMove) {
            this.horizontalSpeed = 0;
        }
    };
    ;
    MyScript.prototype._keydown = function (info) {
        if (this.canMove) {
            this.horizontalSpeed = 1;
        }
    };
    ;
    MyScript.prototype._dkeyup = function (info) {
        if (this.canMove) {
            this.horizontalSpeed = 0;
        }
    };
    ;
    MyScript.prototype._dkeydown = function (info) {
        if (this.canMove) {
            this.horizontalSpeed = -1;
        }
    };
    ;
    MyScript.prototype._spacekeydown = function (info) {
        if (this.canJump) {
            this.timeOfJump = new Date().getTime();
            this.verticalSpeed = 3;
            this.canJump = false;
            this.skeleton.beginAnimation("jump", false, 3, this.anim);
            this._jump.play();
        }
    };
    ;
    MyScript.prototype._pauseKey = function (info) {
        if (this.paused) {
            this.resumeButton.isVisible = false;
            this.quitButton.isVisible = false;
            this.canMove = true;
            this.canJump = true;
            this.paused = false;
        }
        if (this.paused == false) {
            this.resumeButton.isVisible = true;
            this.quitButton.isVisible = true;
            this.canMove = false;
            this.canJump = false;
            this.paused = true;
        }
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
        this.hazardArray.push(this.hazard1);
        this.hazardArray.push(this.hazard2);
        this.hazardArray.push(this.hazard3);
        this.hazardArray.push(this.hazard4);
        this.hazardArray.push(this.hazard5);
        this.hazardArray.push(this.hazard6);
        this.hazardArray.push(this.hazard7);
        this.hazardArray.push(this.hazard8);
        this.hazardArray.push(this.hazard9);
        this.hazardArray.push(this.hazard10);
        this.hazardArray.push(this.hazard11);
        this.hazardArray.push(this.hazard12);
        this.mapArray.push(this.map);
        this.mapArray.push(this.map2);
        this.mapArray.push(this.map3);
        this.mapArray.push(this.map4);
    };
    /**
     * Called on the scene starts.
     */
    MyScript.prototype.onStart = function () {
        var _this = this;
        // ...
        this._song.loop = true;
        this._song.play();
        this.hazardArray.forEach(function (element) {
            element.scaling.y = Math.floor((Math.random() * (1 + 2)) + 1);
            element.setAbsolutePosition(new core_1.Vector3(Math.floor(Math.random() * (40 - 1) + 1), element.getAbsolutePosition().y, element.getAbsolutePosition().z));
        });
        this.scoreText.text = "Score: 0";
        this.scoreText.outlineWidth = 3;
        this.scoreText.outlineColor = "black";
        this.scoreText.fontFamily = "Verdana";
        this.scoreText.fontStyle = "bold";
        this.scoreText.top = "-40%";
        this.scoreText.left = "40%";
        this.scoreText.width = .2;
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
        this.resetButton.onPointerUpObservable.add(function () { _this.Reset(); });
        this.resetButton.isVisible = false;
        this.advancedTexture.addControl(this.resetButton);
        this.resumeButton.width = .2;
        this.resumeButton.height = 0.1;
        this.resumeButton.color = "white";
        this.resumeButton.fontSize = 20;
        this.resumeButton.background = "red";
        this.resumeButton.textBlock.text = "Resume";
        this.resumeButton.onPointerUpObservable.add(function () { _this.Resume(); });
        this.resumeButton.isVisible = false;
        this.advancedTexture.addControl(this.resumeButton);
        this.quitButton.width = .2;
        this.quitButton.height = 0.1;
        this.quitButton.color = "white";
        this.quitButton.fontSize = 20;
        this.quitButton.background = "red";
        this.quitButton.textBlock.text = "Quit.";
        this.quitButton.onPointerUpObservable.add(function () { game.loadScene("UIScene/scene.babylon"); });
        this.quitButton.isVisible = false;
        this.quitButton.top = "20%";
        this.advancedTexture.addControl(this.quitButton);
        this.skeleton.beginAnimation("Walk", true);
    };
    MyScript.prototype.anim = function () {
        // ...
        this.skeleton.beginAnimation("Walk", true);
    };
    /**
     * Called each frame.
     */
    MyScript.prototype.updateOverlay = function () {
        this.scoreText.text = "".concat("Score: " + this.score);
    };
    MyScript.prototype.onUpdate = function () {
        var _this = this;
        if (!this.paused) {
            this.score++;
            if (this.score % 10 == 0 && this.resetButton.isVisible == false) {
                this.updateOverlay();
            }
        }
        this.hazardArray.forEach(function (element) {
            if (_this.intersectsMesh(element, true, true)) {
                element.setAbsolutePosition(new core_1.Vector3(element.getAbsolutePosition().x, element.getAbsolutePosition().y, element.getAbsolutePosition().z - 200));
                _this.resetButton.isVisible = true;
                _this.quitButton.isVisible = true;
                _this.horizontalSpeed = 0;
                _this.canMove = false;
                _this.canJump = false;
            }
            else if (_this.position.z < element.position.z) {
                element.setAbsolutePosition(new core_1.Vector3(Math.floor(Math.random() * (40 - 1) + 1), element.getAbsolutePosition().y, element.getAbsolutePosition().z - 650));
                element.scaling.y = Math.floor((Math.random() * (1 + 2)) + 1);
            }
        });
        this.mapArray.forEach(function (element) {
            if (_this.position.z < element.position.z - 150) {
                element.position.z -= 900;
            }
        });
        if (this.canMove) {
            this.locallyTranslate(new core_1.Vector3(this.horizontalSpeed, this.verticalSpeed, -this.speedF - ((this.score + 1) / 10000)));
            this.sky.locallyTranslate(new core_1.Vector3(0, 0, -this.speedF - ((this.score + 1) / 10000)));
            if (this.currentTime - this.timeOfJump > 200) {
                this.verticalSpeed = 0;
            }
            if (this.currentTime - this.timeOfJump > 800) {
                this.canJump = true;
            }
            this.rotationQuaternion = core_1.Quaternion.Identity();
            this.currentTime = new Date().getTime();
            if (this.position.x > 38) {
                this.position.x = 38;
            }
            if (this.position.x < 0) {
                this.position.x = 0;
            }
        }
    };
    MyScript.prototype.Reset = function () {
        game.loadScene("scene/scene.babylon");
    };
    MyScript.prototype.Resume = function () {
        this.canJump = true;
        this.canMove = true;
        this.resumeButton.isVisible = false;
        this.quitButton.isVisible = false;
        this.paused = false;
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
        (0, decorators_1.fromSounds)("Sounds/jump.wav", "global")
    ], MyScript.prototype, "_jump", void 0);
    __decorate([
        (0, decorators_1.fromSounds)("Sounds/music.mp3", "global")
    ], MyScript.prototype, "_song", void 0);
    __decorate([
        (0, decorators_1.fromScene)("Hazard1")
    ], MyScript.prototype, "hazard1", void 0);
    __decorate([
        (0, decorators_1.fromScene)("Hazard2")
    ], MyScript.prototype, "hazard2", void 0);
    __decorate([
        (0, decorators_1.fromScene)("Hazard3")
    ], MyScript.prototype, "hazard3", void 0);
    __decorate([
        (0, decorators_1.fromScene)("Hazard4")
    ], MyScript.prototype, "hazard4", void 0);
    __decorate([
        (0, decorators_1.fromScene)("Hazard5")
    ], MyScript.prototype, "hazard5", void 0);
    __decorate([
        (0, decorators_1.fromScene)("Hazard6")
    ], MyScript.prototype, "hazard6", void 0);
    __decorate([
        (0, decorators_1.fromScene)("Hazard7")
    ], MyScript.prototype, "hazard7", void 0);
    __decorate([
        (0, decorators_1.fromScene)("Hazard8")
    ], MyScript.prototype, "hazard8", void 0);
    __decorate([
        (0, decorators_1.fromScene)("Hazard9")
    ], MyScript.prototype, "hazard9", void 0);
    __decorate([
        (0, decorators_1.fromScene)("Hazard10")
    ], MyScript.prototype, "hazard10", void 0);
    __decorate([
        (0, decorators_1.fromScene)("Hazard11")
    ], MyScript.prototype, "hazard11", void 0);
    __decorate([
        (0, decorators_1.fromScene)("Hazard12")
    ], MyScript.prototype, "hazard12", void 0);
    __decorate([
        (0, decorators_1.fromScene)("Map")
    ], MyScript.prototype, "map", void 0);
    __decorate([
        (0, decorators_1.fromScene)("Map2")
    ], MyScript.prototype, "map2", void 0);
    __decorate([
        (0, decorators_1.fromScene)("Map3")
    ], MyScript.prototype, "map3", void 0);
    __decorate([
        (0, decorators_1.fromScene)("Map4")
    ], MyScript.prototype, "map4", void 0);
    __decorate([
        (0, decorators_1.fromScene)("Sky")
    ], MyScript.prototype, "sky", void 0);
    __decorate([
        (0, decorators_1.visibleInInspector)("number", "health", 1)
    ], MyScript.prototype, "health", void 0);
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
    __decorate([
        (0, decorators_1.onKeyboardEvent)(" ", core_1.KeyboardEventTypes.KEYDOWN)
    ], MyScript.prototype, "_spacekeydown", null);
    __decorate([
        (0, decorators_1.onKeyboardEvent)("p", core_1.KeyboardEventTypes.KEYDOWN)
    ], MyScript.prototype, "_pauseKey", null);
    return MyScript;
}(core_1.Mesh));
exports.default = MyScript;
//# sourceMappingURL=PlayerMove.js.map