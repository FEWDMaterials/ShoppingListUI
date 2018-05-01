const our_map = (arr, equation) => {
	const mapped = [];
	for (let i = 0; i < arr.length; i++) {
		// access current item in a
		const curr = arr[i];
		const output = equation(curr, i, arr)
		
		mapped.push(output)
	}
	return mapped;
}

const new_array = our_map([1,2,3,4,5], (curr, index, orig) => {
console.log('the current item ', curr);
console.log('the current index ', index);
console.log('the original array ', orig);
return 5;
}
	);
console.log(new_array)