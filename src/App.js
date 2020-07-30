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
              id: 'symbolAndDescription',
              name: 'Symbol & Description'
            },
            {
              id: 'changePercentage',
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
      extraArray: [],
      lockedColumns: 0
    }
  }

  handleDblClk = e => {
    console.log(`meep`)
  }

  // checkStrings = (ref, string) => {
  //   const obj1 = {}
  //   const obj2 = {}

  //   if(ref.length !== string.length) return false

  //   for(let i of ref){
  //     obj1[i] = (obj1[i] || 0) + 1
  //   }
  //   for(let j of string){
  //     obj2[j] = (obj2[j] || 0) + 1
  //   }
  //   for(let key in obj1){
  //     if(obj1[key] !== obj2[key]){
  //       return false
  //     }
  //   }

  //   return true
  // }

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
        const placeHolder = [...this.state.extraArray]
        placeHolder.push(removed)
        destItems.splice(destination.index, 0, removed.id)
        currentState[destination.droppableId].items = destItems
        currentState[source.droppableId].items = sourceItems
        this.setState({
          columns: currentState,
          extraArray: placeHolder
        })
      }
      else {
        const currentState = {...this.state.columns}
        const placeHolder = [...this.state.extraArray]
        let found

        for(var i = 0; i < placeHolder.length; i++){ 
          if (placeHolder[i].id === removed) { 
            found = placeHolder.splice(i, 1); 
          }
        }
        destItems.splice(destination.index, 0, found[0])
        currentState[source.droppableId].items = sourceItems
        currentState[destination.droppableId].items = destItems
        this.setState({
          columns: currentState,
          extraArray: placeHolder
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