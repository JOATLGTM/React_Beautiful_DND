import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
    color: ${props => props.isLocked ? 'gray' : 'white'};
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
    // console.log(`props`, props)
    const isLocked = props.lockedArray.some(lockedItem => lockedItem === props.id)
    return (
        <Draggable draggableId={props.id} index={props.index} isDragDisabled={isLocked}>
            {(provided) =>(
                <Container
                    isLocked={isLocked}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    index={props.index}
                    onDoubleClick={() => props.handleDblClk(props.id)}
                >
                    <Handle>
                        <i className={isLocked ? "fa fa-lock" : "fas fa-bars"}></i>
                    </Handle>
                    {props.name}
                </Container>
            )}
        </Draggable>
    )
}
