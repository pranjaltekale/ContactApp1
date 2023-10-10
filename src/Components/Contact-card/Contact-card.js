import React from "react";

import './Contact-card.css';

function ContactCard({name,mobile,email,deleteContact,enableEditMode,index}){

    return(

        <div className="contact-card">

                        <p className="contact-name m">🎀{name}</p>

                        <p className="contact-mobile m">📞{mobile}</p>

                        <p className="contact-email m">✉ {email}</p>




                        <span className="delete-contact"

                         onClick={()=>{

                            deleteContact(mobile)

                         }

                        }

                        >🗑</span>

                        <span className="edit-contact"

                         onClick={()=>{

                         enableEditMode(index)

                         }

                        }

                        >🖋</span>







        </div>

    )




}

export default ContactCard