// import initialized express instance
import serverInstance from "./server";

// Ports
const PORT = process.env.PORT || 4000;

// listen to server on port
serverInstance.listen(PORT, (): void => {
  console.log(`Server listening on port ${PORT}`);
});