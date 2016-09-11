import {
    Component
} from '@angular/core';

import {Entity, EntityKey, EntitySystemService, AttributeDefaultService, AttributeKey} from '../entitysystem';
import {SelectionService, Selection} from '../selection';
import {newMergeKey} from '../state';
import {immutableAssign} from '../util';
import {DeleteButton, ToolbarButton, InputComponent} from '../controls';

import {EntityComponent} from './entity.component';
import {EntityNameComponent} from './entity-name.component';
import {AttributeSelectorComponent} from './attribute-selector.component';

/**
 * Component that allows the user to modify an entity.
 */
@Component({
    selector: "dk-entity-editor",
    directives: [
        EntityComponent,
        AttributeSelectorComponent,
        EntityNameComponent
    ],
    template: `
        <div *ngIf="selection?.selectedEntity">
            <dk-entity-name
                [currentSelectedEntity]="selection.selectedEntity"
                (deleteEntity)="onDeleteEntity()"
                (renameEntity)="onRenameEntity($event)">
            </dk-entity-name>
            <dk-entity-component
                [entity]="selection.entity"
                (entityChanged)="onEntityChanged($event)">
            </dk-entity-component>
            <dk-attribute-selector
                (addAttribute)="addAttribute($event)"
                [entity]="selection.entity">
            </dk-attribute-selector>
        </div>
        <div *ngIf="!(selection?.selectedEntity)">
            <md-card>
                <md-card-content>
                    No Entity Selected
                </md-card-content>
            </md-card>
        </div>
    `
})
export class EntityEditorComponent {
    selection : Selection;

    constructor(private _selection : SelectionService,
                private _entitySystem : EntitySystemService,
                private _attributeDefault : AttributeDefaultService) {
        _selection.selection.subscribe((selection) => {
            this.selection = selection
        });
    }

    onEntityChanged(entity : Entity) {
        this._entitySystem.updateEntity(this.selection.selectedEntity, entity);
    }

    onDeleteEntity() {
        let mergeKey = newMergeKey();
        let entityKey = this.selection.selectedEntity;
        this._selection.deselect(mergeKey);
        this._entitySystem.deleteEntity(entityKey, mergeKey);
    }

    onRenameEntity(newName : string) {
        let mergeKey = newMergeKey();
        this._entitySystem.renameEntity(this.selection.selectedEntity, newName, mergeKey);
        this._selection.select(newName, mergeKey);
    }

    addAttribute(key : AttributeKey) {
        let defaultAttribute = this._attributeDefault.createAttribute(key);

        let patch : any = {};
        patch[key] = defaultAttribute;
        let newEntity = immutableAssign(this.selection.entity, patch);
        this.onEntityChanged(newEntity);
    }
}
