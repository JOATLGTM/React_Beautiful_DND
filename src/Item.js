import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
    color: white;
    padding: 8px;
    margin-bottom: 8px;
    font-weight: bold;
    display: flex;
`

const Handle = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 4px;
    margin-right: 8px;
`

export default function Item(props) {
    //console.log(props)
    return (
        <Draggable draggableId={props.id} index={props.index}>
            {(provided) =>(
                <Container 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    //{ ? : onDoubleClick={() => console.log('teehee')}}
                >
                    <Handle>
                        <i className="fas fa-bars"></i>
                    </Handle>
                    {props.name}
                </Container>
            )}
        </Draggable>
    )
}
