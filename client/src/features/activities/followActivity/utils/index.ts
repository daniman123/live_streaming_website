import { fetchData } from "@/api/utils/fetch";

export const followActivity = async (
	endpoint: String,
	method: string,
	type: String,
	userId: Number,
	subjectId: Number
) => {
	const data = {
		user_id: userId,
		subject_user_id: subjectId,
		activity_type: type.toUpperCase(),
		content: "",
	};

	const options = {
		headers: {
			"Content-Type": "application/json",
		},
		data,
	};

	const response = await fetchData("/activities" + endpoint, method, options);

	return response;
};

export const followingStatusHandler = async (
	{ type, userId, subjectUserId }: ActivityProps,
	isFollowing: boolean,
	setIsFollowing: React.ComponentState
) => {
	try {
		const followEndpoint = isFollowing ? "/unfollow" : "/follow";
		await followActivity(followEndpoint, "post", type, userId, subjectUserId);
		setIsFollowing(!isFollowing);
	} catch (error: any) {
		// console.log("🚀 ~ file: index.tsx:36 ~ followingStatus ~ error:", error)
	}
};
