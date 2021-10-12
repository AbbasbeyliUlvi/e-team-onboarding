import { Arg, Query, Resolver } from "type-graphql";
import Container, { Service } from "typedi";

import { InjectionNames } from "../Infrastructure/Static/InjectionNames";
import { ICommonSearchResolver } from "./Abstract/ICommonSearchResolver";
import { ICommonSearchService } from "../Services/Abstract/ICommonSearchService";
import { CommonSearchResult } from "../Model/Inputs/CommonSearchResult";

@Service()
@Resolver()
export class CommonSearchResolver implements ICommonSearchResolver {
    private readonly commonSearchService: ICommonSearchService;

    constructor() {
        this.commonSearchService = Container.get<ICommonSearchService>(InjectionNames.ICommonSearchService)
    }

    @Query(_returns => [(CommonSearchResult)])
    async search(@Arg("searchText") searchText: string) {
        return this.commonSearchService.search(searchText);
    }

}