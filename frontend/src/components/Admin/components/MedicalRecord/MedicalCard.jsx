import React from 'react'
import './styles.css'
import { IoMdArrowRoundForward } from 'react-icons/io'

function MedicalCard(props) {
  return (props.trigger) ? (
    <div className='popup'>
        <div className='popup-inner'>
            <div className="close-btn">
                <IoMdArrowRoundForward onClick={() => props.setTrigger(false)} />
            </div>
            {props.children}
        </div>
    </div>
  ) : "";
}

export default MedicalCard