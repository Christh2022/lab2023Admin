import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { database } from '../../firebase';

const Tournee = () => {
    const tourneRef = collection(database, "Tournee_Date")
    const [date, setDate] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [place, setPlace] = useState("")
    const [list, setList] = useState([]);
    const [changeDetail, setChangeDetail] = useState(false)
    const [valueId, setValueId] = useState("")

    const handlePublishTourne = async(e)=>{
        e.preventDefault()
        console.log('hello')
        try{
            await addDoc(tourneRef, {
                date: date,
                ville: city,
                pays: country,
                lieu: place,
            })
            alert("success");
            console.log("success");
        } catch (error){
            console.log(error)
        }
        setDate("")
        setPlace("")
        setCity("")
        setCountry("")
        console.log(date, place, city, country);
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
    });

    //console.log(list);

    const deleteData = async(id) =>{
        try {
            await deleteDoc(doc(database, "Tournee_Date", id))
            window.confirm("voulez-vous vraiment supprimer cette date de tournée")
        } catch (error) {
            console.log(error);
        }
    }

    const handleSave = async (id)=>{
        console.log(id);
        if(window.confirm("voulez-vous vraiment modifer cette date de tournée")){
            try {
                await updateDoc(doc(database, "Tournee_Date", id), {
                    date: date,
                    ville: city,
                    pays: country,
                    lieu: place,
                })
                setChangeDetail(!changeDetail)
                alert("success");
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("modification n'ont pas pu etre éffectuer")
        }
        
    }


    

    const editData = (id, date, place, city, country)=>{
        setChangeDetail(!changeDetail)
        setValueId(id)
        setDate(date)
        setPlace(place)
        setCity(city)
        setCountry(country)
    }

    const handleCanceled = ()=>{
        setChangeDetail(!changeDetail)
        setDate("")
        setPlace("")
        setCity("")
        setCountry("")
    }





    return (
        <div style={{paddingTop: '3rem'}}>
            <form 
                onSubmit={changeDetail?
                    (e)=>{
                        e.preventDefault()
                        handleSave(valueId)
                    }
                    :
                    handlePublishTourne}>

                <input type='date' placeholder={changeDetail? date : 'date'} onChange={(e)=>setDate(e.target.value)}/>
                <input type="text" placeholder={changeDetail? city : 'city'} onChange={(e)=>setCity(e.target.value)}/>
                <input type="text" placeholder={changeDetail? country : 'country'} onChange={(e)=>setCountry(e.target.value)}/>
                <input type="text" placeholder={changeDetail? place : 'Lieu'} onChange={(e)=>setPlace(e.target.value)}/>

                <button type='submit'>{changeDetail? "enregistre" : "publier"}</button>
                {changeDetail? <button onClick={handleCanceled}>Annuler</button> : ""}
            </form>


            <ul style={{paddingTop: '6rem', display: 'block', height: '5rem'}}>
                <li>
                    {list.map((value) =>
                        <li key={value.id}>
                            <div>
                                <div>
                                    <span> {value.date}</span> 
                                    <span>{value.lieu}</span>
                                    <span>{value.ville}</span>
                                    <span>{value.pays}</span>
                                </div>
                            </div>
                            <span onClick={()=>deleteData(value.id)} style={{cursor: 'pointer'}}>X</span>
                            <span onClick={()=>editData(value.id, value.date, value.lieu, value.ville, value.pays)} style={{cursor: 'pointer'}}>modifier</span>
                        </li>
                    )}
                </li>
            </ul>
        </div>



    );
};

export default Tournee;