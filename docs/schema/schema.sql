[
  {
    "table_name": "admin",
    "column_name": "admin_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "is_primary_key": true,
    "foreign_key_destination": null
  },
  {
    "table_name": "admin",
    "column_name": "username",
    "data_type": "text",
    "is_nullable": "NO",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "admin",
    "column_name": "password",
    "data_type": "text",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "admin",
    "column_name": "email",
    "data_type": "text",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "admin",
    "column_name": "full_name",
    "data_type": "text",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "admin",
    "column_name": "contact_number",
    "data_type": "text",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "classes",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "is_primary_key": true,
    "foreign_key_destination": null
  },
  {
    "table_name": "classes",
    "column_name": "name",
    "data_type": "text",
    "is_nullable": "NO",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "classes",
    "column_name": "subject",
    "data_type": "text",
    "is_nullable": "NO",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "classes",
    "column_name": "teacher_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": "teachers.id"
  },
  {
    "table_name": "classes",
    "column_name": "schedule",
    "data_type": "text",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "classes",
    "column_name": "created_at",
    "data_type": "timestamp without time zone",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "detail",
    "column_name": "detail_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "is_primary_key": true,
    "foreign_key_destination": null
  },
  {
    "table_name": "detail",
    "column_name": "evaluation_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "detail",
    "column_name": "criteria",
    "data_type": "text",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "detail",
    "column_name": "score",
    "data_type": "bigint",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "detail",
    "column_name": "faculty_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "enrollments",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "is_primary_key": true,
    "foreign_key_destination": null
  },
  {
    "table_name": "enrollments",
    "column_name": "student_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "enrollments",
    "column_name": "class_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "enrollments",
    "column_name": "enrolled_at",
    "data_type": "timestamp without time zone",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "enrollments",
    "column_name": "status",
    "data_type": "text",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "enrollments",
    "column_name": "subject_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "evaluation",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "is_primary_key": true,
    "foreign_key_destination": null
  },
  {
    "table_name": "evaluation",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "NO",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "evaluation",
    "column_name": "evaluation_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "evaluation",
    "column_name": "student_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": "students.id"
  },
  {
    "table_name": "evaluation",
    "column_name": "faculty_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": "teachers.id"
  },
  {
    "table_name": "evaluation",
    "column_name": "evaluation_date",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "evaluation_detail",
    "column_name": "detail_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "is_primary_key": true,
    "foreign_key_destination": "detail.detail_id"
  },
  {
    "table_name": "evaluation_detail",
    "column_name": "criteria",
    "data_type": "text",
    "is_nullable": "NO",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "evaluation_detail",
    "column_name": "score",
    "data_type": "bigint",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "grade",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "is_primary_key": true,
    "foreign_key_destination": "students.id"
  },
  {
    "table_name": "grade",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "NO",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "grade",
    "column_name": "prelim",
    "data_type": "double precision",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "grade",
    "column_name": "midterm",
    "data_type": "double precision",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "grade",
    "column_name": "final",
    "data_type": "double precision",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "grade",
    "column_name": "gwa",
    "data_type": "double precision",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "performance_result",
    "column_name": "result_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "is_primary_key": true,
    "foreign_key_destination": null
  },
  {
    "table_name": "performance_result",
    "column_name": "faculty_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "performance_result",
    "column_name": "average_score",
    "data_type": "bigint",
    "is_nullable": "NO",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "performance_result",
    "column_name": "classification",
    "data_type": "text",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "performance_result",
    "column_name": "evaluation_score",
    "data_type": "bigint",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "performance_result",
    "column_name": "faculty",
    "data_type": "uuid",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "program",
    "column_name": "id",
    "data_type": "bigint",
    "is_nullable": "NO",
    "is_primary_key": true,
    "foreign_key_destination": null
  },
  {
    "table_name": "program",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "NO",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "program",
    "column_name": "program_name",
    "data_type": "text",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "program",
    "column_name": "year_level",
    "data_type": "bigint",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "program",
    "column_name": "teacher_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": "teachers.id"
  },
  {
    "table_name": "roles",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "is_primary_key": true,
    "foreign_key_destination": null
  },
  {
    "table_name": "roles",
    "column_name": "name",
    "data_type": "text",
    "is_nullable": "NO",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "roles",
    "column_name": "description",
    "data_type": "text",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "rule",
    "column_name": "rule_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "is_primary_key": true,
    "foreign_key_destination": null
  },
  {
    "table_name": "rule",
    "column_name": "min_score",
    "data_type": "bigint",
    "is_nullable": "NO",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "rule",
    "column_name": "max_score",
    "data_type": "bigint",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "rule",
    "column_name": "classification",
    "data_type": "text",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "students",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "is_primary_key": true,
    "foreign_key_destination": null
  },
  {
    "table_name": "students",
    "column_name": "user_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": "users.id"
  },
  {
    "table_name": "students",
    "column_name": "student_number",
    "data_type": "text",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "students",
    "column_name": "full_name",
    "data_type": "text",
    "is_nullable": "NO",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "students",
    "column_name": "created_at",
    "data_type": "timestamp without time zone",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "students",
    "column_name": "email",
    "data_type": "text",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "students",
    "column_name": "contact_number",
    "data_type": "bigint",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "students",
    "column_name": "birth_date",
    "data_type": "date",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "students",
    "column_name": "address",
    "data_type": "text",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "students",
    "column_name": "gender",
    "data_type": "text",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "subject",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "is_primary_key": true,
    "foreign_key_destination": null
  },
  {
    "table_name": "subject",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "NO",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "subject",
    "column_name": "subject_code",
    "data_type": "integer",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "subject",
    "column_name": "subject_name",
    "data_type": "text",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "subject",
    "column_name": "units",
    "data_type": "integer",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "subject",
    "column_name": "semester",
    "data_type": "text",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "subject",
    "column_name": "school_year",
    "data_type": "text",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "teachers",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "is_primary_key": true,
    "foreign_key_destination": null
  },
  {
    "table_name": "teachers",
    "column_name": "user_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": "users.id"
  },
  {
    "table_name": "teachers",
    "column_name": "employee_id",
    "data_type": "text",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "teachers",
    "column_name": "full_name",
    "data_type": "text",
    "is_nullable": "NO",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "teachers",
    "column_name": "department",
    "data_type": "text",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "teachers",
    "column_name": "created_at",
    "data_type": "timestamp without time zone",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "teachers",
    "column_name": "email",
    "data_type": "text",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "teachers",
    "column_name": "contact_number",
    "data_type": "bigint",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "users",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "is_primary_key": true,
    "foreign_key_destination": null
  },
  {
    "table_name": "users",
    "column_name": "email",
    "data_type": "text",
    "is_nullable": "NO",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "users",
    "column_name": "role_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  },
  {
    "table_name": "users",
    "column_name": "created_at",
    "data_type": "timestamp without time zone",
    "is_nullable": "YES",
    "is_primary_key": false,
    "foreign_key_destination": null
  }
]