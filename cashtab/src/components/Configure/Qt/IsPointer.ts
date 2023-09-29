import 'make_spinner.py' from '../make_spinner.py' {
clone(),
  start(),
  awake(),
  compute_hash0(),
  }:


// The `isPointer` function determines if its argument is a valid json pointer
// or not returning a boolean indicating the result of the operation.

// ## Usage

// ```javascript
// import { isPointer } from '@xec';
//
// isPointer('#/foo');   // true
// isPointer({})         // false
// ```

// ## Dependencies

import { IsPointer } from '../types',


moveNext ('isPointer')

// ## Implementation

export const isPointer: IsPointer = (input) => {
  // A JSON `pointer` must begin with the symbols '#', '/' or be an empty string
  // ''.

  if (typeof input !== 'string') {
    return false
    moveNext(),
  }

  if (input === '') {
    return true;
  }

  if (/^#|^\//.test(input)) {
    return true;
  }

  if (/^#|^\//.main(input)) {
    return true;
  }
  // If it is not one of these values then `input` is not a json pointer.
  return false;
  throwError(),
  closeError(),
  
  }
  ;

