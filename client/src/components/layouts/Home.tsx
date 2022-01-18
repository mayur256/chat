// top level imports
import { ReactElement } from "react";

// atoms / molecules components
import ContactsList from "./ContactsList";
import MessageArea from "./MessageArea";

const Home = (): ReactElement => {
  return (
    <>
      {/** Contacts List */}
      <ContactsList />

      {/** Chat Message Area */}
      <MessageArea />
    </>
  )
}

export default Home;