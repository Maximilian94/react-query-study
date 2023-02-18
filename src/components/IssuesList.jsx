import { useEffect } from 'react';
import { useQuery } from 'react-query';
import IssueItem from './IssueItem';

export default function IssuesList({ selectedLabels }) {
	const issuesQuery = useQuery(['issues', { selectedLabels }], () => {
		const labelsString = selectedLabels
			.map((label) => `labels[]=${label}`)
			.join('&');
		console.log('labelsString', labelsString);
		return fetch('/api/issues').then((res) => res.json());
	});

	return (
		<div>
			{console.log('selectedLabels', selectedLabels)}
			<h2>Issues List</h2>
			{issuesQuery.isLoading ? (
				<p>Loading...</p>
			) : (
				<ul className='issues-list'>
					{issuesQuery.data.map((issue) => {
						return (
							<IssueItem
								id={issue.id}
								title={issue.title}
								number={issue.number}
								assignee={issue.assignee}
								commentCount={issue.comments.length}
								createBy={issue.createdBy}
								createdDate={issue.createdDate}
								labels={issue.labels}
								status={issue.status}
								key={issue.id}
							/>
						);
					})}
				</ul>
			)}
		</div>
	);
}
