import type { FC } from "react";
import type { Request, Response } from "express";

type PageArguments<T> = {
	getServerSideProps?: (req: Request, res: Response) => Promise<T> | T;
	render: FC<T>;
};

export const page = <T>(opts: PageArguments<T>) => opts
export type Page<T> = ReturnType<typeof page<T>>

export function isPage<T = unknown>(obj: any): obj is Page<T> {
	return typeof obj.render === 'function'
}
