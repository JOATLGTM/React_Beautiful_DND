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

const convertString = (string) => {
    const newWord = string
                    .replace(/([A-Z])/g, ' $1 $2').trim()
                    .replace(/^./, function(str){ return str.toUpperCase(); })
    return newWord
}

const renderString = (item) => {

    let newItem;
    if(item.id){
        newItem = item.name
    }
    else {
        newItem = convertString(item)
    }

    return newItem
}

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
                            let name = renderString(item)
                            let id = item.id ? item.id : item
                            return <Item 
                                        key={id} 
                                        name={name} 
                                        id={id} 
                                        index={index}
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