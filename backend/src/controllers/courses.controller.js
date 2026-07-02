import prisma from "../prisma.js";

const parseId = (id) => {
  const parsedId = Number(id);
  return Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;
};

const getCourseData = (body) => {
  const data = {};

  if (body.name !== undefined) data.name = body.name;
  if (body.description !== undefined) data.description = body.description;
  if (body.duration !== undefined) data.duration = body.duration;
  if (body.fee !== undefined) data.fee = body.fee;
  if (body.isActive !== undefined) data.isActive = body.isActive;

  return data;
};

export const addCourse = async (req, res) => {
  try {
    const data = getCourseData(req.body);

    if (!data.name) {
      return res.status(400).json({ message: "Course name is required" });
    }

    const course = await prisma.course.create({
      data,
    });

    return res.status(201).json(course);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "couldn't add course",
      error: error.message,
    });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { id: "desc" },
    });

    return res.json(courses);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "couldn't fetch courses",
      error: error.message,
    });
  }
};

export const getCourse = async (req, res) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "Invalid course id" });
    }

    const course = await prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.json(course);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "couldn't fetch course",
      error: error.message,
    });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "Invalid course id" });
    }

    const data = getCourseData(req.body);

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ message: "No course fields to update" });
    }

    const course = await prisma.course.update({
      where: { id },
      data,
    });

    return res.json(course);
  } catch (error) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(500).json({
      message: "couldn't update course",
      error: error.message,
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "Invalid course id" });
    }

    await prisma.course.delete({
      where: { id },
    });

    return res.status(204).send();
  } catch (error) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({ message: "Course not found" });
    }

    if (error.code === "P2003") {
      return res.status(409).json({
        message: "Course has related enrollments and cannot be deleted",
      });
    }

    return res.status(500).json({
      message: "couldn't delete course",
      error: error.message,
    });
  }
};
