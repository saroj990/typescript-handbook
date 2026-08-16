import type { Course, Lesson, SearchDocument, Section } from "@/types/course";

const lessonsById = new Map<string, Lesson>();
const lessonsBySlug = new Map<string, Lesson>();

export function registerLessons(lessons: Lesson[]): void {
  for (const lesson of lessons) {
    if (lessonsById.has(lesson.id)) {
      throw new Error(`Duplicate lesson id: ${lesson.id}`);
    }
    if (lessonsBySlug.has(lesson.slug)) {
      throw new Error(`Duplicate lesson slug: ${lesson.slug}`);
    }
    lessonsById.set(lesson.id, lesson);
    lessonsBySlug.set(lesson.slug, lesson);
  }
}

export function getLessonById(id: string): Lesson | undefined {
  return lessonsById.get(id);
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessonsBySlug.get(slug);
}

export function getAllLessons(): Lesson[] {
  return [...lessonsById.values()].sort((a, b) => {
    if (a.sectionId === b.sectionId) return a.order - b.order;
    return a.order - b.order;
  });
}

export function getSectionLessons(section: Section): Lesson[] {
  return section.lessonIds
    .map((id) => lessonsById.get(id))
    .filter((lesson): lesson is Lesson => Boolean(lesson));
}

export function getOrderedLessons(course: Course): Lesson[] {
  return course.sections.flatMap((section) => getSectionLessons(section));
}

export function getAdjacentLessons(
  course: Course,
  slug: string,
): { prev?: Lesson; next?: Lesson } {
  const ordered = getOrderedLessons(course);
  const index = ordered.findIndex((lesson) => lesson.slug === slug);
  if (index === -1) return {};
  return {
    prev: ordered[index - 1],
    next: ordered[index + 1],
  };
}

export function getSectionForLesson(course: Course, lesson: Lesson): Section | undefined {
  return course.sections.find((section) => section.id === lesson.sectionId);
}

export function buildSearchDocuments(course: Course): SearchDocument[] {
  const documents: SearchDocument[] = [];
  for (const section of course.sections) {
    for (const lesson of getSectionLessons(section)) {
      const markdown = lesson.blocks
        .filter((block) => block.type === "markdown")
        .map((block) => block.markdown)
        .join("\n");
      documents.push({
        id: lesson.id,
        kind: "lesson",
        title: lesson.title,
        description: lesson.description,
        sectionTitle: section.title,
        slug: lesson.slug,
        text: [lesson.objectives.join(" "), markdown, lesson.takeaways.join(" ")].join(
          " ",
        ),
      });
      for (const exercise of lesson.exercises) {
        documents.push({
          id: `${lesson.id}:${exercise.id}`,
          kind: "exercise",
          title: exercise.title,
          description: exercise.prompt,
          sectionTitle: section.title,
          slug: lesson.slug,
          exerciseId: exercise.id,
          text: [exercise.prompt, exercise.hints.join(" "), exercise.solution].join(" "),
        });
      }
    }
  }
  return documents;
}
