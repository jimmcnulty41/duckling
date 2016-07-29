export * from './base-tool';
export * from './entity-creator-tool';
export * from './entity-move-tool';
export * from './map-move-tool';
export * from './tool.service';

import {EntityCreatorTool} from './entity-creator-tool';
import {EntityMoveTool} from './entity-move-tool';
import {MapMoveTool} from './map-move-tool';
import {ToolService} from './tool.service';

export const TOOL_PROVIDERS = [
    EntityCreatorTool,
    EntityMoveTool,
    MapMoveTool,
    ToolService,
]