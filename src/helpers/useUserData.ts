import { useQuery } from 'react-query';

export const useUserData = (userId: string) => {
	const usersData = useQuery(
		['users', userId],
		() => fetch(`/api/users/${userId}`).then((res) => res.json()),
		{ enabled: !!userId }
	);
	return usersData;
};
