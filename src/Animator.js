import { useRef, useEffect } from 'react'

const delayFrame = 20; // ms 

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
    useAnimationFrame(deltaTime => {
        effect();
    })
}

