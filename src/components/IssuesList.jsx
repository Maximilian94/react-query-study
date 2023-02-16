import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { GoIssueClosed, GoIssueOpened, GoComment } from 'react-icons/go';
import { relativeDate } from '../helpers/relativeDate';

function IssueItem({
	key,
	title,
	number,
	assignee,
	commentCount,
	createBy,
	createdDate,
	labels,
	status,
}) {
	return (
		<li>
			<div>
				{(status === 'done') | (status === 'cancelled') ? (
					<GoIssueClosed color='red' />
				) : (
					<GoIssueOpened color='green' />
				)}
			</div>
			<div className='issue-content'>
				<span>
					<Link to={`/issue/${number}`}>{title}</Link>
					{labels.map((label) => {
						return (
							<span key={label} className={`label red`}>
								{label}
							</span>
						);
					})}
				</span>
				<small>
					#{number} opened {relativeDate(createdDate)} by {createBy}
				</small>
			</div>
			{assignee ? <div>{assignee}</div> : null}
			<span className='comment-count'>
				{commentCount > 0 ? (
					<>
						<GoComment />
						{commentCount}
					</>
				) : null}
			</span>
		</li>
	);
}

export default function IssuesList() {
	const issuesQuery = useQuery(['issues'], () =>
		fetch('/api/issues').then((res) => res.json())
	);
	return (
		<div>
			<h2>Issues List</h2>
			{issuesQuery.isLoading ? (
				<p>Loading...</p>
			) : (
				<ul className='issues-list'>
					{issuesQuery.data.map((issue) => {
						return (
							<IssueItem
								key={issue.id}
								title={issue.title}
								number={issue.number}
								assignee={issue.assignee}
								commentCount={issue.comments.length}
								createBy={issue.createdBy}
								createdDate={issue.createdDate}
								labels={issue.labels}
								status={issue.status}
							/>
						);
					})}
				</ul>
			)}
		</div>
	);
}
