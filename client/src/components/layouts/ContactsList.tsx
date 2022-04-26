// Top Level Imports
import { useState } from "react"  

// Atoms & Molecules
import InputSearch from "../molecules/InputSearch"
import ContactThread from "../molecules/ContactThread"
import ContactThreads from "../organisms/ContactThreads"

// type definitions
import { ContactThreadType } from "../types"

// props type definition
interface IProps {
  contacts: ContactThreadType[];
  contactSelected: (contactId: string)=> void
}
// Component definition
const ContactsList = ({
  contacts,
  contactSelected
}: IProps) => {
  // State definition
  const [inputValue, setInputValue] = useState('');

  // JSX
  return (
    <div className="col-md-4 col-xl-3 chat">
      <div className="card mb-sm-3 mb-md-0 contacts_card">
        {/** Search Element */}
        <InputSearch
          value={inputValue}
          onChange={(e) => {
            const targetVal = (e.target as HTMLInputElement).value;
            setInputValue(targetVal);
          }}
        />

        {/** Contacts List */}
        <ContactThreads>
          
          {/** Contacts */}
          {
            contacts.map((contact: ContactThreadType) => {
              return (
                <ContactThread
                  key={contact.id}
                  name={contact.name}
                  online={contact.online}
                  avatarSrc={contact.avatarSrc}
                  isSelected={contact.isSelected}
                  onClicked={() => contactSelected(contact.id)}
                />
              )    
            })
          }

        </ContactThreads>

        <div className="card-footer"></div>
      </div>
    </div>
  )
}

export default ContactsList;
