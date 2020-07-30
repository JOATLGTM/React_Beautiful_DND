import React from 'react'
import styled from 'styled-components'
import Item from './Item'
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

const ItemList = styled.div`
    padding: 8px;
    flex-grow: 1;
    min-height: 100px;
`

export default function Column(props) {
   // console.log(`props inside Column is `, props)
    return (
        <Container>
            <Title>{props.column.title}</Title>
            <Droppable droppableId={props.column.id}>
                {provided => (
                    <ItemList
                        ref={provided.innerRef}
                        {...provided.droppableProps}    
                    >
                        {props.column.items.map((item, index) => {
                            let name = item.id ? item.name : item
                            let id = item.id ? item.id : item
                            return <Item 
                                        key={id} 
                                        name={name} 
                                        id={id} 
                                        index={index}
                                       // { props.column.id === 'visibleList' ? handleDblClk={props.handleDblClk} : null }
                                    /> 
                        })}
                        {provided.placeholder}
                    </ItemList>
                )}
            </Droppable>
        </Container>
    )
}

Column.defaultProps = {
    column: {}
}