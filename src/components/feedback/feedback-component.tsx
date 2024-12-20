import { useEffect, useState } from "react";
import { UserFeedback } from "./feedback-dashboard";
import FeedbackBarChart from "../chart/bar-chart-view";
import FeedbackLineChart from "../chart/line-chart-view";

const FeedbackComponent = (props: {
  totalUser: number;
  refresh: boolean;
  setRefresh: (val: boolean) => void;
}) => {
  const [feedbacks, setFeedbacks] = useState<UserFeedback[]>([]);
  useEffect(() => {
    if (props.refresh) {
      props.setRefresh(false);
    }
    const feedbacksData = async () => {
      const response = await fetch(
        `https://user-feedback-backend.vercel.app/api/v1/user-feedback`
      );
      const data = await response.json();
      setFeedbacks(data.data);
    };
    feedbacksData();
  }, [props.refresh, props]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-8 px-4 sm:px-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Total User Feedbacks
        </h3>
        <p className="text-3xl font-semibold text-custom">{props.totalUser}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <FeedbackBarChart feedbackData={feedbacks} />
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <FeedbackLineChart feedbackData={feedbacks} />
      </div>
    </div>
  );
};

export default FeedbackComponent;
