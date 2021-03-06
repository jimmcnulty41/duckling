import {DisplayObject} from 'pixi.js';

import {Vector} from '../../math';
import {CanvasComponent} from '../canvas.component';

export class BaseTool {

    getDisplayObject(canvasZoom : number) : DisplayObject {
        return null;
    }

    onStageDown(event : CanvasMouseEvent) {
    }

    onStageUp(event : CanvasMouseEvent) {
    }

    onStageMove(event : CanvasMouseEvent) {
    }

    onKeyDown(event : CanvasKeyEvent) {
    }

    onKeyUp(event : CanvasKeyEvent) {
    }

    onLeaveStage() {
    }

    get key() : string {
        throw new Error("Not yet implemented");
    }

    get label() : string {
        throw new Error("Not yet implemented");
    }

    get icon() : string {
        throw new Error("Not yet implemented");
    }
}

/**
 * Event describing a mouse action on the canvas
 */
export interface CanvasMouseEvent {
    /**
     * Coordinate of the mouse event in respect to the canvas element
     */
    canvasCoords : Vector;

    /**
     * Coordinate of the mouse event in respect to the virtual stage
     */
    stageCoords : Vector;

    /**
     * Canvas component the event came from
     */
    canvas : CanvasComponent;
}

/**
 * Event describing a keyboard action on the canvas
 */
export interface CanvasKeyEvent extends CanvasMouseEvent {
    /**
     * Key that was pressed during the event
     */
    keyCode : number;
}
