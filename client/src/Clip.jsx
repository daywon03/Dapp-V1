import React, { useState } from 'react';
import Mask from './assets/Tmax-Mask.mp4';

//Permet l'activation de la video et la joue en boucle
    const Clip = () => {
        return (
          <video
            playsInline
            autoPlay
            loop
          >
            <source src={Mask} />
          </video>
        );
      };
      
export default Clip;