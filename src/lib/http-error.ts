export class HttpError extends Error {
	constructor(public readonly statusCode: number, message: string) {
		super(message);
	}
}

export function isHttpError(obj: any): obj is HttpError {
	return obj.statusCode !== undefined;
}
