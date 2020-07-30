The component should take three parameters:

- available columns: an array of objects, each item is an object with “id” string property for unique identification and “name” string property for displaying like { id: “startTime”, name: “Start Time”}

- visible columns: an array of strings, each string is a reference to id property of previous array;

- and a number of fixed columns (fixed columns are shown with lock icon).


User can drag-n-drop columns between lists and inside lists for reordering. Double click on icon of visible column should mark it and all previous columns as fixed ones. Double click on already fixed column should reset fixed status from it and all next columns.


Save button should raise an event with the resulting array of ids of visible columns and a new number of fixed columns.


Component should be implemented as React.JS component with usage of react-bootstrap and any other open source library (except jQuery) with more than 50 stars on Github.


Look-n-feel should reproduce the picture as close as possible (LESS is preferable).


The project should be organized as Node.js project with gulp for building. The main web-page should be a demo page for the component.

++++++++++