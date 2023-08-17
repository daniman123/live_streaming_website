import UserFeed from "../../pages/user/index";
import withFeedWrapper from "@/hoc/feedWrapper/index";

async function User() {
	return (
		<div className="user__feed__content">
			<UserFeed />
		</div>
	);
}

export default withFeedWrapper(User);
