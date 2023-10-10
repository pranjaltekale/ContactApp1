import React ,{useEffect, useState}from "react";
import './Home.css'
import ContactCard from "../../Components/Contact-card/Contact-card";
import showToast from 'crunchy-toast';

function Home (){
    const [contacts,setContacts] = useState([
        {
            name:'Pranjal',
            mobile:'1122334455',
            email:'pranjal@gmail.com'
        },
        {
            name:'Prajakta',
            mobile:'6677889955',
            email:'prajkta@gmail.com'
        }
    ]);
    const [name,setName]=useState('');
    const [mobile,setMobile]=useState('');
    const[ email,setEmail]=useState('');
    const[editIndex,setEditIndex]=useState(-1);
    const [isEditMode,setIsEditMode]=useState(false);

    const addContact = ()=>{


      if(!name){
        showToast('Name is required','alert',3000);
        return;
      }
      if(!email){
        showToast('Email is required','alert',3000);
        return;
      }
      if(!mobile){
        showToast('Mobile is required','alert',3000);
        return;
      }
      const obj ={
        name:name,
        mobile:mobile,
        email:email
      }
      const newContacts=[...contacts,obj];
      setContacts(newContacts);
      saveToLocalStorage(newContacts);
      showToast('Contact Added Succesfully !','success',3000);

      setName('');
      setMobile('');
      setEmail('');
      
    };

    const deleteContact=(mobileNumber)=>{
      let indexToDelete = -1;

      contacts.forEach((contactDetail,index)=>{
        if(contactDetail.mobile===mobileNumber){
          indexToDelete = index;

        }
      })

      contacts.splice(indexToDelete,1);
      saveToLocalStorage(contacts);

      setContacts([...contacts]);
      showToast('Contact deleted Succesfully','success',3000);
    }

    const saveToLocalStorage =(contactsData)=>{
      localStorage.setItem('contacts',JSON.stringify(contactsData));

    }
    const loadFromLocalStrorage= ()=>{
      const contactsData =JSON.parse(localStorage.getItem('contacts'));
      if(contactsData){
        setContacts(contactsData);
      }
    }
    useEffect(()=>{
      loadFromLocalStrorage();
    },[] )

    
    const enableEditMode = (index)=>{
      const contactsData = contacts[index];

      setName(contactsData.name);
      setMobile(contactsData.mobile);
      setEmail(contactsData.email);
      setEditIndex(index);
      setIsEditMode(true);

    }
    const editContact = ()=>{
      const obj = {
        name : name,
        mobile : mobile,
        email : email
      }
      contacts[editIndex]=obj;
      setContacts([...contacts]);
      saveToLocalStorage(contacts);
      showToast('Contact Edited Successfully !','success',3000);
    setName('');
    setEmail('');
    setMobile('');

    setIsEditMode(false);

    }
    useEffect(()=>{
      loadFromLocalStrorage();
    },[] )

    return(
        <div >
            <h1 className="app-title">Contact App 📞</h1>
            <div className="app-body">
                <div className="contact-container">
                  <h2 className="sub-heading">Show Contact</h2>
                  {
                    contacts.map((contact,index)=>{
            
                    return(
                    <ContactCard  key={index}
                    name={contact.name}
                    mobile={contact.mobile}
                    email={contact.email}
                    deleteContact={deleteContact}
                    enableEditMode={enableEditMode}
                    index={index}
                    />
                     )
                    })

                  }
                </div>
                <div className="add-contact">
                  <h2 className="sub-heading">{ isEditMode ? 'Edit Contact':'Add Contact'}</h2>
                  <form>
                    
                    <input type="text" 
                    placeholder="Name"
                     className="user-input"
                     onChange={(e)=>{
                        setName(e.target.value)
                     }}
                     value={name}/>

                    <input type="text" 
                    placeholder="Mobile"
                    className="user-input"
                    onChange={(e)=>{
                        setMobile(e.target.value)
                     }}
                     value={mobile}/>
                     
                    <input type="email" 
                    placeholder="Email" 
                    className="user-input"
                    onChange={(e)=>{
                        setEmail(e.target.value)
                     }}
                     value={email}/>

                    <button type="button"
                    className="btn-add" onClick={ ()=>
                    {
                      isEditMode ? editContact() : addContact()
                    }}>
                      {isEditMode ? 'Edit Contact' : 'Add Contact'}
                      </button>
                  </form>
                </div>
            </div>
       </div>
    )
}
export default Home