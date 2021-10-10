import { createUnionType } from "type-graphql";
import { BlogPost } from "../BlogPost";
import { User } from "../User";

export const CommonSearchResult = createUnionType({
  name: "CommonSearchResult",
  types: () => [BlogPost, User] as const,
  resolveType: value => {

    if ("title" in value) {
      return BlogPost;
    }
    if ("email" in value) {
      return User;
    }
    return undefined;

  },
});
