// Top Level Imports
import React, { useState } from "react"  

// Atoms & Molecules
import InputSearch from "../molecules/InputSearch"
import ContactThread from "../molecules/ContactThread"
import ContactThreads from "../organisms/ContactThreads"

// Utilities
import { debounce } from "../../utilities/Common"

// type definitions
import { ContactThreadType } from "../types"

// props type definition
interface IProps {
  contacts: ContactThreadType[];
  contactSelected: (contactId: string) => void;
  initiateSearch: (searchKey: string) => void;
}
// Component definition
const ContactsList = ({
  contacts,
  contactSelected,
  initiateSearch
}: IProps) => {
  // State definition
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const targetVal = (e.target as HTMLInputElement).value;
    setInputValue(targetVal);
    initiateSearch(targetVal);
    debounce(() => {
      initiateSearch(targetVal);
    }, 1000)
  }
  // JSX
  return (
    <div className="col-md-4 col-xl-3 col-sm-5 chat">
      <div className="card mb-sm-3 mb-md-0 contacts_card">
        {/** Search Element */}
        <InputSearch
          value={inputValue}
          onChange={handleInputChange}
        />

        {/** Contacts List */}
        <ContactThreads>
          
          {/** Contacts */}
          {
            contacts.map((contact: ContactThreadType) => {
              return (
                <ContactThread
                  key={contact._id}
                  name={contact.name}
                  online={contact.online}
                  avatarSrc={contact.avatar}
                  isSelected={contact.isSelected}
                  onClicked={() => contactSelected(contact._id)}
                />
              )    
            })
          }

          {!contacts.length && (
            <div className="text-center text-white">No Contacts Found</div>
          )}

        </ContactThreads>

        <div className="card-footer"></div>
      </div>
    </div>
  )
}

export default ContactsList;
