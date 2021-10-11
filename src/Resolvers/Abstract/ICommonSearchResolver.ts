import { CommonSearchResult } from "../../Model/Inputs/CommonSearchResult";

export interface ICommonSearchResolver {
    search(searchText: string): Promise<Array<typeof CommonSearchResult>>
}