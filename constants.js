/*
 * Course Constants
 */
const MATH_COURSE_TITLES = ["Algebra I", "Algebra II/Trigonometry",  "ACT Math", "SAT Math", "Statistics", "Probability", "Pre-Calculus", "Calculus I", "Calculus II", "Calculus III", "Differential Equations", "Linear Algebra", "Discrete Math"];
const CHEMISTRY_COURSE_TITLES = ["High School Chemistry", "General Chemistry I", "AP Chemistry", "General Chemistry II", "Organic Chemistry I", "Organic Chemistry II"];
const PHYSICS_COURSE_TITLES = ["High School Physics", "General Physics I", "AP Physics", "General Physics II", "General Physics III"];
const ENGLISH_COURSE_TITLES = ["High School Writing", "ACT Reading", "ACT Writing", "SAT Reading", "SAT Writing", "College Writing", "Grammar"];
const MATH_COURSES = MATH_COURSE_TITLES.map(title => ({title, subject: "Math"}));
const CHEMISTRY_COURSES = CHEMISTRY_COURSE_TITLES.map(title => ({title, subject: "Chemistry"}));
const PHYSICS_COURSES = PHYSICS_COURSE_TITLES.map(title => ({title, subject: "Physics"}));
const ENGLISH_COURSES = ENGLISH_COURSE_TITLES.map(title => ({title, subject: "English"}));
const ALL_COURSES = MATH_COURSES.concat(CHEMISTRY_COURSES).concat(PHYSICS_COURSES).concat(ENGLISH_COURSES);

module.exports = {
    ALL_COURSES
};
