const DEFAULT_HEADER: headerType = { "Content-Type": "application/json" };

export { DEFAULT_HEADER };

//**** Types ****//

type headerType = { [key: string | symbol]: string };
