-- Formatted SQL DDL (normalized names)
-- Convention: plural table names, primary key column `id` for all tables.

CREATE TABLE admins (
  id uuid PRIMARY KEY,
  username text NOT NULL,
  password text,
  email text,
  full_name text,
  contact_number text
);

CREATE TABLE classes (
  id uuid PRIMARY KEY,
  name text NOT NULL,
  subject text NOT NULL,
  teacher_id uuid,
  schedule text,
  created_at timestamp
);
ALTER TABLE classes
  ADD CONSTRAINT fk_classes_teacher_id FOREIGN KEY (teacher_id) REFERENCES teachers(id);

CREATE TABLE details (
  id uuid PRIMARY KEY,
  evaluation_id uuid NOT NULL,
  criteria text,
  score bigint,
  faculty_id uuid
);

CREATE TABLE enrollments (
  id uuid PRIMARY KEY,
  student_id uuid,
  class_id uuid,
  enrolled_at timestamp,
  status text,
  subject_id uuid
);

CREATE TABLE evaluations (
  id uuid PRIMARY KEY,
  created_at timestamptz NOT NULL,
  evaluation_id uuid,
  student_id uuid,
  faculty_id uuid,
  evaluation_date timestamptz
);
ALTER TABLE evaluations
  ADD CONSTRAINT fk_evaluations_student_id FOREIGN KEY (student_id) REFERENCES students(id);
ALTER TABLE evaluations
  ADD CONSTRAINT fk_evaluations_faculty_id FOREIGN KEY (faculty_id) REFERENCES teachers(id);

CREATE TABLE evaluation_details (
  id uuid PRIMARY KEY,
  detail_id uuid NOT NULL,
  criteria text NOT NULL,
  score bigint
);
ALTER TABLE evaluation_details
  ADD CONSTRAINT fk_evaluation_details_detail_id FOREIGN KEY (detail_id) REFERENCES details(id);

CREATE TABLE grades (
  id uuid PRIMARY KEY,
  created_at timestamptz NOT NULL,
  prelim double precision,
  midterm double precision,
  final double precision,
  gwa double precision
);
-- If grades.id intentionally references students.id, add FK (keeps former behavior):
ALTER TABLE grades
  ADD CONSTRAINT fk_grades_id_students_id FOREIGN KEY (id) REFERENCES students(id);

CREATE TABLE performance_results (
  id uuid PRIMARY KEY,
  faculty_id uuid NOT NULL,
  average_score bigint NOT NULL,
  classification text,
  evaluation_score bigint,
  faculty uuid
);
ALTER TABLE performance_results
  ADD CONSTRAINT fk_performance_results_faculty_id FOREIGN KEY (faculty_id) REFERENCES teachers(id);
ALTER TABLE performance_results
  ADD CONSTRAINT fk_performance_results_faculty FOREIGN KEY (faculty) REFERENCES teachers(id);

CREATE TABLE programs (
  id bigint PRIMARY KEY,
  created_at timestamptz NOT NULL,
  program_name text,
  year_level bigint,
  teacher_id uuid
);
ALTER TABLE programs
  ADD CONSTRAINT fk_programs_teacher_id FOREIGN KEY (teacher_id) REFERENCES teachers(id);

CREATE TABLE roles (
  id uuid PRIMARY KEY,
  name text NOT NULL,
  description text
);

CREATE TABLE rules (
  id uuid PRIMARY KEY,
  min_score bigint NOT NULL,
  max_score bigint,
  classification text
);

CREATE TABLE students (
  id uuid PRIMARY KEY,
  user_id uuid,
  student_number text,
  full_name text NOT NULL,
  created_at timestamp,
  email text,
  contact_number bigint,
  birth_date date,
  address text,
  gender text
);
ALTER TABLE students
  ADD CONSTRAINT fk_students_user_id FOREIGN KEY (user_id) REFERENCES users(id);

CREATE TABLE subjects (
  id uuid PRIMARY KEY,
  created_at timestamptz NOT NULL,
  subject_code integer,
  subject_name text,
  units integer,
  semester text,
  school_year text
);

CREATE TABLE teachers (
  id uuid PRIMARY KEY,
  user_id uuid,
  employee_id text,
  full_name text NOT NULL,
  department text,
  created_at timestamp,
  email text,
  contact_number bigint
);
ALTER TABLE teachers
  ADD CONSTRAINT fk_teachers_user_id FOREIGN KEY (user_id) REFERENCES users(id);

CREATE TABLE users (
  id uuid PRIMARY KEY,
  email text NOT NULL,
  role_id uuid,
  created_at timestamp
);
ALTER TABLE users
  ADD CONSTRAINT fk_users_role_id FOREIGN KEY (role_id) REFERENCES roles(id);

-- Suggested safe indexes
CREATE INDEX IF NOT EXISTS idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_class_id ON enrollments(class_id);
CREATE INDEX IF NOT EXISTS idx_classes_teacher_id ON classes(teacher_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_student_id ON evaluations(student_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_faculty_id ON evaluations(faculty_id);
CREATE INDEX IF NOT EXISTS idx_students_user_id ON students(user_id);
CREATE INDEX IF NOT EXISTS idx_teachers_user_id ON teachers(user_id);

-- End of normalized DDL
