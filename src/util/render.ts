import express from "express";
import { renderToPipeableStream } from "react-dom/server";
import { HttpError, isHttpError } from "./http-error";
import { stat } from "fs/promises";
import path from 'path';

// add render function to res type
declare global {
	namespace Express {
		interface Response {
			jsx: (template: string, fallbacks?: [string]) => Promise<void>
		}
	}
}

type Component = {
	default: (props: any) => React.JSX.Element,
	getServerSideProps?: (req: express.Request, res: express.Response) => any
}

function isComponent(obj: any): obj is Component {
	return obj.default !== undefined
}

type JSXRendererOptions = {
	viewDir: string
}

export const jsxRenderer = (opts: JSXRendererOptions) => {
	const middleware : express.RequestHandler  = (req, res, next) => {
		// add render function to res
		res.jsx = async (template: string, fallbacks?: string[]) => {
			if (fallbacks === undefined) {
				fallbacks = []
			}

			try {
				let foundTemplate: string | null = path.resolve(path.join(opts.viewDir, template));
				do {
					try {
						const templatePath = foundTemplate + '.tsx';
						await stat(path.resolve(templatePath))
						break;
					} catch (e) {
						if ((e as any).code === 'ENOENT') {
							if (fallbacks.length > 0) {
								foundTemplate = path.resolve(path.join(opts.viewDir, fallbacks.pop() as string))
							} else {
								foundTemplate = null;
							}
						} else {
							throw e
						}
					}
				} while (foundTemplate != null)

				if (foundTemplate === null) {
					throw new HttpError(404, 'Not Found')
				}

				const component = (await import(foundTemplate));

				if (!isComponent(component)) {
					throw new Error('Component is missing default export')
				}
				const props = (component?.getServerSideProps !== undefined) ? await component.getServerSideProps(req, res) : {};
				res.type('html')
				renderToPipeableStream(
					(component as Component).default(props)
				).pipe(res)
			} catch (e) {
				console.error(e)

				console.log(e)

				if (isHttpError(e)) {
					res.status(e.statusCode).send(e.message)
				} else {
					res.status(500).send('Internal Server Error')
				}
			}
		}

		next()
	}

	return middleware
}