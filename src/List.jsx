import React from "react";
import PropTypes from "prop-types";

import { Container, Draggable } from "react-smooth-dnd";

import { List, ListItemIcon } from "@material-ui/core";

import DragHandleIcon from "@material-ui/icons/DragHandle";

/**
 * Extends `List` with sortable items.
 *
 * @param {ListItem} children
 * @param {Component} [Handler]
 * @param {String} [handlerClass]
 * @param {Boolean} [right=false] If `true` handler is on the right
 * @param {Function} [update=()={}] State update function
 * @param {Object} [ContainerProps={}] Properties for the `Container` component, see: https://github.com/kutlugsahin/react-smooth-dnd#props
 * @param {any} rest Forwarded to `List`
 * @constructor
 */
export default function SortableList({
  children,
  handler,
  handlerClass = "handler",
  right = false,
  update = () => {},
  ContainerProps = {},
  ...rest
}) {
  // If handler is undefined, use default handler
  if (handler === undefined) {
    handler = <Handler className={handlerClass} />;
  }

  // onDrop event, easily handles update even between groups
  const handleDrop = ({ addedIndex, removedIndex, payload }) => {
    // if removedIndex and addedIndex are null, do nothing
    if (removedIndex === null && addedIndex === null) update((a) => a);
    // Define itemToAdd
    let itemToAdd = payload;
    // Call update
    update((list) => {
      const copy = list.slice();
      // have removedIndex
      if (removedIndex !== null) [itemToAdd] = copy.splice(removedIndex, 1);
      // have addedIndex
      if (addedIndex !== null) copy.splice(addedIndex, 0, itemToAdd);
      return copy;
    });
  };

  // Render
  return (
    <List {...rest}>
      {!!children && (
        <Container
          dragHandleSelector={`.${handlerClass}`}
          onDrop={handleDrop}
          {...ContainerProps}
        >
          {!children.map
            ? mapper(children, handler, right)
            : children.map((item) => mapper(item, handler, right))}
        </Container>
      )}
    </List>
  );
}

// PropTypes
SortableList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  handler: PropTypes.element,
  handlerClass: PropTypes.string,
  right: PropTypes.bool,
  update: PropTypes.func,
  ContainerProps: PropTypes.object,
};

// This is not a Component
// This function wraps `element` with `Draggable`
// `key` is passed to `Draggable`, `ref` preserved
// Also `handler` is added before or after `children` depending on the value of `right`
function mapper(element, handler, right) {
  const {
    key,
    props: { children, ...rest },
    ref,
  } = element;
  return (
    <Draggable key={key}>
      <element.type {...rest} ref={ref}>
        {!right && handler}
        {children}
        {!!right && handler}
      </element.type>
    </Draggable>
  );
}

function Handler({ className = "handler", IconProps = {}, ...rest }) {
  return (
    <ListItemIcon {...rest}>
      <DragHandleIcon className={className} {...IconProps} />
    </ListItemIcon>
  );
}
