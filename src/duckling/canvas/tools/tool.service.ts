import {Injectable} from 'angular2/core';

import {ToolbarOption} from '../../controls';
import {EntityCreatorTool, BaseTool, EntityMoveTool} from '../tools';

/**
 * Provide access to tools for the canvas.
 * @return {[type]} [description]
 */
@Injectable()
export class ToolService {
    private _tools : {[key:string]:BaseTool} = {};
    private _default : BaseTool;

    constructor(entityCreator : EntityCreatorTool,
                entityMoveTool : EntityMoveTool) {
        this._default = entityMoveTool;
        this.addTool(entityCreator);
        this.addTool(entityMoveTool);
    }

    /**
     * The default tool.
     */
    get defaultTool() : BaseTool {
        return this._default;
    }

    /**
     * Get the select options for the available tools.
     */
    get toolOptions() : ToolbarOption[] {
        var options : ToolbarOption[] = [];
        for (var toolKey in this._tools) {
            options.push({
                value : toolKey,
                title : this._tools[toolKey].label,
                icon : this._tools[toolKey].icon
            });
        }
        return options;
    }

    /**
     * Get the tool corresponding to the given key.
     * @param  key Key of the tool that should be retrieved.
     * @return A tool instance.
     */
    getTool(key : string) : BaseTool {
        return this._tools[key];
    }

    /**
     * Add a tool to the storage in the system.
     * @param  baseTool Tool to add to the service.
     */
    addTool(baseTool : BaseTool) {
        this._tools[baseTool.key] = baseTool;
    }
}
