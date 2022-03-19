// import initialized express instance
import expressInstance from "./expressInstance";

// Ports
const PORT = process.env.PORT || 4000;

// listen to server on port
expressInstance.listen(PORT, (): void => {
  console.log(`Server listening on port ${PORT}`);
});