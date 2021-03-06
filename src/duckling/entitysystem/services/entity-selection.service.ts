import {Component, Injectable} from '@angular/core';
import {EntityKey, Entity} from '../entity';
import {EntitySystemService} from '../entity-system.service';
import {Vector, boxContainsPoint} from '../../math';
import {RenderPriorityService} from '../../canvas/drawing/render-priority.service';

import {EntityBoxService} from './entity-box.service';

/**
 * The EntitySelectionService is used to select entities.
 */
@Injectable()
export class EntitySelectionService {

    constructor(private _entitySystemService : EntitySystemService,
                private _entityBoxService : EntityBoxService,
                private _renderPriority : RenderPriorityService) {

    }

    /**
     * Get the key of the entity that contains the point. If multiple entities contain the
     * point it is not well defined which entity will be returned.
     * @param  position Position that may overlap with an entity.
     * @return The key of the entity contained at the position.
     */
    getEntityKey(position : Vector) : EntityKey {
        let entities = Array.from(this._renderPriority.sortEntities(this._entitySystemService.entitySystem.getValue()));
        entities.reverse();
        let entity = entities.find(entity => this._entityContainsPoint(entity, position));
        let key = this._entitySystemService.getKey(entity);

        if (key) {
            return key;
        } else {
            return null;
        }
    }

    private _entityContainsPoint(entity : Entity, position : Vector) {
        return boxContainsPoint(this._entityBoxService.getEntityBox(entity), position);
    }
}
