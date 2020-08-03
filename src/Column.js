import React, { useState } from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
    color: ${props => props.isLocked ? 'gray' : 'white'};
    padding: 8px;
    margin-bottom: 8px;
    font-weight: bold;
    display: flex;
    :hover ${props => !props.isLocked ? `{
            background-color: gray;
            opacity: .8;
            width: 90%;
            color: white;
            }` : null
    }
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

    const [hovered, setHover] = useState(false)
    return (
        <Draggable draggableId={id} index={index} isDragDisabled={isLocked}>
            {(provided) =>(
                <Container
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    isLocked={isLocked}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    index={index}
                    onDoubleClick={() => handleDblClk(id)}
                >
                    <Handle>
                        <i className={isLocked ? "fa fa-lock" : hovered ? "fas fa-bars" : null}></i>
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