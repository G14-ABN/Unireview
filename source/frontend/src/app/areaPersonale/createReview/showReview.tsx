import React from 'react';
export {Reviews};
import { Review } from './models/review';



function Reviews(){

  var recensione = new Review('Mike Hawk', 1, 'Di Francescomarino', 'Corso inutile', 
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
    );
}

