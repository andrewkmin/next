// Global meta values
export const GLOBAL_META_TITLE = "Polygon";
// prettier-ignore
export const GLOBAL_META_DESCRIPTION = "Polygon is an open-source and privacy-oriented social network that is not hungry for your data";

// Global OpenGraph meta values
export const OPEN_GRAPH_GLOBAL_TYPE = "website";

// Meta values for `/create` endpoint
export const CREATE_POST_META_TITLE = `Create post - ${GLOBAL_META_TITLE}`;
export const CREATE_POST_META_DESCRIPTION = `Create a post at Polygon. ${GLOBAL_META_DESCRIPTION}`;

// Meta values for `/welcome` endpoint
export const WELCOME_META_DESCRIPTION = `Welcome to Polygon. ${GLOBAL_META_DESCRIPTION}`;

// Meta values for `/users/[username]` endpoint
export const OPEN_GRAPH_USERS_TYPE = "profile";
/**
 * Takes **1** parameter
 *
 * `%s` - Username
 */
export const USERS_META_TITLE = `%s's profile at Polygon`;
/**
 * Takes **1** parameter
 *
 * `%s` - Username
 */
export const USERS_META_DESCRIPTION = `Visit ${USERS_META_TITLE}. ${GLOBAL_META_DESCRIPTION}`;

export const OPEN_GRAPH_POST_TYPE = "article";
/**
 * Takes **1** parameter
 *
 * `%s` - Username
 */
export const POST_META_TITLE = "%'s post at Polygon";
/**
 * Takes **3** parameters
 *
 * `%s` - Username
 * `%s` - Post title
 * `%s` - Post description
 */
export const POST_META_DESCRIPTION = `${POST_META_TITLE}. %s. %s`;
