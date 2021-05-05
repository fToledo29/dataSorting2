
export default class SelectionSort {
	static selectionSort(arr, property) {
		const n = arr.length;
	
		let i = 0;

		while (i < n) {

			// Setting the current index as min.
			let minIndx = i;

			// Setting one index ahead
			let j = i + 1;

			while (j < n) {

				/**
				 * Validating if any element on the right side of the array is smaller 
				 * than the current item.
				 */
				if (arr[j][property].localeCompare(arr[minIndx][property]) < 0) {

					// if any of them is smaller we save its index.
					minIndx = j;

				}

				j++;
			}

			if (minIndx !== i) {

				// Selection of the new min item
				const temp = arr[minIndx];

				// Moving current item to the old min position
				arr[minIndx] = arr[i];

				// Saving the new min item in the current position.
				arr[i] = temp;
			}

			i++;
		}

		return arr;

	}
}