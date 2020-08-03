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

export default function Column(props) {
    const { index, id, handleDblClk, name, lockedArray } = props
    const isLocked = lockedArray.some(lockedItem => lockedItem === id)
    return (
        <Draggable draggableId={id} index={index} isDragDisabled={isLocked}>
            {(provided) =>(
                <Container
                    isLocked={isLocked}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    index={index}
                    onDoubleClick={() => handleDblClk(id)}
                >
                    <Handle>
                        <i className={isLocked ? "fa fa-lock" : "fas fa-bars"}></i>
                    </Handle>
                    {name}
                </Container>
            )}
        </Draggable>
    )
}

Column.defaultProps = {
    column: {}
}