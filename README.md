## How to run app
- npm install
- npm start

## Thoughts on the test

During the stages of developing this app, I was having difficulty finding
ways to drag and drop object items to a column that only accepts strings.
I decided to convert the id string into a string that is matches the object name property. 

Next was trying to figure out how to lock "previous" items and unlocking "next" items. 
I created a new array that would store locked items and reference from it. 
It was inspired by the previous task explained above.

I decided not to use react-bootstrap since styled-components library allows
you to create your own styled components, hence the name, but lacks the response from the change of width of the browser.

A few additional things I would have added would be tests for the components
and create response design when the viewport changes from desktop to mobile.
Lastly, I would have used Context for better state management. Luckily since the components aren't deeply nested, it wouldn't be a huge problem, but it would be better used for scalabilty. 

## Dependencies used
- React-beautiful-dnd
- Styled-Components