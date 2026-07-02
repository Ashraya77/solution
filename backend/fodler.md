
student-management-backend/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── student.controller.js
│   │   ├── teacher.controller.js
│   │   └── auth.controller.js
│   │
│   ├── models/
│   │   ├── Student.js
│   │   ├── Teacher.js
│   │   ├── Course.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── student.routes.js
│   │   ├── teacher.routes.js
│   │   ├── auth.routes.js
│   │   └── index.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── utils/
│   │   └── response.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── README.md

routes → controllers → models/database