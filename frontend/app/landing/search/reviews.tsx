import UseState from 'react';
import React from 'react';
//import { Lezioni } from '../../../../DB/lezioni';
export {Reviews};
import { Review } from '@/app/areaPersonale/createReview/models/review';

function random(min : number, max : number){
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function Reviews(){

  const recensioni : React.JSX.Element[] = []

  /*autore : String
    rID : number
    professore : String
    corso : String
    data_esame : Date
    data = new Date()
    valutazione_prof = new Star()
    valutazione_fattibile = new Star()
    valutazione_materiale = new Star()
    testo : String | undefined
    voto : number |undefined
    frequenza : number
    anonima : boolean
    tentativo : number | undefined*/

  /*let n = random(10, 30)
  for(var i=0; i <n; i++){
    var anonima = random(0, 2)==1
    var voto = random(0,2)==1
    var r = random(0, Lezioni.lezioni.length)
    var l = Lezioni.lezioni[r]
    if (l!=undefined) recensioni.push(new Review({
      "Lorem Ipsum",
      i,
      l.professore.toString(),
      l.corso.toString(),
      new Date(random(0, 10000000000)),
      random(0,6),
      random(0,6),
      random(0,6),
      random(0,5),
      anonima,
      (voto? random(18, 32) : undefined),
      (voto? random(0,6) : undefined),
      "Lorem Ipsum"  
    }).returnCollapse())
  }*/
  return (
    <div>
      {recensioni}
    </div>
  )
}
  
  /* new Review('Mike Hawk', 1, 'Di Francescomarino', 'Corso inutile', 
                          new Date('10/10/24'), 0, 5, 3, 2, false, undefined, undefined, 
                          "La professoressa è stupida come una capra, non fate questo corso")
  let list = [recensione.returnCollapse(),
    new Review('Jack Offmen', 1, 'Bouquet', 'Corso altrettanto inutile', 
    new Date('1.1.2020'), 2, 5, 2, 3, true, 28, 2, 
    "Il professore ha mentito sul CV").returnCollapse()]
  list.push(new Review('Jack Offmen', 1, 'Bouquet', 'Corso altrettanto inutile', 
  new Date('2.1.2020'), 2, 5, 2, 3, true, 28, 2, ).returnCollapse())
    return(
      list
    );*/