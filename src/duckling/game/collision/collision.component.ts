import {
    Component,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

import {VectorInputComponent, FormLabelComponent, ArraySelectComponent} from '../../controls';
import {EnumSelectComponent} from '../../controls/enum-select.component';
import {Vector} from '../../math/vector';
import {immutableAssign} from '../../util/model';
import {CollisionAttribute, BodyTypeSelect, CollisionTypeSelect} from './collision-attribute';

/**
 * Implementation that will be registered with the AttributeComponentService.
 * @see AttributeComponentService
 * @see AttributeComponent
 */
@Component({
    selector: "dk-collision",
    styleUrls: ['./duckling/game/collision/collision.component.css'],
    template: `
        <dk-vector-input
            xLabel="Width"
            yLabel="Height"
            [value]="attribute.dimension.dimension"
            (validInput)="onDimensionInput($event)">
        </dk-vector-input>
        <dk-vector-input
            xLabel="One Way Normal X"
            yLabel="One Way Normal Y"
            [value]="attribute.oneWayNormal"
            (validInput)="onOneWayNormalInput($event)">
        </dk-vector-input>

        <div class="form-label">Body Type</div>
        <dk-array-select
            [value]="attribute.bodyType"
            [options]="bodyTypes"
            (selection)="onBodyTypeInput($event)">
        </dk-array-select>

        <div class="form-label">Collision Type</div>
        <dk-array-select
            [value]="attribute.collisionType"
            [options]="collisionTypes"
            (selection)="onCollisionTypeInput($event)">
        </dk-array-select>
    `
})
export class CollisionComponent {
    @Input() attribute : CollisionAttribute;
    @Output() attributeChanged = new EventEmitter<CollisionAttribute>();

    bodyTypes = BodyTypeSelect;
    collisionTypes = CollisionTypeSelect;

    onOneWayNormalInput(oneWayNormal : Vector) {
        this.attributeChanged.emit(immutableAssign(this.attribute, {oneWayNormal}));
    }

    onDimensionInput(dimension : Vector) {
        let newBox = immutableAssign(this.attribute.dimension, {dimension});
        this.attributeChanged.emit(immutableAssign(this.attribute, {dimension: newBox}));
    }

    onBodyTypeInput(bodyType : string) {
        this.attributeChanged.emit(immutableAssign(this.attribute, {bodyType}));
    }

    onCollisionTypeInput(collisionType : string) {
        this.attributeChanged.emit(immutableAssign(this.attribute, {collisionType}));
    }
}
