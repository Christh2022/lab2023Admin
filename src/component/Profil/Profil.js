import { onAuthStateChanged } from 'firebase/auth';
import { collection, /*deleteDoc, doc, getDocs,*/ onSnapshot, /*orderBy,*/ query,/* updateDoc, where */} from 'firebase/firestore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../authoContext/AuthContext';
import { auth, database } from '../../firebase';


const Profil = () => {
    const [email, setEmail] =useState("")
    const [name, setName] = useState("")
    const admin = collection(database, 'admin')
    const navigate = useNavigate()

    //Récupérer les données
    /*getDocs(admin)
        .then((snapshot)=>{
            let admin = []
            snapshot.docs.forEach((doc)=>{
                admin.push({...doc.data(), id : (doc.id)})
            })
            console.log(admin[0]);
        })
        .catch((err)=>{
            console.log(err);
        })
    */
    //mettre à jour les données
    /*onSnapshot(admin, (snapshot)=>{
        let admin = []
            snapshot.docs.forEach((doc)=>{
                admin.push({...doc.data(), id : (doc.id)})
            })
            console.log(admin[0]);
    })*/


    //supprimer les données
   /*const deleteData = (id) =>{
        const docRef = doc(database, "admin", id)
        deleteDoc(docRef)
            .then((data)=>{
                console.log(data);
            })
    }*/

    //Modifier un document
    /*const edit = (id)=>{
        const docRef = doc(database, "admin", id)
        updateDoc(docRef, {
            name : name,
            email : email
        })
        .then(()=>{
            setEmail('')
            setName('')
        })
    }*/
   
    const {logout} = UserAuth()
    

    onAuthStateChanged(auth, (user)=>{
        if(user){
            setEmail(user.email)
            setName(user.displayName)
            //console.log(user);
            
        } else {
            console.log('error');
        }
    })
    


    //faire des requetes
    /*const Query = query(
            admin,
            where("email", "==", `test3@gmail.com`)
        )
    //mettre à jour les données
    onSnapshot(Query, (snapshot)=>{
        let admin = []
            snapshot.docs.forEach((doc)=>{
                admin.push({...doc.data(), id : (doc.id)})
            })
            console.log(admin);
    })*/
    const [list, setList] = useState(null)
    const Query = query(admin)
    let admins = []
    onSnapshot(Query, (snapshot)=>{
        
        admins  =  snapshot.docs.map((a)=>a.data())
        let adminis = ""
        admins.forEach((a)=>{
            adminis +=`
            
            <a>${a.email}</a>
            
            `
            //console.log(admin);
        })
        //console.log(admins);
        
        setList(adminis)
    })

    const clickLogout = async ()=>{
        try{
            await logout()
            navigate('/authentification')
        } catch(error){
            console.log(error)
        }
    }
    return (
        <div>
            <form>
                <input
                    type="text"
                    id="name"
                    
                />
                <input
                    type="email"
                    id="email"
                    disabled  
                />
                
                <div>
                    <p>Voulez vous changer votre nom ? </p>
                    <span >
                       {email}
                    </span>
                    <span>
                        {name}
                    </span>
                    <span  >{list}</span>
                    <p onClick={()=>clickLogout()}>
                        Deconnexion
                    </p>
                </div>
            </form>
            {}
        </div>
    );
};

export default Profil;