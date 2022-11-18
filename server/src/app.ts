// import initialized express instance
import serverInstance from "./server";
import { PORT } from "./config/keys";

// Ports
const APP_PORT = PORT || 4001;

// listen to server on port
serverInstance.listen(APP_PORT, (): void => {
  console.log(`Server listening on port ${APP_PORT}`);
});