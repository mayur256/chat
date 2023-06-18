// Top Level Imports
import React, { useState } from "react"

// Atoms & Molecules
import InputSearch from "../molecules/InputSearch"
import ContactThread from "../molecules/ContactThread"
import ContactThreads from "../organisms/ContactThreads"

// Utilities
import { debounce } from "../../utilities/Common"
import { DEFAULT_AVATAR } from "../../utilities/Constants"

// type definitions
import { ContactThreadType, GroupType } from "../types"

// props type definition
interface IProps {
    chatItems: ContactThreadType[] | GroupType[];
    chatItemSelected: (itemId: string) => void;
    initiateSearch: (searchKey: string) => void;
    contactType: string;
    onContactTypeChange: (type: string) => void;
}
// Component definition
const ContactsList = ({
    chatItems,
    chatItemSelected,
    initiateSearch,
    contactType,
    onContactTypeChange
}: IProps) => {
    // State definition
    const [inputValue, setInputValue] = useState('');

    const contactTypes = ['people', 'group'];

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
        <div className="col-md-4 col-xl-3 col-sm-5">
            <div className="card mb-sm-3 mb-md-0 contacts_card">
                {/** Search Element */}
                <InputSearch
                    value={inputValue}
                    onChange={handleInputChange}
                />

                <ul className="nav nav-pills row m-0" id="myTab" role="tablist">
                    {contactTypes.map((type) => {
                        return (
                            <li
                                key={type}
                                className="nav-item col-md-6 p-0"
                                role="presentation"
                                onClick={() => onContactTypeChange(type)}
                            >
                                <button
                                    className={`nav-link btn-block text-capitalize${type === contactType ? ' active' : ''}`}
                                    id="home-tab"
                                    type="button"
                                >
                                    {type}    
                                </button>
                            </li>
                        )
                    })}
                </ul>

                {/** Contacts List */}
                <ContactThreads>
                    {/** Contacts */}
                    {
                        chatItems.map((contact: ContactThreadType | GroupType) => {
                            return (
                                <ContactThread
                                    key={contact._id}
                                    name={contact.name}
                                    online={contact?.online}
                                    avatarSrc={contact?.avatar ?? DEFAULT_AVATAR}
                                    isSelected={contact?.isSelected}
                                    onClicked={() => chatItemSelected(contact._id)}
                                />
                            )
                        })
                    }

                    {!chatItems.length && (
                        <div className="text-center text-white">No Contacts / Groups Found</div>
                    )}

                </ContactThreads>

                <div className="card-footer"></div>
            </div>
        </div>
    )
}

export default ContactsList;
