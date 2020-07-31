import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'
import './App.css';
import Column from './Column'

const Container = styled.div`
  display: flex;
  background-color: #0f1117;
`

class App extends Component {
  constructor(){
    super()
    this.state = {
      columns: {
        'availableList': {
          id: 'availableList',
          title: 'Available',
          items: [
            {
              id: 'startTime',
              name: 'Start Time'
            },
            {
              id: 'stopTime',
              name: 'Stop Time'
            },
            {
              id: 'perPoint',
              name: 'Per Point'
            },
            {
              id: 'initialMargin',
              name: 'Initial Margin'
            },
            {
              id: 'symbol&Description',
              name: 'Symbol & Description'
            },
            {
              id: 'change%',
              name: 'Change %'
            },
          ],
        },
        'visibleList': {
          id: 'visibleList',
          title: 'Visible',
          items: [
            // 'Symbol & Description',
            // 'Change %',
            // 'Change',
            // 'Last',
            // 'Last Volume',
            // 'Bid',
            // 'Bid Size',
            // 'Ask',
            // 'Ask Size'
          ],
        },
      },
      columnOrder: ['availableList', 'visibleList'],
      lockedColumns: 0
    }
  }

  handleDblClk = e => {
    console.log(`meep`)
  }

  convertIdToString = string => {
    return string
      .replace(/([A-Z])/g, ' $1')
      .replace(/([%])/g, ' $1')
      .replace(/([&])/g, ' $1')
      .replace(/^./, function(str){ return str.toUpperCase(); })
  }

  convertStringToObject(string){
    return {
      id: string,
      name: this.convertIdToString(string),
    }
  }

  onDragEnd = async (result) => {
    // console.log(`result is `, result)
    const { destination, source, draggableId } = result

    if(!destination) return

    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if(source.droppableId !== destination.droppableId){
      const sourceColumn = this.state.columns[source.droppableId];
      console.log(`source is `, sourceColumn)
      const destColumn = this.state.columns[destination.droppableId];
      console.log(`destination is `, destColumn)
      const sourceItems = [...sourceColumn.items];
      console.log(`source item is `, sourceItems)
      const destItems = [...destColumn.items]
      console.log(`dest item is `, destItems)
      const [removed] = sourceItems.splice(source.index, 1)
      if(destination.droppableId === 'visibleList'){
        const currentState = {...this.state.columns}
        destItems.splice(destination.index, 0, removed.id)
        currentState[destination.droppableId].items = destItems
        currentState[source.droppableId].items = sourceItems
        console.log(currentState)
        this.setState({
          columns: currentState
        })
      }
      else {
        const currentState = {...this.state.columns}
        const removedObject = this.convertStringToObject(removed)
        destItems.splice(destination.index, 0, removedObject)
        currentState[source.droppableId].items = sourceItems
        currentState[destination.droppableId].items = destItems
        this.setState({
          columns: currentState,
        })
      }
    }
    else {
      const column = this.state.columns[source.droppableId];
      const copiedItems = [...column.items]
      const [removed] = copiedItems.splice(source.index, 1)
      copiedItems.splice(destination.index, 0, removed)
  
      const currentState = {...this.state.columns}
      currentState[source.droppableId].items = copiedItems
      this.setState({
        columns: currentState
      })
    }
  }

  render(){
    return (
      <DragDropContext onDragEnd={(result) => this.onDragEnd(result)}>
        <Container>
          {this.state.columnOrder.map((columnId, index) => {
            const column = this.state.columns[columnId]
            // const items = column.items.map(item => item)
            // console.log(`column is `, column)
            return <Column key={index} column={column} index={index} handleDblClk={this.handleDblClk}/>
          })}
        </Container>
      </DragDropContext>
    )
  }
}

export default App;