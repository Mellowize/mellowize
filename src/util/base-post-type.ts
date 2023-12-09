import { CollectionConfig } from "payload/types";

const basePostType: Pick<CollectionConfig, 'fields' | 'access'> = {
	access: {
		read: () => true,
		create: () => true,
		update: () => true,
		delete: () => true,
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			label: 'Title',
			required: true,
		},
		{
			name: 'content',
			type: 'richText',
			label: 'Content',
			required: true,
		},
		{
			name: 'publishedAt',
			type: 'date',
			label: 'Published At',
			admin: {
				date: {
					pickerAppearance: 'dayAndTime',
				}
			},
			required: true,
		},
		{
			name: 'author',
			type: 'relationship',
			label: 'Author',
			required: true,
			relationTo: 'users',
		},
	],
};

export type BasePostType = {
	id: string;
	title: string;
	content: string;
	publishedAt: string;
	createdAt: string;
	updatedAt: string;
}

export default basePostType;