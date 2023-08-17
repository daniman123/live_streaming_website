import { useMemo } from "react";

export const initialActivityData = {
	type: "Follow",
	userId: 0,
	subjectUserId: 0,
};

export const getActivityData = (
	isFollowing: boolean,
	userId: number,
	subjectUserId: number
) =>
	useMemo(
		() => ({
			...initialActivityData,
			type: isFollowing ? "UnFollow" : "Follow",
			userId,
			subjectUserId: subjectUserId,
		}),
		[isFollowing, userId, subjectUserId]
	);

export const getFollowButtonMetaData = (isFollowing: boolean) =>
	useMemo(
		() => ({
			className: isFollowing
				? "unFollow-activity-button"
				: "follow-activity-button",
			buttonInnerText: isFollowing ? "Unfollow" : "Follow",
		}),
		[isFollowing]
	);
