// Top Level Imports
import { useEffect, useState } from "react"  

// Atoms & Molecules
import InputSearch from "../molecules/InputSearch"
import ContactThread from "../molecules/ContactThread"
import ContactThreads from "../organisms/ContactThreads"

// An Array of contact thread objects
type ContactThreadType = {
  id: number,
  name: string,
  avatarSrc: string,
  online: boolean,
  isSelected: boolean
}

const contactThreads: Array<ContactThreadType> = [
  {
    id: 1,
    name: 'Mayur',
    avatarSrc: 'https://yt3.ggpht.com/yti/APfAmoGRnfYXWAS9tYgU7u0un-rDKE4WAXW4pHWefyJfSA=s88-c-k-c0x00ffffff-no-rj-mo',
    online: true,
    isSelected: true
  },
  {
    id: 2,
    name: 'Gitanjali',
    avatarSrc: 'https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg',
    online: false,
    isSelected: false
  }
]

// Component definition
const ContactsList = () => {
  // State definition
  const [inputValue, setInputValue] = useState('')
  const [contacts, setContacts] = useState([] as ContactThreadType[])
  
  // initialize contacts state in useEffect
  useEffect((): void => {
    setContacts(contactThreads)
  },[])

  // toggle selected contact thread
  const setThisSelected = (id: number): void => {
    const filteredContacts = contactThreads.map(contact => {
      if (contact.id === id) return { ...contact, isSelected: true }
      else return {...contact, isSelected: false}
    })

    setContacts(filteredContacts)
  }

  // JSX
  return (
    <div className="col-md-4 col-xl-3 chat">
      <div className="card mb-sm-3 mb-md-0 contacts_card">
        {/** Search Element */}
        <InputSearch
          value={inputValue}
          onChange={(e) => {
            const targetVal = (e.target as HTMLInputElement).value
            setInputValue(targetVal)
          }}
        />

        {/** Contacts List */}
        <ContactThreads>
          
          {/** Contacts */}
          {
            contacts.map(contact => {
              return (
                <ContactThread
                  key={contact.id}
                  name={contact.name}
                  online={contact.online}
                  avatarSrc={contact.avatarSrc}
                  isSelected={contact.isSelected}
                  onClicked={() => setThisSelected(contact.id)}
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

export default ContactsList