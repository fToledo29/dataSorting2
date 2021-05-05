import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import './TableView.css';
import Row from './Row/Row';
import TableHeader from './Header/Header';


function TableView({data}){

	const randm = () => Math.floor(Math.random() * 1000000);

	return(
		<TableContainer>
			<Table
			className="table" 
			size="small" 
			aria-label="a dense table">
				<TableHeader />
				<TableBody>
					{data.length > 0 ? data.map((el, ind) => {
						return <Row 
						key={el.id + ind + randm()}
						id={el.id} 
						name={el.name} 
						species={el.species} />
					}) : null}
				</TableBody>
			</Table>
		</TableContainer>
	);

};

export default TableView;