# Admission Flow

## Overview

The admission process is divided into three stages:

```text
Website Inquiry
       │
       ▼
    Inquiry
       │
       ├── Reject
       │
       └── Enroll
               │
               ▼
            Student
               │
               ▼
          Enrollment
               │
               ▼
            Payments
```

---

# 1. Inquiry (Lead)

An inquiry represents a **potential student** who has filled out the inquiry form on the website.

### Created when

* User submits the inquiry form.

### Stores

* First Name
* Last Name
* Phone
* Email
* Address
* Message
* Interested Course
* Status

### Possible Statuses

* `PENDING`
* `CONTACTED`
* `ENROLLED`
* `REJECTED`

At this stage, the person is **not yet a student**.

---

# 2. Admin Review

The admin reviews each inquiry.

There are two possible outcomes.

## A. Reject Inquiry

Update:

```text
Inquiry.status = REJECTED
```

Nothing else is created.

---

## B. Enroll Inquiry

If the applicant is accepted:

1. Create (or find) a Student.
2. Create an Enrollment.
3. Update the Inquiry status to `ENROLLED`.

---

# 3. Student

A Student represents an **officially admitted person**.

A student should only exist after enrollment.

## Stores

* Personal information
* Contact details
* Status
* Joined date

The Student record remains even after courses finish.

---

# 4. Enrollment

Enrollment connects:

```text
Student
      +
Course
```

Each enrollment represents one course registration.

Example:

| Student | Course          |
| ------- | --------------- |
| Ram     | Graphic Design  |
| Ram     | Accounting      |
| Sita    | Computer Basics |

A student can have multiple enrollments.

---

# 5. Payments

Payments belong to an Enrollment.

```text
Student
    │
Enrollment
    │
Payment
```

Each payment records:

* Amount
* Date
* Method
* Notes

A student can make multiple payments for a single enrollment if required.

---

# Recommended Workflow

## Step 1

Visitor fills the website form.

Creates:

```text
Inquiry
Status = PENDING
```

---

## Step 2

Admin reviews inquiry.

Possible actions:

* Contact
* Reject
* Enroll

---

## Step 3 (Enroll)

Create Student if one does not already exist.

Recommended lookup order:

* Phone number
* Email (if available)

If the student already exists, reuse the existing record.

---

## Step 4

Create Enrollment.

```text
Student
    +
Selected Course
```

---

## Step 5

Update Inquiry.

```text
Status = ENROLLED
```

Optionally link the inquiry to the created Student for future reference.

---

# Database Responsibilities

## Inquiry

Represents:

> Someone who is interested.

Used for:

* Website inquiries
* Lead management
* Admission decisions

---

## Student

Represents:

> An admitted person.

Used for:

* Student profile
* Contact information
* Long-term records

---

## Enrollment

Represents:

> A student's registration in a specific course.

Used for:

* Course tracking
* Completion status
* Payments

---

## Payment

Represents:

> Money received for an enrollment.

Used for:

* Fee tracking
* Payment history
* Receipts

---

# Final Flow

```text
Website Visitor
        │
        ▼
     Inquiry
        │
        ├──────────────► Reject
        │
        ▼
   Admin Approves
        │
        ▼
Create Student
        │
        ▼
Create Enrollment
        │
        ▼
Record Payments
```

This separation keeps the data model clean:

* **Inquiry** = lead/prospect
* **Student** = admitted person
* **Enrollment** = course registration
* **Payment** = fee records
