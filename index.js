function findUniqueIndex(arr) {
    const numCount = {};

    // Создаем объект разницами и количество повторений этих разниц
    for (let i = 0; i < arr.length; i++) {
        const num = arr[i];
        if (numCount[num] === undefined) {
            numCount[num] = 1;
        } else {
            numCount[num]++;
        }
    }

    const numCountValues = Object.values(numCount)
    const numCountKeys = Object.keys(numCount)

    if (numCountKeys.length === 1) {
        return console.error('Wrong input: Array doesn\'t contain missing number')
    }

    if (numCountKeys[0]*2 != numCountKeys[1]) {
        return console.error('Wrong input: Array doesn\'t contain sequent numbers')
    }

    if (numCountKeys.length > 2) {
        return console.error('Wrong input: Array has more than 1 missing number')
    }

    // Обработка для массива в котором 3 числа
    if (numCountValues[0] === numCountValues[1]){
        return arr.length-1
    }

    for (let i = 0; i < arr.length; i++) {
        if (numCount[arr[i]] === 1) {
            return i; // Возвращаем индекс разницы которая отличается от других
        }
    }
}

function findMissingNumber(arr) {
    if (arr.length < 3) {
        return console.error('Wrong input: Array should contain 3 or more numbers')
    }

    const diff = []
    arr.sort((a, b) => a - b);

    // Пушим разницу между соседними числами в массив
    for (let i = 0; i < arr.length-1; i++) {
        diff.push(arr[i+1] - arr[i])
    }

    // Получаем индекс числа, разница которой не соответствует всем остальным разницам
    const index = findUniqueIndex(diff)

    // arr[index+1] это число стоящая после пропущенного числа
    // diff[index]/2 это разница между arr[i+1] и arr[i-1], где i это пропущенное число
    const missingNumber = arr[index+1] - diff[index]/2

    return missingNumber
}

// Test cases:
console.log(findMissingNumber([15, 5, 0])); // Output: 10
console.log(findMissingNumber([7, 9, 10, 11, 12])); // Output: 8
console.log(findMissingNumber([-7, -9, -10, -11, -12])); // Output: -8
console.log(findMissingNumber([1, 4, 7, 13])); // Output: 10
console.log(findMissingNumber([111, 222, 444, 555])); // Output: 333
console.log(findMissingNumber([-5, 5, 10, 15])); // Output: 0
console.log(findMissingNumber([14, 7, 0, -14])); // Output: -7
// Test cases with errors:
console.log(findMissingNumber([]))
console.log(findMissingNumber([1]))
console.log(findMissingNumber([1,2]))
console.log(findMissingNumber([1,2,3]))
console.log(findMissingNumber([1,2,3,100]))
