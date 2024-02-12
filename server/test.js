let array = ['a', 'b', 'c', 'd', 'e'];

let originalIndex = 3

/*if (originalIndex < array.length - 1) {
    let element = array[originalIndex];
    array.splice(originalIndex, 1);
    array.splice(originalIndex + 1, 0, element);
    console.log(array);
} else {
    console.log('cannot move last element');
}*/

if (originalIndex > 0) {
    let element = array[originalIndex];
    array.splice(originalIndex, 1);
    array.splice(originalIndex - 1, 0, element);
    console.log(array);
} else {
    console.log('cannot move first element');
}