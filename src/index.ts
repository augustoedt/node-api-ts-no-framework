import ApiServer from "./server";

const PORT = process.env.PORT || 3000;
(new ApiServer()).Start(PORT);