import { Payload } from "payload";

const posts = [
	{
		title: 'Post 1',
		publishedAt: new Date('2023-12-12').toISOString(),
		content: [
			{
				type: 'h1',
				children: [{ text: 'Post 1' }]
			},
			{
				type: 'p',
				children: [{ text: 'This is the first post' }]
			}
		],
	},
	{
		title: 'Post 2',
		publishedAt: new Date('2023-12-13').toISOString(),
		content: [
			{
				type: 'h1',
				children: [{ text: 'Post 2' }]
			},
			{
				type: 'p',
				children: [{ text: 'This is the second post' }]
			}
		],
	},
	{
		title: 'Post 3',
		publishedAt: new Date('2023-12-14').toISOString(),
		content: [
			{
				type: 'h1',
				children: [{ text: 'Post 3' }]
			},
			{
				type: 'p',
				children: [{ text: 'This is the third post' }]
			}
		],
	},
	{
		title: 'Post 4',
		publishedAt: new Date('2023-12-15').toISOString(),
		content: [
			{
				type: 'h1',
				children: [{ text: 'Post 4' }]
			},
			{
				type: 'p',
				children: [{ text: 'This is the fourth post' }]
			}
		],
	},
	{
		title: 'Post 5',
		publishedAt: new Date('2023-12-16').toISOString(),
		content: [
			{
				type: 'h1',
				children: [{ text: 'Post 5' }]
			},
			{
				type: 'p',
				children: [{ text: 'This is the fifth post' }]
			}
		],
	},
	{
		title: 'Post 6',
		publishedAt: new Date('2023-12-17').toISOString(),
		content: [
			{
				type: 'h1',
				children: [{ text: 'Post 6' }]
			},
			{
				type: 'p',
				children: [{ text: 'This is the sixth post' }]
			}
		],
	},
	{
		title: 'Post 7',
		publishedAt: new Date('2023-12-18').toISOString(),
		content: [
			{
				type: 'h1',
				children: [{ text: 'Post 7' }]
			},
			{
				type: 'p',
				children: [{ text: 'This is the seventh post' }]
			}
		],
	},
	{
		title: 'Post 8',
		publishedAt: new Date('2023-12-19').toISOString(),
		content: [
			{
				type: 'h1',
				children: [{ text: 'Post 8' }]
			},
			{
				type: 'p',
				children: [{ text: 'This is the eighth post' }]
			}
		],
	},
	{
		title: 'Post 9',
		publishedAt: new Date('2023-12-20').toISOString(),
		content: [
			{
				type: 'h1',
				children: [{ text: 'Post 9' }]
			},
			{
				type: 'p',
				children: [{ text: 'This is the ninth post' }]
			}
		],
	},
	{
		title: 'Post 10',
		publishedAt: new Date('2023-12-21').toISOString(),
		content: [
			{
				type: 'h1',
				children: [{ text: 'Post 10' }]
			},
			{
				type: 'p',
				children: [{ text: 'This is the tenth post' }]
			}
		],
	},
	{
		title: 'Post 11',
		publishedAt: new Date('2023-12-22').toISOString(),
		content: [
			{
				type: 'h1',
				children: [{ text: 'Post 11' }]
			},
			{
				type: 'p',
				children: [{ text: 'This is the eleventh post' }]
			}
		],
	},
	{
		title: 'Post 12',
		publishedAt: new Date('2023-12-23').toISOString(),
		content: [
			{
				type: 'h1',
				children: [{ text: 'Post 12' }]
			},
			{
				type: 'p',
				children: [{ text: 'This is the twelfth post' }]
			}
		],
	},
	{
		title: 'Post 13',
		publishedAt: new Date('2023-12-24').toISOString(),
		content: [
			{
				type: 'h1',
				children: [{ text: 'Post 13' }]
			},
			{
				type: 'p',
				children: [{ text: 'This is the thirteenth post' }]
			}
		],
	},
	{
		title: 'Post 14',
		publishedAt: new Date('2023-12-25').toISOString(),
		content: [
			{
				type: 'h1',
				children: [{ text: 'Post 14' }]
			},
			{
				type: 'p',
				children: [{ text: 'This is the fourteenth post' }]
			}
		],
	},
	{
		title: 'Post 15',
		publishedAt: new Date('2023-12-26').toISOString(),
		content: [
			{
				type: 'h1',
				children: [{ text: 'Post 15' }]
			},
			{
				type: 'p',
				children: [{ text: 'This is the fifteenth post' }]
			}
		],
	},
];

export async function seed(payload: Payload) {
	await Promise.allSettled(
		posts.map(async (post) => {
			await payload.create({
				collection: 'posts',
				data: post,
			})
		})
	)
}
