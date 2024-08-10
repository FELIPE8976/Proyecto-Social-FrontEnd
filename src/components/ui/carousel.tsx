"use client";

import * as React from "react";
import "@/styles/carousel.css"
import Image from 'next/image'
import img1 from "@/assets/img1.jpg"
import img2 from "@/assets/img2.jpg"
import img3 from "@/assets/img3.jpg"
import img4 from "@/assets/img4.jpg"
import { useEffect, useState } from "react";

function Carousel() {
    const [currdeg, setCurrdeg] = useState(0)
    const [isHover, setIsHovering] = useState(false)
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrdeg(currdeg => currdeg + 60); 
        }, 4000);  

        if(isHover) {
            clearInterval(interval)
        }

        return () => clearInterval(interval);
    }, [isHover]);

    return (
        <div className="container pt-8 pb-8">
            <div className="carousel" style={{
                transform: `rotateY(${currdeg}deg)`,
                WebkitTransform: `rotateY(${currdeg}deg)`,
                MozTransform: `rotateY(${currdeg}deg)`,
                OTransform: `rotateY(${currdeg}deg)`
            }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <div className="a">
                    <Image src={img1} alt="Imagen 1" className="item" style={{
                        transform: `rotateY(${-currdeg}deg)`,
                        WebkitTransform: `rotateY(${-currdeg}deg)`,
                        MozTransform: `rotateY(${-currdeg}deg)`,
                        OTransform: `rotateY(${-currdeg}deg)`, 
                        opacity: currdeg % 360 === 0 ? 1 : 1/2
                    }}/>
                </div>
                <div className="b">
                    <Image src={img2} alt="Imagen 2" className="item" style={{
                        transform: `rotateY(${-currdeg}deg)`,
                        WebkitTransform: `rotateY(${-currdeg}deg)`,
                        MozTransform: `rotateY(${-currdeg}deg)`,
                        OTransform: `rotateY(${-currdeg}deg)`,
                        opacity: currdeg % 360 === 300 ? 1 : 1/2
                    }} />
                </div>
                <div className="c">
                    <Image src={img3} alt="Imagen 3" className="item" style={{
                        transform: `rotateY(${-currdeg}deg)`,
                        WebkitTransform: `rotateY(${-currdeg}deg)`,
                        MozTransform: `rotateY(${-currdeg}deg)`,
                        OTransform: `rotateY(${-currdeg}deg)`,
                        opacity: currdeg % 360 === 240 ? 1 : 1/2
                    }} />
                </div>
                <div className="d">
                    <Image src={img4} alt="Imagen 4" className="item" style={{
                        transform: `rotateY(${-currdeg}deg)`,
                        WebkitTransform: `rotateY(${-currdeg}deg)`,
                        MozTransform: `rotateY(${-currdeg}deg)`,
                        OTransform: `rotateY(${-currdeg}deg)`,
                        opacity: currdeg % 360 === 180 ? 1 : 1/2
                    }} />
                </div>
                <div className="e">
                    <Image src={img1} alt="Imagen 1" className="item" style={{
                        transform: `rotateY(${-currdeg}deg)`,
                        WebkitTransform: `rotateY(${-currdeg}deg)`,
                        MozTransform: `rotateY(${-currdeg}deg)`,
                        OTransform: `rotateY(${-currdeg}deg)`,
                        opacity: currdeg % 360 === 120 ? 1 : 1/2
                    }} />
                </div>
                <div className="f">
                    <Image src={img2} alt="Imagen 2" className="item" style={{
                        transform: `rotateY(${-currdeg}deg)`,
                        WebkitTransform: `rotateY(${-currdeg}deg)`,
                        MozTransform: `rotateY(${-currdeg}deg)`,
                        OTransform: `rotateY(${-currdeg}deg)`,
                        opacity: currdeg % 360 === 60 ? 1 : 1/2
                    }} />
                </div>
            </div>
        </div>
    )
}

export { Carousel }