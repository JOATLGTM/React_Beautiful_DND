import React from 'react'
import styled from 'styled-components'
import Column from './Column'
import { Droppable } from 'react-beautiful-dnd'

const Container = styled.div`
    margin: 8px;
    width: 50%;
    display: flex;
    flex-direction: column;
`

const Title = styled.h3`
    padding: 8px;
    color: gray;
`

const ListContainer = styled.div`
    padding: 8px;
    flex-grow: 1;
    min-height: 100px;
    border-right: ${props => props.title === 'Available' ? 'gray dashed' : null}
`

const convertIdToString = (idString) => {
    let newString = idString
        .replace(/([A-Z])/g, ' $1')
        .replace(/([%])/g, ' $1')
        .replace(/([&])/g, ' $1')
        .replace(/^./, function(str){ return str.toUpperCase(); })
    return newString
}

const renderString = (item) => {
    let newItem = item.id ? item.name : convertIdToString(item)
    return newItem
}

export default function ColumnList(props) {
    const { column, handleDblClk, lockedArray } = props
    return (
        <Container>
            <Title>{column.title}</Title>
            <Droppable droppableId={column.id}>
                {provided => (
                    <ListContainer
                        title={column.title}
                        ref={provided.innerRef}
                        {...provided.droppableProps}    
                    >
                        {column.items.map((item, index) => {
                            let name = renderString(item)
                            let id = item.id ? item.id : item
                            return <Column
                                        key={id} 
                                        name={name} 
                                        id={id} 
                                        index={index}
                                        handleDblClk={handleDblClk}
                                        lockedArray={lockedArray}
                                    /> 
                        })}
                        {provided.placeholder}
                    </ListContainer>
                )}
            </Droppable>
        </Container>
    )
}

ColumnList.defaultProps = {
    column: {}
}