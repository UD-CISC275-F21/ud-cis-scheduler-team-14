import React from 'react'
import { useDrag } from 'react-dnd';
export interface poolOfCourse{
    id: string
}

const PoolOfCourse = ({ id}:poolOfCourse) => {

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
        </p>
    )
}

export default PoolOfCourse
