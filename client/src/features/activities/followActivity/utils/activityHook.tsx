import { useEffect, useState } from "react";
import { followActivity } from ".";

interface ActivityData {
	type: string;
	userId: number;
	subjectUserId: number;
}

const useFollowStatusEffect = (
	{ userId, subjectUserId, type }: ActivityData,
	setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>,
	isFollowing: boolean
) => {
	useEffect(() => {
		if (userId === 0 || subjectUserId === 0 || userId === subjectUserId) {
			return;
		}

		const fetchFollowingStatus = async () => {
			try {
				const response = await followActivity(
					"/isfollowing",
					"post",
					type,
					userId,
					subjectUserId
				);
				setIsFollowing(response);
			} catch (error) {
				console.error("Error in followingStatus:", error);
			}
		};

		fetchFollowingStatus();
	}, [userId, subjectUserId]);

	return { isFollowing, setIsFollowing };
};

export default useFollowStatusEffect;
