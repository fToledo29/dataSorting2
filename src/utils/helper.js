import { ALGORITHM_NAMES } from '../shared/constants';
import BubbleSort from './bubbleSort';

export default class Helper extends BubbleSort {

	static sort(data, property, algoName = '') {
		if (!data.length) {
			return { 
				data: [], 
				algorithm: `Please click "Refresh data"`,
			};
		}

		console.log('Algorithm selected: ', algoName);
	
		switch(algoName) {
			case ALGORITHM_NAMES.SELECTION_SORT:
				return {
					data: Helper.selectionSort(data, property),
					algorithm: algoName
				};
			case ALGORITHM_NAMES.INSERTION_SORT:
				return {
					data: Helper.insertionSort(data, property, 1),
					algorithm: algoName
				};
			// case ALGORITHM_NAMES.BUBBLE_SORT:
			// 	return {
			// 		data: Helper.bubbleSort(data, property),
			// 		algorithm: algoName
			// 	};
			default:
				return { 
					data: [], 
					algorithm: 'Algorithm not implemented yet, please refresh and try another one!',
				};
		}
		
	}
}