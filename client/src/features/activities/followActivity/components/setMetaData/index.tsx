import React, { useEffect, useState } from "react";
import { followActivity } from "../../utils";

interface MetaProps {
	className: string;
	buttonInnerText: string;
}

interface ActivityProps {
	type: string;
	userId: number;
	subjectId: number;
}

interface FollowProps {
	followButtonMetaData: MetaProps;
	activityData: ActivityProps;
	setIsFollowing: React.ComponentState;
}

 
const SetFollowMetaData: React.FC<FollowProps> = ({
	followButtonMetaData,
	activityData,
	setIsFollowing,
}) => {
	

	const followingStatusHandler = async () => {
		const { type, userId, subjectId } = activityData;
		try {
			if(setIsFollowing){
				await followActivity("/unfollow","post",type, userId, subjectId);
				setIsFollowing(false);
			}
			if(setIsFollowing!){
				await followActivity("/follow","post",type, userId, subjectId);
				setIsFollowing(true);
			}
		} catch (error:any) {
			// console.log("🚀 ~ file: index.tsx:36 ~ followingStatus ~ error:", error)
		}
	};

	
	

	return (
		<button className={followButtonMetaData.className} onClick={followingStatusHandler}>
			{followButtonMetaData.buttonInnerText}
		</button>
	);
};

export default SetFollowMetaData;
