import { useState } from 'react';
import IssuesList from '../components/IssuesList';
import LabelList from '../components/LabelList';
export default function Issues() {
	const [labels, setLabels] = useState([]);
	const [status, setStatus] = useState('');

	function updateLabels(label) {
		setLabels((currentLabels) =>
			currentLabels.includes(label)
				? currentLabels.filter((currentLabel) => currentLabel !== label)
				: currentLabels.concat(label)
		);
	}
	return (
		<div>
			<main>
				<section>
					<h1>Issues</h1>
					<IssuesList selectedLabels={labels} status={status} />
				</section>
				<aside>
					<LabelList
						selectedLabels={labels}
						setLabels={(label) => updateLabels(label)}
					/>
					<h3>Status</h3>
					<StatusSelect
						value={status}
						onChange={(event) => setStatus(event.target.value)}
					></StatusSelect>
				</aside>
			</main>
		</div>
	);
}

function StatusSelect({ value, onChange }) {
	const possibleStatus = [
		{ id: 'backlog', label: 'Backlog' },
		{ id: 'todo', label: 'To-do' },
		{ id: 'inProgress', label: 'In Progress' },
		{ id: 'done', label: 'Done' },
		{ id: 'cancel', label: 'Cancel' },
	];
	return (
		<select value={value} onChange={onChange} className='status-select'>
			<option value=''>Select status to filter</option>
			{possibleStatus.map((status) => (
				<option value={status.id} key={status.id}>
					{status.label}
				</option>
			))}
		</select>
	);
}
