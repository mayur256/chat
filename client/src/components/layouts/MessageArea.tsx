// Top level imports
import { ReactElement } from "react"

// Atoms & Molecules
import Header from "../organisms/Header"
import Body from "../organisms/Body"
import Footer from "../organisms/Footer"

// Component definition
const MessageArea = (): ReactElement => {
  return (
    <div className="col-md-8 col-xl-6 chat">
      <div className="card">
        
        {/** Message Header */}
        <Header/>

        {/** Message Body */}
        <Body/>

        {/** Message Footer */}
        <Footer/>

      </div>
    </div>
  )
}

export default MessageArea