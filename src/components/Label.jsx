import { useLabelsData } from '../helpers/useLabelsData';

export function Label({ label }) {
	const labelsQuery = useLabelsData();
	if (labelsQuery.isLoading) return <div></div>;

	const labelObj = labelsQuery.data.find(
		(queryLabel) => queryLabel.id === label
	);
	return (
		<span key={label} className={`label ${labelObj.color}`}>
			{labelObj.name}
		</span>
	);
}
