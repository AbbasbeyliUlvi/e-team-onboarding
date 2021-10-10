import Container, { Constructable } from "typedi";


export class ContainerHelper {
    private static dict: { [index: string]: Constructable<unknown> } = {};

    public static set<TI>(id: string, type: Constructable<TI>) {
        this.dict[id] = type;
        Container.set({ id, type });
        return ContainerHelper;
    }

    public static get<TI>(id: string): TI {
        return Container.get<TI>(id);
    }

    public static getConstructor<TI = unknown>(id: string): Constructable<TI> {
        const _type = this.dict[id] as Constructable<TI>;
        return _type;
    }
}