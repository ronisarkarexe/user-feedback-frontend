import { useState } from "react";
import FeedbackComponent from "./feedback/feedback-component";
import FeedbackDashboard from "./feedback/feedback-dashboard";
import FooterComponent from "./footer-component";
import HeaderComponent from "./header-component";
import UserFeedbackComponent from "./user/user-feedback-component";

const HomePage = () => {
  const [totalUser, setTotalUser] = useState<number>(0);
  const [refresh, setRefresh] = useState<boolean>(false);
  return (
    <div className="bg-gray-50 font-[Inter]">
      <HeaderComponent />
      <FeedbackComponent
        totalUser={totalUser}
        refresh={refresh}
        setRefresh={setRefresh}
      />
      <UserFeedbackComponent setRefresh={setRefresh} />
      <FeedbackDashboard
        setTotalUser={setTotalUser}
        refresh={refresh}
        setRefresh={setRefresh}
      />
      <FooterComponent />
    </div>
  );
};

export default HomePage;
