import { useLabelsData } from '../helpers/useLabelsData';

export default function LabelList({ selectedLabels, setLabels }) {
	const labelsQuery = useLabelsData();
	return (
		<div className='labels'>
			<h3>Labels</h3>
			{labelsQuery.isLoading ? (
				<div>Loading...</div>
			) : (
				<ul>
					{labelsQuery.data.map((label) => (
						<li key={label.id}>
							<button
								className={`label ${label.color} ${
									selectedLabels.includes(label.id) ? 'selected' : ''
								}`}
								onClick={() => setLabels(label.id)}
							>
								{label.name}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
