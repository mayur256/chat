// import { setupWorker } from "msw";
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// worker to mock APIs in browser
// export const worker = setupWorker(...handlers);

// mock server to intercept API calls in test env
export const server = setupServer(...handlers);
