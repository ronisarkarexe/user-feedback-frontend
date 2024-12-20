export const categories = [
  { key: "BugReport", value: "Bug Reports" },
  { key: "FeatureRequest", value: "Feature Requests" },
  { key: "GeneralFeedback", value: "General Feedback" },
  { key: "Suggestions", value: "Suggestions" },
];

export const calculateDaysAgo = (createdAt: string): string => {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();
  const diffTime = currentDate.getTime() - createdDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 0
    ? "Today"
    : diffDays === 1
    ? "1 day ago"
    : `${diffDays} days ago`;
};

export const descriptionLimit = (input: string): string => {
  const words = input.split(" ");
  return words.length > 15 ? words.slice(0, 15).join(" ") + "..." : input;
};

export const nameLimit = (input: string): string => {
  const words = input.split(" ");
  return words.length > 5 ? words.slice(0, 5).join(" ") + "..." : input;
};
