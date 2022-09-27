const Shape = (props) => {
    const {style,color,color2,size,xPos,yPos,rot, className} = props;
    const styleMap = {
        0:<><circle fill={color} cx={`${xPos}`} cy={`${yPos}`} r={`${size}`}/></>,
        1: <><circle fill={color} cx={`${xPos-size}`} cy={`${yPos}`} r={`${size}`}/>
        <circle fill={color} cx={`${Number(xPos)+Number(size)}`} cy={`${yPos}`} r={`${size}`}/></>,
        2:<><circle fill={color2} cx={`${xPos-size*1.5}`} cy={`${yPos}`} r={`${size*0.5}`}/>
        <circle fill={color} cx={`${xPos}`} cy={`${yPos}`} r={`${size}`}/>
        <circle fill={color2} cx={`${Number(xPos)+size*1.5}`} cy={`${yPos}`} r={`${size*0.5}`}/>
        </>,
        3:<><circle fill={color} cx={`${xPos}`} cy={`${yPos}`} r={`${size}`}/>
        <circle fill={color2} cx={`${Number(xPos)}`} cy={`${yPos}`} r={`${size*0.5}`}/>
        </>
    }

    return (
        <g className={`${className}`} transform={`rotate(${rot},${xPos},${yPos})`}>
            {styleMap[style]}
        </g>
    )
}

export default Shape