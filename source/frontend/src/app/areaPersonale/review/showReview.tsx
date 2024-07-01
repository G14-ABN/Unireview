export {Reviews};
import React, { useState, useEffect } from 'react';
import { getReviews } from '../../connect/recensione';
import { Review, returnCollapse } from '../../landing/models/review';
import { UtenteAutenticato } from '../users/utenteAutenticato';
import { jwtDecode } from 'jwt-decode';


function Reviews(setReview :React.Dispatch<React.SetStateAction<{
  data: string;
  professore: string;
  esame: string;
  valutazioneProfessore: number;
  valutazioneFattibilita: number;
  valutazioneMateriale: number;
  testo: string;
  tentativo: number;
  voto: number;
  frequenza: string;
  anonima: boolean;
}>>, setOpen :React.Dispatch<React.SetStateAction<boolean>>,
setVoto :React.Dispatch<React.SetStateAction<boolean>>){

  
  const [localRev, setRev] = useState<Review[]>([])

  const [reviews, setReviews] = useState<React.JSX.Element[]>()
  function getCol(l:Review[]){
    const res : React.JSX.Element[]=[]
    l.forEach((e)=>{
      res.push(returnCollapse(e, setReview, setOpen, setVoto))
    })
    return res
  }
  
  useEffect(() => {
    (async () => {
      try {
        // await async "fetchBooks()" function
        const token =new URLSearchParams(window.location.search).get('token')
        if (token){
          const dec : {email:string, nomeUtente : string} = jwtDecode(token)
          const res =await getReviews('', '', dec.email)
          setRev(res)
          setReviews(getCol(res))
        }else{
          window.alert("Sessione scaduta, effettuare login")
        }
      } catch (err) {
        console.log('Error occured when fetching');
      }
    })();
  }, []); 
  return(
    <div>
        {reviews}
    </div>
  )
}

