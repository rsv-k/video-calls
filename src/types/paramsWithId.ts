// eslint-disable-next-line @typescript-eslint/ban-types
export type TParamsWithId<T = {}> = {
	id: string;
} & T;
