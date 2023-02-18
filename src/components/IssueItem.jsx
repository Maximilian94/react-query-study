import { GoComment, GoIssueClosed, GoIssueOpened } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { relativeDate } from '../helpers/relativeDate';
import { useUserData } from '../helpers/useUserData';
import { Label } from './Label';

export default function IssueItem({
	id,
	title,
	number,
	assignee,
	commentCount,
	createBy,
	createdDate,
	labels,
	status,
}) {
	const assigneeUser = useUserData(assignee);
	const createdByUser = useUserData(createBy);

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
					{labels.map((label) => (
						<Label key={label} label={label} />
					))}
				</span>
				<small>
					#{number} opened {relativeDate(createdDate)}{' '}
					{createdByUser.isSuccess ? `by ${createdByUser.data.name}` : ''}
				</small>
			</div>
			{assignee ? (
				<img
					src={
						assigneeUser.isSuccess ? assigneeUser.data.profilePictureUrl : ``
					}
					className='assigned-to'
					alt={'avatar'}
				/>
			) : null}
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
