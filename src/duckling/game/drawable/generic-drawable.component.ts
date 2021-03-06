import {
    Component,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

import {VectorInputComponent, NumberInputComponent, FormLabelComponent} from '../../controls';
import {Vector} from '../../math';
import {immutableAssign} from '../../util';

import {Drawable} from './drawable';

/**
 * Component to edit the shared properties of all shapes
 */
@Component({
    selector: "dk-generic-drawable",
    styleUrls: ['./duckling/game/drawable/generic-drawable.component.css'],
    template: `
        <div class="inactive-checkbox">
            <md-checkbox
                class="inactive-checkbox"
                [checked]="drawable.inactive"
                (change)="onInactivePressed($event.checked)">
                Inactive?
            </md-checkbox>
        </div>

        <dk-number-input
            label="Render Priority"
            [value]="drawable.renderPriority"
            (validInput)="onRenderPriorityInput($event)">
        </dk-number-input>

        <dk-vector-input
            xLabel="Scale X"
            yLabel="Scale Y"
            [value]="drawable.scale"
            (validInput)="onScaleInput($event)">
        </dk-vector-input>

        <dk-vector-input
            xLabel="Position Offset X"
            yLabel="Position Offset Y"
            [value]="drawable.positionOffset"
            (validInput)="onPositionOffsetInput($event)">
        </dk-vector-input>

        <dk-number-input
            label="Rotation"
            [value]="drawable.rotation"
            (validInput)="onRotationInput($event)">
        </dk-number-input>
    `
})
export class GenericDrawableComponent {
    @Input() drawable : Drawable;
    @Output() drawableChanged = new EventEmitter<Drawable>();

    onRenderPriorityInput(newRenderPriority : number) {
        this.drawableChanged.emit(immutableAssign(this.drawable, {renderPriority: newRenderPriority}));
    }

    onScaleInput(newScale : Vector) {
        this.drawableChanged.emit(immutableAssign(this.drawable, {scale: newScale}));
    }

    onPositionOffsetInput(newPositionOffsetInput : Vector) {
        this.drawableChanged.emit(immutableAssign(this.drawable, {positionOffset: newPositionOffsetInput}));
    }

    onRotationInput(newRotation : number) {
        this.drawableChanged.emit(immutableAssign(this.drawable, {rotation: newRotation}));
    }

    onInactivePressed(inactive : boolean) {
        this.drawableChanged.emit(immutableAssign(this.drawable, {inactive: inactive}));
    }
}
