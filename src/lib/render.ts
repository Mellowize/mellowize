import express from "express";
import { renderToPipeableStream } from "react-dom/server";
import { HttpError, isHttpError } from "./http-error";
import { stat } from "fs/promises";
import path from 'path';
import { Page, isPage } from "./page";

// add render function to res type
declare global {
	namespace Express {
		interface Response {
			jsx: (template: string, fallbacks?: [string]) => Promise<void>
		}
	}
}

export type JSXRendererOptions = {
	viewDir: string
}

export const jsxRenderer = (opts: JSXRendererOptions) => {
	const middleware: express.RequestHandler = (req, res, next) => {
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

				const page: unknown = (await import(foundTemplate))?.default;
				if (!isPage(page)) {
					throw new HttpError(500, 'Internal Server Error. Page is not a valid page')
				}

				const props = (page?.getServerSideProps !== undefined) ? await page.getServerSideProps(req, res) : {};
				res.type('html')
				renderToPipeableStream(
					page.render(props)
				).pipe(res)
			} catch (e) {
				console.error(e)
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