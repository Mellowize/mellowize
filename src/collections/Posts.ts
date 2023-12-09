import { CollectionConfig } from "payload/types";
import basePostType from "../util/base-post-type";

const Posts: CollectionConfig = {
	...basePostType,
	slug: 'posts',
	fields: [
		...basePostType.fields,
	],
}

export default Posts;