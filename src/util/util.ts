const DEFAULT_HEADER: headerType = { "content-type": "application/json" };

export { DEFAULT_HEADER };

//**** Types ****//

type headerType = { [key: string | symbol]: string };
