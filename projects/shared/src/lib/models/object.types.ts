/**
 * ObjectType is an object of string properties like 'name', 'id', ..
 *
 * Defining its properties as [index: string] was required in order to avoid TypeScript complaining when we use:
 *         option[this.keyToDisplay])
 * in EditChipsListComponent, where the name of the property (keyToDisplay) was unknown in beforehand.
 */
export type ObjectType = { [key: string]: any };
