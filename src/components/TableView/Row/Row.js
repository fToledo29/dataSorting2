import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import './Row.css';

function Row({id, name, species}){

	return(
		<TableRow className="row">
			<TableCell align="center" className="column">
				{id}
			</TableCell>
			<TableCell align="center" className="column">
				{name}
			</TableCell>
			<TableCell align="center" className="column">
				{species}
			</TableCell>
		</TableRow>
	);

};

export default Row;