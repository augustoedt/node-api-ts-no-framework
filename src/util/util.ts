const DEFAULT_HEADER: headerType = { "Content-Type": "application/json" };

export { DEFAULT_HEADER };

type headerType = { [key: string | symbol]: string };
