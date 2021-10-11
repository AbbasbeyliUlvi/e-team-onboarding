import { CommonSearchResult } from "../../Model/Inputs/CommonSearchResult";


export interface ICommonSearchService {
    search(searchText: string): Promise<Array<typeof CommonSearchResult>>
}