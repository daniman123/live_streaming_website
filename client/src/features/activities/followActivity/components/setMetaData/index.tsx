import { followingStatusHandler } from "../../utils";
import { getFollowButtonMetaData } from "../../utils/memoConstants";

const SetFollowMetaData: React.FC<FollowProps> = ({
	activityData,
	setIsFollowing,
	isFollowing,
}) => {
	const followButtonMetaData = getFollowButtonMetaData(isFollowing);

	return (
		<button
			className={followButtonMetaData.className}
			onClick={() =>
				followingStatusHandler(activityData, isFollowing, setIsFollowing)
			}
		>
			{followButtonMetaData.buttonInnerText}
		</button>
	);
};

export default SetFollowMetaData;
