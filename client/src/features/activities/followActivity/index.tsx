import React, { useState } from "react";
import { useTokenStore } from "@/store/tokenStore";
import FollowButton from "./components/FollowButton";
import { getActivityData } from "./utils/memoConstants";
import useFollowStatusEffect from "./utils/activityHook";

const ActivitiesFollow: React.FC = () => {
	const [isFollowing, setIsFollowing] = useState(false);
	const { userId, subjectUserId } = useTokenStore((state) => ({
		userId: state.userId,
		subjectUserId: state.subjectUserId,
	}));

	const activityData = getActivityData(isFollowing, userId, subjectUserId);
	useFollowStatusEffect(activityData, setIsFollowing, isFollowing);

	return (
		<div className="follow-channel-button-container">
			<FollowButton
				activityData={activityData}
				setIsFollowing={setIsFollowing}
				isFollowing={isFollowing}
			/>
		</div>
	);
};

export default ActivitiesFollow;
