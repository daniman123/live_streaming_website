import React from "react";
import SetFollowMetaData from "../setMetaData";

const FollowButton: React.FC<FollowButtonProps> = ({
	activityData,
	setIsFollowing,
	isFollowing,
}) => {
	return (
		<div className="follow-channel-button-container">
			{activityData.userId !== activityData.subjectUserId && (
				<SetFollowMetaData
					isFollowing={isFollowing}
					activityData={activityData}
					setIsFollowing={setIsFollowing}
				/>
			)}
		</div>
	);
};

export default FollowButton;
