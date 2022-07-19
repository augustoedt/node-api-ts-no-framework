import ApiServer from "./server";

const PORT = process.env.PORT || 3000;
const server = new ApiServer().Start(PORT);