import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'
import ColumnList from './ColumnList'
import Header from './Header'
import './App.css';

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

const ResultContainer = styled.div`
  padding: 0 1em;
  color: white;
  overflow-wrap: break-word;
`

const Button = styled.button`
  background-color: ${props => props.name === 'submit' ? '#4894c7' : '#7e838c'};
  border-radius: 3px;
  border: none;
  color: white;
  padding: 9px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 0 10px 30px 10px;
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

  handleSubmitBtn = () => {
    this.setState({
      onSubmit: true,
      lockedColumns: this.state.lockedArray.length
    })
  }

  handleCancelBtn = () => {
    this.setState({
      onSubmit: false
    })
  }

  renderResults = () => {
    const visibleColumns = this.state.columns['visibleList'].items
    return `The id strings inside visible list is ${visibleColumns.length > 0 ? visibleColumns.join(', ') : 'empty'}. 
    There are ${this.state.lockedArray.length} items currently locked.`
  }

  handleDblClk = columnId => {
    const { lockedArray, columns } = this.state
    const VISIBLELIST = 'visibleList'
    // if the column is inside locked array, it returns true
    const isLocked = lockedArray.some(item => item === columnId)
    let currentLockedArray = [...lockedArray]
    // finds index of the item inside the locked array
    const foundIndexInLockedArray = lockedArray.findIndex(item => item === columnId)
    // find index of the item inside the visible array
    const findIndexInVisibleList = columns[VISIBLELIST].items.findIndex(item => item === columnId)
    // returns the column itself and the items before it
    const prevfilteredVisibleList = columns[VISIBLELIST].items.filter((item,index) => index <= findIndexInVisibleList)
    // returns the items itself and the items after it
    const nextfilteredVisibleList = columns[VISIBLELIST].items.filter((item,index) => index >= findIndexInVisibleList)
    // filters item that matches between two arrays
    const newfiltered = currentLockedArray.filter((item, index) => {
      return nextfilteredVisibleList.indexOf(item) > -1
    })
    // removes item from lockedArray if items matches
    for(let i = 0; i < currentLockedArray.length; i++){
      for(let j = 0; j < newfiltered.length; j++) {
        if(currentLockedArray[i] === newfiltered[j]){
          currentLockedArray.splice(i, 1)
        }
      }
    }
    // if items are locked - remove items from the isLockedArray
    if(isLocked){
      currentLockedArray.splice(foundIndexInLockedArray, 1)
      this.setState({
        lockedArray: currentLockedArray
      })
    }
    // if items are not locked - add items to the isLockedArray
    if(!isLocked) {
      this.setState({
        lockedArray: prevfilteredVisibleList
      })
    }
  }

  convertIdToString = idString => {
    let newString = idString
      .replace(/([A-Z])/g, ' $1')
      .replace(/([%])/g, ' $1')
      .replace(/([&])/g, ' $1')
      .replace(/^./, function(str){ return str.toUpperCase(); })
    return newString
  }

  convertStringToObject(string){
    return {
      id: string,
      name: this.convertIdToString(string),
    }
  }

  isColumnBeingDraggedInLockedArea = destinationIndex => {
    return this.state.lockedArray.some((item,index) => {
      return destinationIndex === index
    })
  }

  onDragEnd = async (result) => {
    const { destination, source } = result

    // if it gets dragged outside of the list in neither visible and available list, do nothing
    if(!destination) return

    // if it gets dropped in the same position it was before, do nothing
    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // if item drops in another list
    if(source.droppableId !== destination.droppableId){
      const sourceColumn = this.state.columns[source.droppableId];
      const destColumn = this.state.columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items]
      const [removed] = sourceItems.splice(source.index, 1)
      // if item is being dropped is in the visible list
      if(destination.droppableId === 'visibleList'){
        const currentState = {...this.state.columns}
        if(this.isColumnBeingDraggedInLockedArea(destination.index)){
          this.setState({
            columns: currentState
          })
        } // drag and drop column to dropped position from available list
        else {
          destItems.splice(destination.index, 0, removed.id)
          currentState[destination.droppableId].items = destItems
          currentState[source.droppableId].items = sourceItems
          this.setState({
            columns: currentState
          })
        }
      }
      // if item is being dropped is in the available list from visible list
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
    // if item drops in the same list
    else {
      const column = this.state.columns[source.droppableId];
      const copiedItems = [...column.items]
      const currentState = {...this.state.columns}
      if(this.isColumnBeingDraggedInLockedArea(destination.index)){
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
    return (
      <MainContainer>
        <Header />
        <ResultContainer>
          <p>{this.state.onSubmit ? this.renderResults() : null }</p>
        </ResultContainer>
        <DragDropContext 
          onDragEnd={(result) => this.onDragEnd(result)}
        >
          <Container>
            {this.state.columnOrder.map((columnId, index) => {
              const column = this.state.columns[columnId]
              return <ColumnList 
                        key={index} 
                        column={column} 
                        index={index} 
                        handleDblClk={this.handleDblClk} 
                        lockedArray={this.state.lockedArray}
                        convertIdToString={this.convertIdToString}
                      />
            })}
          </Container>
        </DragDropContext>
        <Button name="submit" onClick={() => this.handleSubmitBtn()}>Submit</Button>
        <Button name="cancel" onClick={() => this.handleCancelBtn()}>Cancel</Button>
      </MainContainer>
    )
  }
}

export default App;