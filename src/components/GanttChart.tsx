"use client";

import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface GanttTask {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  progress: number; // 0-100
  status: "completed" | "in-progress" | "pending";
}

interface GanttChartProps {
  tasks: GanttTask[];
  startDate: Date;
  endDate: Date;
}

export const GanttChart: React.FC<GanttChartProps> = ({ tasks, startDate, endDate }) => {
  const { effectiveTheme } = useTheme();

  // Calculate total days
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const daysArray = Array.from({ length: totalDays }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    return date;
  });

  // Calculate position and width for each task
  const getTaskPosition = (task: GanttTask) => {
    const taskStart = new Date(task.startDate);
    const taskEnd = new Date(task.endDate);
    const chartStart = startDate;

    const startOffset = Math.ceil((taskStart.getTime() - chartStart.getTime()) / (1000 * 60 * 60 * 24));
    const duration = Math.ceil((taskEnd.getTime() - taskStart.getTime()) / (1000 * 60 * 60 * 24));

    return {
      left: `${(startOffset / totalDays) * 100}%`,
      width: `${(duration / totalDays) * 100}%`,
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-[#FF7700]";
      case "pending":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className={`rounded-lg overflow-hidden ${
      effectiveTheme === "dark" ? "bg-gray-800" : effectiveTheme === "ocean" ? "bg-blue-100" : "bg-white"
    }`}>
      {/* Header with dates */}
      <div className={`p-4 border-b ${
        effectiveTheme === "dark" ? "border-gray-700" : effectiveTheme === "ocean" ? "border-blue-200" : "border-gray-200"
      }`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className={`text-lg font-semibold ${
            effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
          }`}>
            Project Timeline
          </h3>
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className={effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"}>Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#FF7700] rounded"></div>
              <span className={effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"}>In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-400 rounded"></div>
              <span className={effectiveTheme === "dark" ? "text-gray-300" : effectiveTheme === "ocean" ? "text-blue-700" : "text-gray-600"}>Pending</span>
            </div>
          </div>
        </div>
        {/* Date scale */}
        <div className="flex justify-between text-xs mt-4">
          {daysArray.filter((_, i) => i % Math.ceil(totalDays / 6) === 0 || i === 0 || i === totalDays - 1).map((date, idx) => (
            <span key={idx} className={effectiveTheme === "dark" ? "text-gray-400" : effectiveTheme === "ocean" ? "text-blue-600" : "text-gray-500"}>
              {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          ))}
        </div>
      </div>

      {/* Gantt chart body */}
      <div className="p-4 overflow-x-auto">
        <div className="min-w-full">
          {tasks.map((task, index) => {
            const position = getTaskPosition(task);
            return (
              <div key={task.id} className="mb-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className={`w-32 text-sm font-medium ${
                    effectiveTheme === "dark" ? "text-gray-100" : effectiveTheme === "ocean" ? "text-blue-900" : "text-gray-900"
                  }`}>
                    {task.name}
                  </div>
                  <div className="flex-1 relative h-8 bg-gray-100 rounded overflow-hidden">
                    {/* Task bar */}
                    <div
                      className={`absolute h-full ${getStatusColor(task.status)} rounded flex items-center justify-end pr-2`}
                      style={{
                        left: position.left,
                        width: position.width,
                      }}
                    >
                      {/* Progress indicator */}
                      <div
                        className="h-full bg-black bg-opacity-20"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                      <span className="text-xs text-white font-medium ml-2">
                        {task.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


