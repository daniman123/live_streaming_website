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

	const response = await fetchData(
		"/activities" + endpoint,
		method,
		options
	);

	return response;
};
