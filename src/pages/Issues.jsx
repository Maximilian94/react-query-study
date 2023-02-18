import { useState } from 'react';
import IssuesList from '../components/IssuesList';
import LabelList from '../components/LabelList';
export default function Issues() {
	const [labels, setLabels] = useState([]);

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
					<IssuesList selectedLabels={labels} />
				</section>
				<aside>
					<LabelList
						selectedLabels={labels}
						setLabels={(label) => updateLabels(label)}
					/>
				</aside>
			</main>
		</div>
	);
}
