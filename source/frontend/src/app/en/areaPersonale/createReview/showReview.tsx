export {Reviews};
import React, { useState, useEffect } from 'react';
import { getReviews } from '@/app/en/connect/recensione';
import { Review } from '@/app/en/areaPersonale/createReview/models/review';
import { UtenteAutenticato } from '../users/utenteAutenticato';
import { jwtDecode } from 'jwt-decode';


function Reviews(){

  
  const [localRev, setRev] = useState<Review[]>([])

  const [reviews, setReviews] = useState<React.JSX.Element[]>()
  function getCol(l:Review[]){
    const res : React.JSX.Element[]=[]
    l.forEach((e)=>{
      res.push(e.returnCollapse())
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
          window.alert("Session expired, login again")
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

