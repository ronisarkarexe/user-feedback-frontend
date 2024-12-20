import React, { useEffect, useState, useCallback } from "react";
import { categories } from "../../utils/utils";
import UserFeedbackCart from "./user-feedback-cart";

export interface UserFeedback {
  _id: string;
  name: string;
  email: string;
  category: string;
  priority: string;
  subject: string;
  feedbackDetails: string;
  createdAt: string;
  updatedAt: string;
}

interface FeedbackDashboardProps {
  setTotalUser: (value: number) => void;
  refresh: boolean;
  setRefresh: (value: boolean) => void;
}

const FeedbackDashboard: React.FC<FeedbackDashboardProps> = ({
  setTotalUser,
  refresh,
  setRefresh,
}) => {
  const [feedbacks, setFeedbacks] = useState<UserFeedback[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedPriority, setSelectedPriority] = useState("All Priorities");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchFeedbacks = useCallback(async () => {
    try {
      const queryParams = new URLSearchParams();
      if (selectedCategory !== "All Categories") {
        queryParams.append("category", selectedCategory);
      }
      if (selectedPriority !== "All Priorities") {
        queryParams.append("priority", selectedPriority);
      }
      if (searchTerm.trim()) {
        queryParams.append("searchTerm", searchTerm);
      }

      const response = await fetch(
        `https://user-feedback-backend.vercel.app/api/v1/user-feedback?${queryParams.toString()}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch feedbacks");
      }

      const data = await response.json();
      setFeedbacks(data.data);
      setTotalUser(data.data.length);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  }, [selectedCategory, selectedPriority, searchTerm, setTotalUser]);

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
    }
    fetchFeedbacks();
  }, [fetchFeedbacks, refresh, setRefresh]);

  return (
    <div className="px-4 sm:px-8">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <h2 className="text-xl font-semibold text-gray-900">
              Feedback Dashboard
            </h2>
            <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
              <input
                type="text"
                placeholder="name, email, subject"
                className="border-gray-300 rounded-md shadow-sm focus:border-custom focus:ring-custom px-4 py-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="border-gray-300 rounded-md shadow-sm focus:border-custom focus:ring-custom"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Category</option>
                {categories.map((category) => (
                  <option key={category.key} value={category.key}>
                    {category.value}
                  </option>
                ))}
              </select>
              <select
                className="border-gray-300 rounded-md shadow-sm focus:border-custom focus:ring-custom"
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
              >
                <option value="">All Priorities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedbacks?.map((feedback) => (
              <UserFeedbackCart key={feedback._id} feedback={feedback} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDashboard;
