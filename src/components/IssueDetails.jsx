import { GoIssueClosed, GoIssueOpened } from 'react-icons/go';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { possibleStatus } from '../helpers/defaultData';
import { relativeDate } from '../helpers/relativeDate';
import { useUserData } from '../helpers/useUserData';

function useIssueData(issueNumber) {
	const issueQuery = useQuery(['issues', issueNumber], () =>
		fetch(`/api/issues/${issueNumber}`).then((res) => res.json())
	);
	return issueQuery;
}

const IssueHeader = ({
	title,
	number,
	status = 'todo',
	createdBy,
	createdDate,
	comments,
}) => {
	const statusObject = possibleStatus.find(
		(statusOption) => statusOption.id === status
	);
	const createdUser = useUserData(createdBy);
	return (
		<header>
			<h2>
				{title} <span>#{number}</span>
			</h2>
			<div>
				<span
					className={
						status === 'done' || status === 'close' ? 'closed' : 'open'
					}
				>
					{(status === 'done') | (status === 'cancelled') ? (
						<GoIssueClosed />
					) : (
						<GoIssueOpened />
					)}
					{statusObject.label}
				</span>
				<span className='created-by'>
					{createdUser.isLoading ? 'loading...' : createdUser.data.name}
				</span>{' '}
				opened this issue {relativeDate(createdDate)} - {comments.length}{' '}
				comments
			</div>
		</header>
	);
};

function useIssueComment(issueNumber) {
	return useQuery(['issues', issueNumber, 'comments'], () =>
		fetch(`/api/issues/${issueNumber}/comments`).then((res) => res.json())
	);
}

function Comment({ comment, createdBy, createdDate }) {
	const userQuery = useUserData(createdBy);

	if (userQuery.isLoading)
		return (
			<div className='comment'>
				<div>
					<div className='comment-header'>Loading...</div>
				</div>
			</div>
		);

	return (
		<div className='comment'>
			<img src={userQuery.data.profilePictureUrl} alt='Commenter avatar' />
			<div>
				<div className='comment-header'>
					<span>{userQuery.data.name}</span> commented{' '}
					<span>{relativeDate(createdDate)}</span>
				</div>
				<div className='comment-body'>{comment}</div>
			</div>
		</div>
	);
}

export default function IssueDetails() {
	const { number } = useParams();
	const issueQuery = useIssueData(number);
	const commentsQuery = useIssueComment(number);

	return (
		<div className='issue-details'>
			{issueQuery.isLoading ? (
				<p>Loading...</p>
			) : (
				<>
					<IssueHeader {...issueQuery.data} />
					<main>
						<section>
							{commentsQuery.isLoading ? (
								<p>Loading...</p>
							) : (
								commentsQuery.data.map((comment) => {
									return <Comment {...comment} key={comment.id} />;
								})
							)}
						</section>
						<aside></aside>
					</main>
				</>
			)}
			<h1>Issue {number}</h1>
		</div>
	);
}
