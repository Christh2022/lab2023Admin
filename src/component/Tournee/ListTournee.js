import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {HiOutlineDotsHorizontal} from 'react-icons/hi'
import {MdDelete} from 'react-icons/md'
import {BiPencil} from 'react-icons/bi'
import { auth, database } from '../../firebase';
import './listTournee.css'
import { onAuthStateChanged } from 'firebase/auth';

const ListTournee = () => {
    const tourneRef = collection(database, "Tournee_Date");
    const [list, setList] = useState([]);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [place, setPlace] = useState("")
    const [changeDetail, setChangeDetail] = useState(false)
    const [valueId, setValueId] = useState("")
    const [status, setStatus] = useState(0)
    let index = 0;

    const handlePublishTourne = async(e)=>{
        e.preventDefault()
        console.log('hello')
        if(status === 0){
            alert("vous ne pouvez pas ajouter des éléments ici")
        } else {
            if(date && place && city && country){
                try{
                    await addDoc(tourneRef, {
                        date: date,
                        heure: time,
                        ville: city,
                        pays: country,
                        lieu: place,
                    })
                    alert("success");
                    console.log("success");
                } catch (error){
                    console.log(error)
                }
            } else {
                alert("veuillez remplir tous les champs")
            }
        }
        setDate("")
        setTime("")
        setPlace("")
        setCity("")
        setCountry("")
        //console.log(date, place, city, country);
    }

    const TourneQuery = query(
        tourneRef,
        orderBy("date", "desc")
    )
    useEffect(()=>{
        onSnapshot(TourneQuery, (snapshot)=>{
            let tab = []
            snapshot.docs.forEach((doc)=>{
                tab.push({...doc.data(), id : (doc.id)})
            })
            
            setList(tab);
        })

        onAuthStateChanged(auth, (user) => {
            if (user) {
              const userId = user.uid;
              const usersRef = doc (database, "admin", userId);
              getDoc(usersRef).then((doc) => {
                if (doc.exists()) {
                  const userStatus = doc.data().statut;
                  setStatus(userStatus)
                } else {
                  console.log("L'utilisateur connecté n'existe pas dans la collection 'mesUtilisateurs'.");
                  console.log(doc.exists());
                }
              }).catch((error) => {
                console.log("Erreur lors de la récupération du statut de l'utilisateur connecté : ", error);
              });
            }
        });
    });

    const editData = (id, date, time, place, city, country)=>{
        if(window.confirm("voulez-vous vraiment modifier cette date de tournée")){
            if(status === 0){
                alert("vous ne pouvez pas modifier des éléments ici")
            } else {
                setChangeDetail(!changeDetail)
                setValueId(id)
                setDate(date)
                setTime(time)
                setPlace(place)
                setCity(city)
                setCountry(country)
            }
        }
    }

    const deleteData = async(id) =>{
        if(window.confirm("voulez-vous vraiment supprimer cette date de tournée")){
            if(status === 0){
                alert("vous ne pouvez pas supprimer des éléments ici")
            } else {
                try {
                    await deleteDoc(doc(database, "Tournee_Date", id));
                } catch (error) {
                    console.log(error);
                }
            }
        } else {
            alert("Suppression annulé");
        }
    }

    const handleSave = async (id)=>{
        if(window.confirm("voulez-vous vraiment modifer cette date de tournée")){
            if(status === 0){
                alert("vous ne pouvez pas modifier des éléments ici")
            } else {
                try {
                    await updateDoc(doc(database, "Tournee_Date", id), {
                        date: date,
                        heure: time,
                        ville: city,
                        pays: country,
                        lieu: place,
                    })
                    setChangeDetail(!changeDetail)
                    alert("success");
                } catch (error) {
                    console.log(error);
                }
            }
        } else {
            alert("modification n'ont pas pu etre éffectuer")
        }

        setDate("")
        setTime("")
        setPlace("")
        setCity("")
        setCountry("")
        
    }

    const handleCanceled = ()=>{
        setChangeDetail(!changeDetail)
        setDate("")
        setTime("")
        setPlace("")
        setCity("")
        setCountry("")
    }

    return (
        <div className='row row-tournee' style={{marginTop: '2rem'}}>
            <div className='col-12 col-lg-8  row-list'>
                <div className='card list-card' style={{width: '100%'}}>
                    <div className='card-body'>
                        <div className='cardheader'>
                            <div>Liste des tournées</div>
                            <div><HiOutlineDotsHorizontal/></div>
                        </div>
                        <table className='listTournee' style={{width: '100%'}}>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Heure</th>
                                    <th>lieu</th>
                                    <th>ville</th>
                                    <th>pays</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((value) =>
                                <span key={value.id}>
                                    <tr style={{ backgroundColor: index++ % 2 === 0 ? '#F2F3F4 ' : '#BFC9CA' }}>
                                        <td style={{display: 'flex', flexDirection: 'row-reverse'}}> {value.date}</td>
                                        <td> {value.heure}</td>
                                        <td>{value.lieu}</td>
                                        <td>{value.ville}</td>
                                        <td>{value.pays}</td>
                                    </tr>
                                    <span style={{display: 'flex', flexDirection: 'row-reverse', gap: '1rem'}}>
                                        <span onClick={()=>deleteData(value.id)} style={{cursor: 'pointer'}}><MdDelete/></span>
                                        <span onClick={()=>editData(value.id, value.date, value.heure, value.lieu, value.ville, value.pays)} style={{cursor: 'pointer'}}><BiPencil/></span>
                                    </span>
                                </span>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="row row-col-1 row-col-md-3 row-col-xl-3 tourneeNumber">
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', gap: '0.5rem'}}>
                            <span>Nombres de Tournee : </span>
                            <span>{list.length}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-12 col-lg-4 row-form'>
                <div className=' card list-card'>
                    <div className='card-body'style={{marginTop: '2rem'}}>
                        <form 
                            onSubmit={changeDetail?
                                (e)=>{
                                    e.preventDefault()
                                    handleSave(valueId)
                                }
                                :
                                handlePublishTourne}>

                            <input type='text' placeholder='Date' value={date} onChange={(e)=>setDate(e.target.value)}/>
                            <input type='text' placeholder='Heure' value={time} onChange={(e)=>setTime(e.target.value)}/>
                            <input type="text" placeholder='Ville' value={city} onChange={(e)=>setCity(e.target.value)}/>
                            <input type="text" placeholder='Pays' value={country} onChange={(e)=>setCountry(e.target.value)}/>
                            <input type="text" placeholder='Lieu' value={place} onChange={(e)=>setPlace(e.target.value)}/>

                            <button type='submit' style={{cursor: 'pointer'}}>{changeDetail? "enregistre" : "publier"}</button>
                            {changeDetail? <button onClick={handleCanceled} style={{cursor: 'pointer'}}>Annuler</button> : ""}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListTournee;