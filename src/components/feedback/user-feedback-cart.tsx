import React from "react";
import { UserFeedback } from "./feedback-dashboard";
import {
  calculateDaysAgo,
  descriptionLimit,
  nameLimit,
} from "../../utils/utils";

interface UserFeedbackCartProps {
  feedback: UserFeedback;
}

const UserFeedbackCart: React.FC<UserFeedbackCartProps> = ({ feedback }) => {
  return (
    <div key={feedback._id} className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            feedback.category === "Bug Report"
              ? "bg-red-100 text-red-800"
              : feedback.category === "Feature Request"
              ? "bg-blue-100 text-blue-800"
              : "bg-purple-100 text-purple-800"
          }`}
        >
          {feedback.category}
        </span>
        <span className="text-sm text-gray-500">
          {calculateDaysAgo(feedback.createdAt)}
        </span>
      </div>
      <div className="mb-2">
        <span className="text-sm font-medium text-gray-600">
          {nameLimit(feedback.name)}
        </span>
        <span className="text-sm text-gray-400 ml-2">{feedback.email}</span>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {feedback.subject}
      </h3>
      <p className="text-gray-600 mb-4">
        {descriptionLimit(feedback.feedbackDetails)}
      </p>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center text-sm text-gray-500">
          <i
            className={`fas fa-circle mr-2 ${
              feedback.priority === "Low"
                ? "text-green-500"
                : feedback.priority === "Medium"
                ? "text-yellow-500"
                : feedback.priority === "High"
                ? "text-red-500"
                : "text-purple-500"
            }`}
          ></i>
          {feedback.priority} Priority
        </span>
      </div>
    </div>
  );
};

export default UserFeedbackCart;
