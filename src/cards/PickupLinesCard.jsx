import React from 'react'
import { useState,useEffect } from 'react';

function PickupLinesCard() {
    const [pickupLine, setPickupLine] = useState("");

    const pickupLines = [`"Are you a magician? Because whenever I look at you, everyone else disappears."`,
    `"You’re like my favorite playlist — can’t stop replaying you in my head."`,
    `"You got games on your phone? …Or just space for me?"`,
    `“If you were a TikTok sound, I’d use you in every edit.”`,
    `“Are you Netflix? Because I’ve been watching you for hours and I’m still not bored.”`,
    `“You’re my favorite notification.”`,
    `"Every time you text me, my serotonin gets a power-up.”`,
    `“If hugs were an app, you’d be my premium subscription.”`,
    `“You’re so fine, I forgot my pickup line.”`,
    `“You a filter? ‘Cause you make everything look better.”`,
    `“Are you a limited edition drop? ‘Cause I’m tryna cop before you sell out.”`,
    `“If you were a Snap streak, I’d never let it die.”`,
    `"Wanna make memories with me? I promise I won’t blink when the shutter clicks`,
  ]
  
    useEffect(() => {
      const randomIndex = Math.floor(Math.random() * pickupLines.length);
      setPickupLine(pickupLines[randomIndex]);
    },[]);
  return (
    <div className="bg-primary font-mclaren text-tertiary">
        {pickupLine}
    </div>
  )
}

export default PickupLinesCard