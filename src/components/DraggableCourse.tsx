import React from 'react'
import { useDrag } from 'react-dnd';
export interface draggableCourse{
    id: string
}

const DraggableCourse = ({ id}:draggableCourse) => {

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

export default DraggableCourse
