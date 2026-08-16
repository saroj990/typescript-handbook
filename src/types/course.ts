export type Level = "beginner" | "intermediate" | "advanced";

export type ExerciseType =
  | "write-code"
  | "fix-bug"
  | "predict-output"
  | "type-challenge"
  | "multiple-choice"
  | "refactoring"
  | "real-world";

export interface ExerciseTest {
  id: string;
  description: string;
  /** Expression evaluated after learner code. Must be truthy to pass. */
  expression: string;
}

export interface MultipleChoiceOption {
  id: string;
  label: string;
  correct: boolean;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  title: string;
  prompt: string;
  starterCode?: string;
  solution: string;
  hints: string[];
  tests?: ExerciseTest[];
  expectedOutput?: string;
  choices?: MultipleChoiceOption[];
}

export interface Playground {
  id: string;
  title?: string;
  code: string;
}

export type LessonBlock =
  | { type: "markdown"; markdown: string }
  | { type: "playground"; playground: Playground };

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: Level;
  sectionId: string;
  order: number;
  estimatedMinutes: number;
  prerequisites?: string[];
  objectives: string[];
  blocks: LessonBlock[];
  exercises: Exercise[];
  takeaways: string[];
}

export interface Section {
  id: string;
  title: string;
  description: string;
  level: Level;
  order: number;
  lessonIds: string[];
}

export interface Course {
  id: string;
  title: string;
  tagline: string;
  description: string;
  sections: Section[];
}

export interface CodeExample {
  id: string;
  title: string;
  code: string;
  language?: "ts" | "tsx" | "json";
}

export interface SearchDocument {
  id: string;
  kind: "lesson" | "exercise" | "concept";
  title: string;
  description: string;
  sectionTitle: string;
  slug: string;
  exerciseId?: string;
  text: string;
}
