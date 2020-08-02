import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'
import './App.css';
import Column from './Column'

const Container = styled.div`
  display: flex;
  background-color: #0f1117;
`

const MainContainer = styled.div`
  width: 600px;
  padding: 0 1em;
  margin-left: auto;
  margin-right: auto;
`

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      columns: {
        'availableList': {
          id: 'availableList',
          title: 'Available',
          items: props.availableColumn
        },
        'visibleList': {
          id: 'visibleList',
          title: 'Visible',
          items: props.visibleColumn,
        },
      },
      lockedArray: [],
      columnOrder: ['availableList', 'visibleList'],
      lockedColumns: props.lockedColumns,
      onSubmit: false
    }
  }

  onHandleBtn = () => {
    console.log(this.state.lockedArray.length)
    this.setState({
      onSubmit: true,
      lockedColumns: this.state.lockedArray.length
    })
    console.log(`Inside the invisible Array is `, this.state.columns['visibleList'].items)
    console.log(`There are ${this.state.lockedColumns} columns that are locked`)
  }

  onCancelBtn = () => {
    this.setState({
      onSubmit: false
    })
  }



  handleDblClk = e => {
    // console.log(e)

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

    //console.log(newfiltered)
    // console.log(nextfilteredVisibleList)
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
    console.log(`onDragEnd is `, result)
    const { destination, source, draggableId } = result

    if(!destination) return

    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // // if(draggableId ){
    //   return
    // // }

    if(source.droppableId !== destination.droppableId){
      // if(this.state.lockedArray.some(item => {
      //   console.log(draggableId, item)
      //   return !(draggableId === item)
      // })){
      //   return
      // }
      const sourceColumn = this.state.columns[source.droppableId];
      //console.log(`source is `, sourceColumn)
      const destColumn = this.state.columns[destination.droppableId];
      //console.log(`destination is `, destColumn)
      const sourceItems = [...sourceColumn.items];
      //console.log(`source item is `, sourceItems)
      const destItems = [...destColumn.items]
      //console.log(`dest item is `, destItems)
      const [removed] = sourceItems.splice(source.index, 1)
      if(destination.droppableId === 'visibleList'){
        const currentState = {...this.state.columns}
        if(this.state.lockedArray.some((item,index) => {
          return destination.index === index
        })){
          console.log('true')
          this.setState({
            columns: currentState
          })
        }else {
          destItems.splice(destination.index, 0, removed.id)
          currentState[destination.droppableId].items = destItems
          currentState[source.droppableId].items = sourceItems
          //console.log(currentState)
          this.setState({
            columns: currentState
          })
        }
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
      console.log(draggableId)
      const column = this.state.columns[source.droppableId];
      const copiedItems = [...column.items]
      const currentState = {...this.state.columns}
      console.log(currentState['visibleList'].items)
      if(this.state.lockedArray.some((item,index) => {
        return destination.index === index
      })){
        console.log('true')
        this.setState({
          columns: currentState
        })
      }
      else {
        const [removed] = copiedItems.splice(source.index, 1)
        copiedItems.splice(destination.index, 0, removed)
        currentState[source.droppableId].items = copiedItems
        this.setState({
          columns: currentState
        })
      }
    }
  }

  render(){
    // console.log(this.state.lockedArray)
    return (
      <MainContainer>
        <DragDropContext 
          onDragEnd={(result) => this.onDragEnd(result)}
        >
          <Container>
            {this.state.columnOrder.map((columnId, index) => {
              const column = this.state.columns[columnId]
              // const items = column.items.map(item => item)
              // console.log(`column is `, column)
              return <Column key={index} column={column} index={index} handleDblClk={this.handleDblClk} lockedArray={this.state.lockedArray}/>
            })}
          </Container>
        </DragDropContext>
        <button onClick={() => this.onHandleBtn()}>Submit</button>
        <button onClick={() => this.onCancelBtn()}>Cancel</button>
        <p>{this.state.onSubmit ? `Inside the invisible Array is ${this.state.columns['visibleList'].items}` : null }</p>
        <p>{this.state.onSubmit ? `There are ${this.state.lockedColumns} columns that are locked` : null }</p>
      </MainContainer>
    )
  }
}

export default App;