const CourseContent = ({ parts }) => {
  const total = parts.reduce((t, part) => t + part.exercises, 0)
  return (
    <>
      {parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
      <p>Total of {total} exercises</p>
    </>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <h2>{course.name}</h2>
      <CourseContent parts={course.parts} />
    </>
  )
}

export default Course
