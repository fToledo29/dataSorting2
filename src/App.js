import React, { useEffect, useStateuseCallback, } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import TableView from './components/TableView/TableView';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import API from './api/apiRequest';
import Helper from './utils/helper';
import './App.css';
import { ALGORITHM_NAMES_ARR } from './shared/constants';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function App() {

	const RANDMDATA = 'rAndMData';
	const ALGO_NAME = 'algoName';
	const SELECT_KEY = 'Select';
	const classes = useStyles();
	let [data, changeData] = useState({[RANDMDATA]: [], [ALGO_NAME]: ''});
	let [algoName, changeAlgo] = useState(SELECT_KEY);
	let [upToDateDataStatus, changeUpToDateDataStatus] = useState(false);
	let [open, setOpen] = React.useState(false);
	let [dataSorted, changeDataSortedStatus] = useState(false);
	let [sortDuration, sortDurationStatus] = useState(0);

	const mapData = (comingData) => {
		return comingData.map(x => {
				return {
					species: x.species,
					name: x.name,
					id: x.id,
				};
			});
	}

	const updateStateProperty = (newData, algoName) => {
		const dataCopy = {...data};
		dataCopy[RANDMDATA] = newData;
		dataCopy[ALGO_NAME] = algoName;
		changeData({...data, ...dataCopy});
	}

	const getMoreData = () => {
		let newData = [];
		setOpen(true);
		updateStateProperty([], '');
		const allCalls = [API.getData(), API.getData(), API.getData(), API.getData(), API.getData()];
		// const allCalls = [API.getData(), API.getData()];
		Promise.all(allCalls).then((packs) => {
			console.log('Packs: ', packs);
			packs.forEach(pack => {
				const moreData = pack ? mapData(pack.results) : [];
				newData = [...newData, ...moreData];
			});
			updateStateProperty(newData, '');
			changeUpToDateDataStatus(true);
			changeDataSortedStatus(false);
			setOpen(false);
			sortDurationStatus(0);
		}).catch(error => {
			setOpen(false);
			console.log('Something bad has happened :( ', error);
		});

	};
	
	const sortData = () => {
		setOpen(true);
		const t0 = performance.now();
		const sortedObj = Helper.sort(data.rAndMData, 'name', algoName);
		const t1 = performance.now();
		sortDurationStatus((t1 - t0));
		console.log(`Sorting with ${algoName}. took: ` + (t1 - t0) + " milliseconds.")
		updateStateProperty(sortedObj.data, sortedObj.algorithm);
		changeUpToDateDataStatus(false);
		changeDataSortedStatus(true);
		setOpen(false);
	}

	useEffect(() => {
		getMoreData();
	}, [getMoreData]);

	const onSelectChanges = (e) => {
		if (algoName !== SELECT_KEY && dataSorted) {
			changeUpToDateDataStatus(false) 
		}
		changeAlgo(e.target.value);
		sortDurationStatus(0);
	}

	const isValidData = () => (algoName === SELECT_KEY) || !upToDateDataStatus;

	return (
			<>
				<Backdrop 
				className={classes.backdrop}
				open={open}>
					<CircularProgress color="inherit" />
				</Backdrop>

				<div className="main-body"> 
					<Button
					className="btn-refresh elm-center"
					onClick={() => getMoreData()} 
					variant="contained" 
					color="primary">
						Refresh Data
					</Button>
					<Button
					disabled={isValidData()}
					className="btn-sort elm-center"
					onClick={() => sortData()}
					variant="contained" 
					color="secondary">
						Sort Data
					</Button>

					 <Select
					className="elm-center"
					native
					value={algoName}
					onChange={(e => onSelectChanges(e))}>
						<option aria-label="None" value="" />
						<option value={'Select'}>Select Algorithm</option>
						{ALGORITHM_NAMES_ARR.map((name, ind) => {
							return <option key={ind} value={name}>{name}</option>
						})}

					</Select>
					
					<label className="algo-name-lbl elm-center ">
						Items sorted by: <span className="font-bold"> {data.algoName} </span>
					</label>

					{sortDuration > 0 ? <label className="algo-name-lbl elm-center ">
						<div>Sorting with {algoName}. took:  {sortDuration} milliseconds.</div>
					</label> : null}

					<label className="algo-name-lbl elm-center ">
						Items: <span className="font-bold"> {data.rAndMData.length} </span>
					</label>

					{!upToDateDataStatus ? <label className="message elm-center ">
						<span className="font-bold"> Click on Refresh Data! </span>
					</label> : null}

					{algoName === SELECT_KEY ? <label className="message elm-center ">
						<span className="font-bold"> Select an algorithm! </span>
					</label> : null}
				
					<TableView data={data.rAndMData}/>
				</div>
			</>
	);
}



export default App;