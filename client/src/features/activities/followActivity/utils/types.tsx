interface ActivityProps {
	type: string;
	userId: number;
	subjectUserId: number;
}

interface FollowProps {
	activityData: ActivityProps;
	setIsFollowing: React.ComponentState;
	isFollowing: boolean;
}

interface FollowButtonProps {
	activityData: {
		type: string;
		userId: number;
		subjectUserId: number;
	};
	setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;
	isFollowing: boolean;
}
