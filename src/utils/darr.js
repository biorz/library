/**
 * get index by deep array
 * @param arr
 * @param head {index: 0, stop: false}
 * @param idx
 * @returns {*}
 */
export function next(arr, idx, head) {
  if(idx < 0) {
    idx += next(arr)
  }

  head = head || {index: 0, done: false}
  let i = 0, len = arr.length, val, rst

  for(; i < len && !head.done; i++) {
    val = arr[i]

    if(idx !== undefined && idx === head.index) {
      head.done = true
      return val
    }

    head.index++

    if(Array.isArray(val)) {
      rst = next(val, idx, head)
    }
  }

  return rst===undefined
    ? head.index
    : rst
}

if(require.main === module) {
  let arr = [
    1,
    [
      [
        2,
        [3]
      ]
    ]
  ]
  console.log(next(arr, 0))
  console.log(next(arr, -1))
}

