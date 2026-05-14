# Schema Analysis — schoolista

Source: `docs/schema/schema.sql` (JSON array of column definitions).

Summary

- Tables found: admin, classes, detail, enrollments, evaluation, evaluation_detail, grade, performance_result, program, roles, rule, students, subject, teachers, users.
- Primary keys: present for every listed table (most are uuid, `program.id` is bigint).
- Foreign keys: some columns include destinations (e.g. `classes.teacher_id -> teachers.id`, `evaluation.student_id -> students.id`). Not all potential FK relationships are declared in the source.

Notable observations and recommendations

- Inconsistent timestamp types: source contains both "timestamp without time zone" and "timestamp with time zone". I normalized them in the DDL to `timestamp` and `timestamptz` respectively. Decide which you prefer consistently.

- `grade.id` is marked as PRIMARY KEY but the source lists a foreign_key_destination `students.id`. This implies grade rows may be keyed by the student id; if that's intentional, the DDL should add an explicit FK constraint. If not, consider adding a `student_id` column instead.

- `evaluation` contains both `id` (PK) and `evaluation_id` (nullable). The purpose of `evaluation_id` is unclear. If it's an external reference or legacy id, consider renaming or documenting it.

- `performance_result` includes both `faculty_id` (NOT NULL) and `faculty` (nullable uuid). These may be redundant; prefer a single column (`faculty_id`) with clear FK to `teachers.id` if appropriate.

- `users.role_id` is present but the original JSON did not mark a foreign_key_destination. If roles are intended to be referenced, add FK `users.role_id -> roles.id`.

- Many `*_id` columns are nullable. Where referential integrity is required (e.g., enrollments.student_id, enrollments.class_id), consider making them NOT NULL and adding FK constraints.

- Suggested indexes (for performance): add indexes on foreign-key columns used in joins and on frequently queried columns: `enrollments(student_id)`, `enrollments(class_id)`, `classes(teacher_id)`, `evaluation(student_id)`, `evaluation(faculty_id)`, `students(user_id)`, `teachers(user_id)`.

Per-table quick reference

- admin: PK `admin_id` (uuid). Required `username`. Optional `email`, `full_name`, `contact_number`.

- classes: PK `id` (uuid), required `name`, `subject`. Optional `teacher_id` -> `teachers.id`, `schedule`, `created_at`.

- detail: PK `detail_id` (uuid), `evaluation_id` (uuid, NOT NULL), optional `criteria`, `score`, `faculty_id`.

- enrollments: PK `id` (uuid), optional `student_id`, `class_id`, `enrolled_at`, `status`, `subject_id`.

- evaluation: PK `id` (uuid), `created_at` (timestamptz NOT NULL), optional `evaluation_id`, `student_id` -> `students.id`, `faculty_id` -> `teachers.id`, `evaluation_date`.

- evaluation_detail: PK `detail_id` (uuid) -> `detail.detail_id`; `criteria` NOT NULL; `score` optional.

- grade: PK `id` (uuid) [source suggests FK -> students.id]. Fields: `created_at` (timestamptz NOT NULL), `prelim`, `midterm`, `final`, `gwa`.

- performance_result: PK `result_id` (uuid), `faculty_id` (uuid NOT NULL), `average_score` (bigint NOT NULL), `classification`, `evaluation_score`, `faculty` (uuid optional).

- program: PK `id` (bigint), `created_at` (timestamptz NOT NULL), `program_name`, `year_level`, `teacher_id` -> `teachers.id`.

- roles: PK `id` (uuid), `name` NOT NULL, `description` optional.

- rule: PK `rule_id` (uuid), `min_score` NOT NULL, `max_score`, `classification`.

- students: PK `id` (uuid), `user_id` -> `users.id`, `student_number`, `full_name` NOT NULL, `created_at`, `email`, `contact_number` (bigint), `birth_date` (date), `address`, `gender`.

- subject: PK `id` (uuid), `created_at` (timestamptz NOT NULL), `subject_code` (integer), `subject_name`, `units` (integer), `semester`, `school_year`.

- teachers: PK `id` (uuid), `user_id` -> `users.id`, `employee_id`, `full_name` NOT NULL, `department`, `created_at`, `email`, `contact_number` (bigint).

- users: PK `id` (uuid), `email` NOT NULL, `role_id` (uuid), `created_at`.

Next steps I can take (pick one or more):

- Add explicit FK constraints I left as comments (e.g., `users.role_id -> roles.id`, `grade.id -> students.id`) if you confirm intent.
- Convert this DDL into migration files for your DB (e.g., SQL migration or Prisma schema).
- Run a validation pass to detect orphaned FK destinations or naming inconsistencies.
  -- Changes applied:

- I added a safe SQL fix script at `docs/schema/schema_fixes.sql` which conditionally applies the following:
  - Adds FK constraints: `users.role_id -> roles(id)`, `grade.id -> students(id)`, `performance_result.faculty_id -> teachers(id)`, `performance_result.faculty -> teachers(id)` (if present), plus FK constraints for `classes.teacher_id`, `program.teacher_id`, `evaluation.student_id`, `evaluation.faculty_id`, `students.user_id`, `teachers.user_id`, and `evaluation_detail.detail_id -> detail(detail_id)`.
  - Creates indexes on common join columns with `IF NOT EXISTS`.
  - Attempts to set `enrollments.student_id` and `enrollments.class_id` to `NOT NULL` only when the tables contain no NULLs (safe conditional checks).

The formatted DDL (`docs/schema/schema_formatted.sql`) was updated to include these FK constraints and the recommended indexes. If you want me to run the fix script against a database, provide connection details or I can give commands to run locally.

Naming normalization applied

- I normalized naming to a consistent convention: plural table names and a canonical primary key column `id` for every table. For example `admin` -> `admins`, `detail` -> `details`, `evaluation` -> `evaluations`, `evaluation_detail` -> `evaluation_details`, `subject` -> `subjects`, `grade` -> `grades`, `performance_result` -> `performance_results`, `program` -> `programs`, and `rule` -> `rules` (renamed PK columns such as `admin_id` -> `id`, `detail_id` -> `id`, `result_id` -> `id`, etc.).

Files changed

- `docs/schema/schema_fixes.sql`: now includes safe rename operations (conditional) to apply the naming normalization before adding FK constraints.
- `docs/schema/schema_formatted.sql`: replaced with the normalized DDL reflecting plural table names and `id` PKs.

If you want different naming conventions (e.g., keep `*_id` PK names per table, or use singular table names), tell me and I will revert/adjust. Otherwise I can generate a migration that executes the renames and FK changes in a single transactional migration you can run against your DB.
