import React, { useEffect, useState } from "react";
import SetFollowMetaData from "./components/setMetaData";
import { useTokenStore } from "@/store/tokenStore";
import { followActivity } from "./utils";

const ActvitiesFollow = () => {
	const [isFollowing, setIsFollowing] = useState(false);
	const userId: number = useTokenStore((state) => state.userId);


	const followButtonMetaData = {
		0: {
			className: "unFollow-activity-button",
			buttonInnerText: "Unfollow",
		},
		1: {
			className: "follow-activity-button",
			buttonInnerText: "Follow",
		},
	};

	// TODO - data from request
	const activityType = isFollowing ? "UnFollow" : "Follow";

	const activityData = {
		type: activityType,
		userId: userId,
		subjectId: 2,
	};

	const followingStatus = async () => {
		const { type, userId, subjectId } = activityData;
		try {
			if(userId !== 0){
				const response = await followActivity("/isfollowing","post",type, userId, subjectId);
				setIsFollowing(response);
			}
		} catch (error:any) {
			// console.log("🚀 ~ file: index.tsx:36 ~ followingStatus ~ error:", error)
		}
	};


	useEffect(() => {
		const runner = async () => {
		  await followingStatus()
		} 
		runner()
	  }, [userId])

	return (
		<div className="follow-channel-button-container">
			<SetFollowMetaData
				followButtonMetaData={
					isFollowing ? followButtonMetaData["0"] : followButtonMetaData["1"]
				}
				activityData={activityData}
				setIsFollowing={setIsFollowing}
			/>
		</div>
	);
};

export default ActvitiesFollow;
