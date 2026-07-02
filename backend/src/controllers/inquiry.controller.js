import prisma from "../prisma.js";

const INQUIRY_STATUSES = new Set([
  "PENDING",
  "CONTACTED",
  "ENROLLED",
  "REJECTED",
]);

const parseId = (id) => {
  const parsedId = Number(id);
  return Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;
};

const httpError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const normalizeCourseId = (courseId) => {
  if (courseId === undefined) return undefined;
  if (courseId === null || courseId === "") return null;

  const parsedCourseId = Number(courseId);
  return Number.isInteger(parsedCourseId) && parsedCourseId > 0
    ? parsedCourseId
    : NaN;
};

const getInquiryData = (body, { allowStatus = false } = {}) => {
  const data = {};

  if (body.firstName !== undefined) data.firstName = body.firstName;
  if (body.lastName !== undefined) data.lastName = body.lastName;
  if (body.phone !== undefined) data.phone = body.phone;
  if (body.email !== undefined) data.email = body.email;
  if (body.address !== undefined) data.address = body.address;
  if (body.message !== undefined) data.message = body.message;

  const courseId = normalizeCourseId(body.courseId);
  if (Number.isNaN(courseId)) {
    throw httpError(400, "Invalid course id");
  }
  if (courseId !== undefined) data.courseId = courseId;

  if (allowStatus && body.status !== undefined) {
    if (!INQUIRY_STATUSES.has(body.status)) {
      throw httpError(400, "Invalid inquiry status");
    }

    data.status = body.status;
  }

  return data;
};

const getStudentDataFromInquiry = (inquiry) => {
  const data = {
    firstName: inquiry.firstName,
    lastName: inquiry.lastName,
    address: inquiry.address,
  };

  if (inquiry.email) data.email = inquiry.email;

  return data;
};

const handleInquiryError = (res, error, message) => {
  console.error(error);

  if (error.statusCode) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (error.code === "P2025") {
    return res.status(404).json({ message: "Inquiry not found" });
  }

  if (error.code === "P2003") {
    return res.status(400).json({ message: "Related course was not found" });
  }

  if (error.code === "P2002") {
    return res.status(409).json({
      message: "A record with the same unique field already exists",
    });
  }

  return res.status(500).json({
    message,
    error: error.message,
  });
};

export const createInquiry = async (req, res) => {
  try {
    const data = getInquiryData(req.body);

    if (!data.firstName || !data.phone) {
      return res.status(400).json({
        message: "firstName and phone are required",
      });
    }

    const inquiry = await prisma.inquiry.create({
      data,
    });

    return res.status(201).json(inquiry);
  } catch (error) {
    return handleInquiryError(res, error, "Failed to create inquiry");
  }
};

export const getInquiries = async (req, res) => {
  try {
    const inquiries = await prisma.inquiry.findMany({
      include: { course: true },
      orderBy: { createdAt: "desc" },
    });

    return res.json(inquiries);
  } catch (error) {
    return handleInquiryError(res, error, "Failed to fetch inquiries");
  }
};

export const getInquiry = async (req, res) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "Invalid inquiry id" });
    }

    const inquiry = await prisma.inquiry.findUnique({
      where: { id },
      include: { course: true },
    });

    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    return res.json(inquiry);
  } catch (error) {
    return handleInquiryError(res, error, "Failed to fetch inquiry");
  }
};

export const updateInquiry = async (req, res) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "Invalid inquiry id" });
    }

    const data = getInquiryData(req.body, { allowStatus: true });

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ message: "No inquiry fields to update" });
    }

    const inquiry = await prisma.inquiry.update({
      where: { id },
      data,
      include: { course: true },
    });

    return res.json(inquiry);
  } catch (error) {
    return handleInquiryError(res, error, "Failed to update inquiry");
  }
};

export const deleteInquiry = async (req, res) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "Invalid inquiry id" });
    }

    await prisma.inquiry.delete({
      where: { id },
    });

    return res.status(204).send();
  } catch (error) {
    return handleInquiryError(res, error, "Failed to delete inquiry");
  }
};

export const rejectInquiry = async (req, res) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "Invalid inquiry id" });
    }

    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: { status: "REJECTED" },
      include: { course: true },
    });

    return res.json(inquiry);
  } catch (error) {
    return handleInquiryError(res, error, "Failed to reject inquiry");
  }
};

export const acceptInquiry = async (req, res) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "Invalid inquiry id" });
    }

    const result = await prisma.$transaction(async (tx) => {
      const inquiry = await tx.inquiry.findUnique({
        where: { id },
      });

      if (!inquiry) {
        throw httpError(404, "Inquiry not found");
      }

      const requestedCourseId = normalizeCourseId(req.body.courseId);
      if (Number.isNaN(requestedCourseId)) {
        throw httpError(400, "Invalid course id");
      }

      const courseId = requestedCourseId ?? inquiry.courseId;

      if (!courseId) {
        throw httpError(
          400,
          "courseId is required to accept an inquiry as enrollment",
        );
      }

      const course = await tx.course.findUnique({
        where: { id: courseId },
      });

      if (!course) {
        throw httpError(404, "Course not found");
      }

      const existingStudentByPhone = await tx.student.findUnique({
        where: { phone: inquiry.phone },
      });
      let existingStudentByEmail = null;

      if (inquiry.email) {
        existingStudentByEmail = await tx.student.findUnique({
          where: { email: inquiry.email },
        });

        if (
          existingStudentByEmail &&
          existingStudentByPhone &&
          existingStudentByEmail.id !== existingStudentByPhone.id
        ) {
          throw httpError(
            409,
            "Inquiry phone and email belong to different students",
          );
        }
      }

      const existingStudent = existingStudentByPhone ?? existingStudentByEmail;
      const studentData = {
        ...getStudentDataFromInquiry(inquiry),
        phone: inquiry.phone,
      };

      const student = existingStudent
        ? await tx.student.update({
            where: { id: existingStudent.id },
            data: studentData,
          })
        : await tx.student.create({
            data: studentData,
          });

      const enrollment = await tx.enrollment.upsert({
        where: {
          studentId_courseId: {
            studentId: student.id,
            courseId,
          },
        },
        update: {
          status: "Running",
        },
        create: {
          studentId: student.id,
          courseId,
          status: "Running",
        },
      });

      const updatedInquiry = await tx.inquiry.update({
        where: { id },
        data: {
          status: "ENROLLED",
          courseId,
        },
        include: { course: true },
      });

      return {
        inquiry: updatedInquiry,
        student,
        enrollment,
      };
    });

    return res.json(result);
  } catch (error) {
    return handleInquiryError(res, error, "Failed to accept inquiry");
  }
};
