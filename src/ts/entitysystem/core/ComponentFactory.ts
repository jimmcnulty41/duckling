module entityframework {
    /**
     * Interface for factories that create all of the objects needed for generically
     * interacting with components.
     */
    export interface ComponentFactory {
        name : string;
        displayName : string;

        /**
         * Create a ViewModel that represents a form capable of editing the
         * component.
         */
        createFormVM() : framework.ViewModel<any>;

        /**
         * Create a new instance of the component.
         */
        createComponent() : Component;
    }
}