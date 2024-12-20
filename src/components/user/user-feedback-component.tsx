import { useState } from "react";
import { categories } from "../../utils/utils";

interface FormData {
  name: string;
  email: string;
  category: string;
  priority: string;
  subject: string;
  feedbackDetails: string;
}

const UserFeedbackComponent = (props: {
  setRefresh: (value: boolean) => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    category: "BugReport",
    priority: "Low",
    subject: "",
    feedbackDetails: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://user-feedback-backend.vercel.app/api/v1/user-feedback/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const responseData = await response.json();
      if (responseData) {
        setFormData({
          name: "",
          email: "",
          category: "BugReport",
          priority: "Low",
          subject: "",
          feedbackDetails: "",
        });
        alert("Feedback submitted successfully!");
        props.setRefresh(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-4 sm:px-8">
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Submit Feedback
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-custom focus:ring-custom"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-custom focus:ring-custom"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-custom focus:ring-custom"
                >
                  {categories.map((category) => (
                    <option key={category.key} value={category.key}>
                      {category.value}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-custom focus:ring-custom"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-custom focus:ring-custom"
                placeholder="Enter subject"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Feedback Details
              </label>
              <textarea
                name="feedbackDetails"
                rows={4}
                value={formData.feedbackDetails}
                onChange={handleInputChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-custom focus:ring-custom"
                placeholder="Enter your feedback"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="!rounded-button bg-black text-white px-6 py-2 font-medium"
              >
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserFeedbackComponent;
