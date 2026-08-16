import type { Course } from "@/types/course";
import { registerLessons } from "@/content/typescript/registry";
import { fundamentalsLessons } from "@/content/typescript/lessons/fundamentals";
import { functionsClassesLessons } from "@/content/typescript/lessons/functions-classes";
import { genericsAdvancedLessons } from "@/content/typescript/lessons/generics-advanced";
import { gettingStartedLessons } from "@/content/typescript/lessons/getting-started";
import { realWorldLessons } from "@/content/typescript/lessons/real-world";

const allLessons = [
  ...gettingStartedLessons,
  ...fundamentalsLessons,
  ...functionsClassesLessons,
  ...genericsAdvancedLessons,
  ...realWorldLessons,
];

registerLessons(allLessons);

export const course: Course = {
  id: "typescript-handbook",
  title: "TypeScript Course & Handbook",
  tagline: "From JavaScript basics to real-world TypeScript",
  description:
    "An interactive handbook with runnable TypeScript, exercises, and local progress tracking. Learn the type system in the order you will actually use it.",
  sections: [
    {
      id: "getting-started",
      title: "Getting Started",
      description: "What TypeScript is, how it relates to JavaScript, and how inference works.",
      level: "beginner",
      order: 0,
      lessonIds: gettingStartedLessons.map((lesson) => lesson.id),
    },
    {
      id: "fundamentals",
      title: "Fundamentals",
      description: "Primitives, collections, object shapes, unions, and narrowing.",
      level: "beginner",
      order: 1,
      lessonIds: fundamentalsLessons.map((lesson) => lesson.id),
    },
    {
      id: "functions",
      title: "Functions",
      description: "Parameter types, returns, and callbacks.",
      level: "beginner",
      order: 2,
      lessonIds: ["function-types"],
    },
    {
      id: "objects-classes",
      title: "Objects & Classes",
      description: "Classes, access modifiers, and composition.",
      level: "intermediate",
      order: 3,
      lessonIds: ["classes-and-access"],
    },
    {
      id: "generics",
      title: "Generics",
      description: "Reusable functions that keep their types.",
      level: "intermediate",
      order: 4,
      lessonIds: ["why-generics", "generic-constraints"],
    },
    {
      id: "advanced-types",
      title: "Advanced Types",
      description: "Discriminated unions and state machines.",
      level: "advanced",
      order: 5,
      lessonIds: ["discriminated-unions"],
    },
    {
      id: "utility-types",
      title: "Utility Types",
      description: "Partial, Pick, Omit, and friends.",
      level: "intermediate",
      order: 6,
      lessonIds: ["utility-types"],
    },
    {
      id: "real-world",
      title: "Real-World Patterns",
      description: "Result types and expected failure.",
      level: "advanced",
      order: 7,
      lessonIds: ["result-type"],
    },
    {
      id: "react",
      title: "TypeScript + React",
      description: "Props, events, and common mistakes.",
      level: "intermediate",
      order: 8,
      lessonIds: ["typing-react-props"],
    },
    {
      id: "backend",
      title: "TypeScript + Backend",
      description: "Type erasure and runtime validation.",
      level: "intermediate",
      order: 9,
      lessonIds: ["runtime-validation"],
    },
    {
      id: "projects",
      title: "Projects",
      description: "Apply the type system to a small domain model.",
      level: "intermediate",
      order: 10,
      lessonIds: ["project-todo"],
    },
  ],
};
