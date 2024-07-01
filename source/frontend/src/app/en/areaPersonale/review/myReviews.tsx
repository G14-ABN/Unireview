import React from 'react';
import { Reviews } from './showReview';
import { PopUp } from './reviewPopUp';
import { GetModal } from './modifica';
export {List};

function List(){
    const modal = GetModal()
    return (
    <div>
        {modal.mod}
        {Reviews(modal.setRev, modal.setOp, modal.setVal)}
    </div>
);
}