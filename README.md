This component uses [`react-smooth-dnd`](https://github.com/kutlugsahin/react-smooth-dnd#readme) to ad _Drag and Drop_ functionality to a `List` component from [`@material-ui`](material-ui.com/).

# Install

```sh
yarn add me-sortable
```

or

```sh
npm i -s me-sortable
```

# Use

Import `List` from `me-sortable`, instead of `List` from `@material-ui/core`.

```js
// import List from "@material-ui/core";
import List from "me-sortable";
```

Add the `update` property to `List`. This is a function that updates the list when an item is dropped. For functional components this is the second value returned by `useState`.

# Example with functional component

```js
import React, { useState } from "react";
import List from "me-sortable";

function Component() {
  const [list, setList] = useState([
    /* ... */
  ]);
  return <List update={setList}>{list.map(mapper)}</List>;
}

function mapper(item) {
  /* ... */
}
```

# Groups

To sort between different groups add a `groupName` and `getChildPayload` to ContainerProps:

```js
<List
  ContainerProps={{
    groupsName: "same-name-for-each-group",
    getChildPayload: (index) => list[index],
  }}
></List>
```

See also [`Container` properties](https://github.com/kutlugsahin/react-smooth-dnd#container) of `react-smooth-dnd`.

# Properties

## `children`

Any number of `ListItem`(s). Each `ListItem` can have its own children as a regular `List`.

## `handler`

A component to be used as handler. If `undefined` it uses a default one.

## `handlerClass`

A string that is uses as `className` to find if an item is draggable. default is `"handler"`.

## `right`

If `true` the handler is put on the right side. Defaults to `false`.

## `update`

A function that updates the state of the list. The same as `setState` from `useState`: https://it.reactjs.org/docs/hooks-reference.html#usestate

## `ContainerProps`

An object of properties passed to the `Container` components: https://github.com/kutlugsahin/react-smooth-dnd#props

To drag vertically:

```js
ContainerProps={{
  lockAxis: "y"
}}
```

## `...rest`

The rest of properties is pased to a `@material-ui` `List` component.
