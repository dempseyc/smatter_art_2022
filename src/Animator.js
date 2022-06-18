import { useRef, useEffect, useState } from 'react'

import { trackAnim } from './DotMover'

import { useStoreState, useStoreActions } from 'easy-peasy';

const delayFrame = 50; // ms 

const useAnimationFrame = callback => {

    const requestRef = useRef();
    const previousTimeRef = useRef();
    
    const animate = time => {
        if (previousTimeRef.current === undefined) {
            previousTimeRef.current = time;
        } else { 
            let deltaTime = time - previousTimeRef.current; // about 16
            if (deltaTime >= delayFrame) {
                previousTimeRef.current = time; 
                callback(deltaTime);
            }
        }
        requestRef.current = requestAnimationFrame(animate);
    }
        
    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

}

export default function Animator (props) {
    const {effect} = props;
    console.log('Animator');    
    useAnimationFrame(deltaTime => {
        effect();
    })
}

