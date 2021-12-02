// import React, { useState } from 'react'
import { useDrag } from 'react-dnd';
export interface poolOfCourse{
    id:string
}

const PoolOfCourse = ({id }:poolOfCourse) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "string",
        item: {id: id},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      }));
      
    return (
        <p ref = {drag}>
            {id}
            {isDragging}
        </p>
        
    )
    
}

export default PoolOfCourse
