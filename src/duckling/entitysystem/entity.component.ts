import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    ChangeDetectionStrategy
} from 'angular2/core';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';

import {Entity, AttributeKey, Attribute, TaggedAttribute} from './entity';
import {AttributeComponent} from './attribute.component';
import {immutableAssign, toTitleCase} from '../util';

/**
 * Display a form that allows for editting the attributes attached to a component.
 */
@Component({
    selector: "dk-entity-component",
    directives: [AttributeComponent, MD_CARD_DIRECTIVES],
    styleUrls: ['./duckling/entitysystem/entity.component.css'],
    template: `
        <div *ngFor="#key of keys()">
            <md-card>
                <md-card-title>{{formatCardTitle(key)}}</md-card-title>
                <md-card-content>
                    <attribute-component
                        [key]="key"
                        [attribute]="entity[key]"
                        (attributeChanged)="onAttributeChanged(key, $event)">
                    </attribute-component>
                </md-card-content>
            </md-card>
        </div>
    `,
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class EntityComponent {
    @Input() entity : Entity;

    @Output() entityChanged : EventEmitter<Entity> = new EventEmitter();

    keys() {
        return Object.keys(this.entity);
    }

    onAttributeChanged(key : AttributeKey, attribute : Attribute) {
        var entityPatch : any = {};
        entityPatch[key] = attribute;
        this.entityChanged.emit(immutableAssign(this.entity, entityPatch));
    }

    formatCardTitle(title : string) : string {
        return toTitleCase(title);
    }
}
