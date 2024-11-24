// @ts-check

fetch('http://localhost:3000', {
  method: 'put',
  credentials: 'include',
})
  .then((response) => response?.json())
  .then(({ message }) => {
    const serverResponsePlaceholder =
      document.getElementById('serverResponse');

    assertElementExists(serverResponsePlaceholder);

    serverResponsePlaceholder.innerText = message;
  })
  .catch(console.error);

const draggableWrapper = document.getElementById(
  'draggableWrapper',
);

assertElementExists(draggableWrapper);

let newCursorPositionX = 0;
let newCursorPositionY = 0;
let mouseCursorPositionX = 0;
let mouseCursorPositionY = 0;

draggableWrapper.onmousedown =
  /**@param {MouseEvent} event */
  (event) => {
    event.preventDefault();
    mouseCursorPositionX = event.clientX;
    mouseCursorPositionY = event.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = dragElement;
  };

/**@param {MouseEvent} event */
function dragElement(event) {
  event.preventDefault();

  newCursorPositionX = mouseCursorPositionX - event.clientX;
  newCursorPositionY = mouseCursorPositionY - event.clientY;
  mouseCursorPositionX = event.clientX;
  mouseCursorPositionY = event.clientY;

  assertElementExists(draggableWrapper);

  draggableWrapper.style.top =
    draggableWrapper.offsetTop - newCursorPositionY + 'px';
  draggableWrapper.style.left =
    draggableWrapper.offsetLeft - newCursorPositionX + 'px';
  draggableWrapper.style.cursor = 'grabbing';
}

/**@description stop moving when mouse button is released */
function closeDragElement() {
  document.onmouseup = null;
  document.onmousemove = null;

  assertElementExists(draggableWrapper);

  draggableWrapper.style.cursor = 'grab';
}

/**
 * @param {HTMLElement | null} element
 * @throws {Error} Throws an error if `draggableWrapper` is null or undefined.
 * @returns {asserts element is HTMLElement}
 */
function assertElementExists(element) {
  if (!element) {
    throw 'ElementDoesNotExists';
  }
}
