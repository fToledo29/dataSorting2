import SelectionSort from './selectionSort';

export default class InsertionSort extends SelectionSort {
	static insertionSort(arr, property) {

		let i = 1;

		while (i < arr.length) {
			
			// Storing current item to be validated
			let currentItem = arr[i];
			
			let j = i;
			
			/*
			*  Validating if current item is smaller than the 
			*  item one index before.
			*/
			while (j > 0 && arr[j - 1][property].localeCompare(currentItem[property]) < 0) {
				
				/**
				 * If current item is smaler we move the item before (j - 1) 
				 * one position above "j"
				 */
				arr[j] = arr[j - 1];
				
				// We decrease the index so we can validate below items.
				j--;
			}

			// Finally we assign the stored item to the final position of "j"
			arr[j] = currentItem; 

			i++;
		}

		return arr;

	}
}