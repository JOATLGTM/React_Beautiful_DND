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
      lockedArray: [],
      columnOrder: ['availableList', 'visibleList'],
      lockedColumns: 0
    }
  }

  // removeLockedItem = () => {
  //   for(let i = 0; i < arr.length; i++){
  //     if(arr[i] === )
  //   }
  // }

  handleDblClk = e => {
    //console.log(e)

    // if the item is inside the new array, its currently locked
    const isLocked = this.state.lockedArray.some(item => item === e)
    let currentLockedArray = [...this.state.lockedArray]

    // finds index of the item inside the locked array
    const foundIndex = this.state.lockedArray.findIndex(item => item === e)

    // find index of the item inside the visible array
    const findIndexInVisibleList = this.state.columns['visibleList'].items.findIndex(item => item === e)

    // returns the item itself and the items before
    const prevfilteredVisibleList = this.state.columns['visibleList'].items.filter((item,index) => index <= findIndexInVisibleList)

    // returns the items itself and the items after
    const nextfilteredVisibleList = this.state.columns['visibleList'].items.filter((item,index) => index >= findIndexInVisibleList)


    const inVisibleList = this.state.columns['visibleList'].items.some(item => item === e)
    const newfiltered = currentLockedArray.filter((item, index) => {
      return nextfilteredVisibleList.indexOf(item) > -1
    })

    for(let i = 0; i < currentLockedArray.length; i++){
      for(let j = 0; j < newfiltered.length; j++) {
        if(currentLockedArray[i] === newfiltered[j]){
          currentLockedArray.splice(i, 1)
        }
      }
    }

    console.log(newfiltered)
    console.log(currentLockedArray)
    //console.log(nextfilteredVisibleList)
    // if items are locked - remove items from the isLockedArray
    if(isLocked && inVisibleList){
      currentLockedArray.splice(foundIndex, 1)
      this.setState({
        lockedArray: currentLockedArray
      })
    }

    // if items are not locked - add items to the isLockedArray
    if(!isLocked && inVisibleList) {
      currentLockedArray = prevfilteredVisibleList
      this.setState({
        lockedArray: currentLockedArray
      })
    }
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
    console.log(this.state.lockedArray)
    return (
      <DragDropContext onDragEnd={(result) => this.onDragEnd(result)}>
        <Container>
          {this.state.columnOrder.map((columnId, index) => {
            const column = this.state.columns[columnId]
            // const items = column.items.map(item => item)
            // console.log(`column is `, column)
            return <Column key={index} column={column} index={index} handleDblClk={this.handleDblClk} lockedArray={this.state.lockedArray}/>
          })}
        </Container>
      </DragDropContext>
    )
  }
}

export default App;