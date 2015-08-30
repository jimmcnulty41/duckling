///<reference path="../../core/Component.ts"/>
module entityframework.components.drawing {

    import serialize = util.serialize;
    import observe = framework.observe;

    @serialize.ProvideClass(DrawableComponent, "ild::DrawableComponent")
    export class DrawableComponent extends Component {
        @observe.Primitive()
        private _camEntity : string;

        @serialize.Key("drawables")
        private _drawables : framework.observe.ObservableMap<Drawable>;

        constructor() {
            super();
            this._drawables = new framework.observe.ObservableMap<Drawable>();
            this._drawables.listenForChanges("drawables", this);
        }

        getDrawable<T extends Drawable>(key:string) : T {
            return <T>this.drawables.get(key);
        }

        get drawables() {
            return this._drawables;
        }
    }

    class DrawableViewModel extends framework.ViewModel<DrawableComponent> {
        get viewFile() : string {
            return 'components/drawable';
        }
    }

    export class DrawableComponentFactory implements ComponentFactory {

        get displayName() {
            return "Drawable";
        }

        get name() {
            return "drawable";
        }

        createFormVM():framework.ViewModel<any> {
            return new DrawableViewModel();
        }

        createComponent():entityframework.Component {
            return new DrawableComponent();
        }
    }
}