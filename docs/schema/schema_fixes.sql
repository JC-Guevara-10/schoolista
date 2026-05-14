-- schema_fixes.sql
-- Safe schema fixes for schoolista. Run in Postgres-compatible DB.
-- Normalize naming: plural table names and standard `id` primary keys.
DO $$
BEGIN
  -- Example: rename table `admin` -> `admins`, `detail` -> `details`, `evaluation` -> `evaluations`, etc.
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='admin') AND NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='admins') THEN
    EXECUTE 'ALTER TABLE admin RENAME TO admins';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='detail') AND NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='details') THEN
    EXECUTE 'ALTER TABLE detail RENAME TO details';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='evaluation') AND NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='evaluations') THEN
    EXECUTE 'ALTER TABLE evaluation RENAME TO evaluations';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='evaluation_detail') AND NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='evaluation_details') THEN
    EXECUTE 'ALTER TABLE evaluation_detail RENAME TO evaluation_details';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='subject') AND NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='subjects') THEN
    EXECUTE 'ALTER TABLE subject RENAME TO subjects';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='grade') AND NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='grades') THEN
    EXECUTE 'ALTER TABLE grade RENAME TO grades';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='performance_result') AND NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='performance_results') THEN
    EXECUTE 'ALTER TABLE performance_result RENAME TO performance_results';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='program') AND NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='programs') THEN
    EXECUTE 'ALTER TABLE program RENAME TO programs';
  END IF;

  -- rename columns used for primary keys to a canonical `id` where appropriate
  -- admin.admin_id -> admins.id
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='admins' AND column_name='admin_id') AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='admins' AND column_name='id') THEN
    EXECUTE 'ALTER TABLE admins RENAME COLUMN admin_id TO id';
  END IF;
  -- detail.detail_id -> details.id
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='details' AND column_name='detail_id') AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='details' AND column_name='id') THEN
    EXECUTE 'ALTER TABLE details RENAME COLUMN detail_id TO id';
  END IF;
  -- evaluation_detail.detail_id -> evaluation_details.id
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='evaluation_details' AND column_name='detail_id') AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='evaluation_details' AND column_name='id') THEN
    EXECUTE 'ALTER TABLE evaluation_details RENAME COLUMN detail_id TO id';
  END IF;
  -- performance_result.result_id -> performance_results.id
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='performance_results' AND column_name='result_id') AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='performance_results' AND column_name='id') THEN
    EXECUTE 'ALTER TABLE performance_results RENAME COLUMN result_id TO id';
  END IF;
  -- program.id is already `id` but table renamed to programs; ensure consistency for other tables like roles/rule remain unchanged

END$$;

BEGIN;

-- 1) Add missing foreign key constraints where source indicated relationships.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_users_role_id') THEN
    EXECUTE 'ALTER TABLE users ADD CONSTRAINT fk_users_role_id FOREIGN KEY (role_id) REFERENCES roles(id)';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_grade_id_students_id') THEN
    EXECUTE 'ALTER TABLE grade ADD CONSTRAINT fk_grade_id_students_id FOREIGN KEY (id) REFERENCES students(id)';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_performance_result_faculty_id') THEN
    EXECUTE 'ALTER TABLE performance_result ADD CONSTRAINT fk_performance_result_faculty_id FOREIGN KEY (faculty_id) REFERENCES teachers(id)';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='performance_result' AND column_name='faculty') THEN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_performance_result_faculty') THEN
      EXECUTE 'ALTER TABLE performance_result ADD CONSTRAINT fk_performance_result_faculty FOREIGN KEY (faculty) REFERENCES teachers(id)';
    END IF;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_classes_teacher_id') THEN
    EXECUTE 'ALTER TABLE classes ADD CONSTRAINT fk_classes_teacher_id FOREIGN KEY (teacher_id) REFERENCES teachers(id)';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_program_teacher_id') THEN
    EXECUTE 'ALTER TABLE program ADD CONSTRAINT fk_program_teacher_id FOREIGN KEY (teacher_id) REFERENCES teachers(id)';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_evaluation_student_id') THEN
    EXECUTE 'ALTER TABLE evaluation ADD CONSTRAINT fk_evaluation_student_id FOREIGN KEY (student_id) REFERENCES students(id)';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_evaluation_faculty_id') THEN
    EXECUTE 'ALTER TABLE evaluation ADD CONSTRAINT fk_evaluation_faculty_id FOREIGN KEY (faculty_id) REFERENCES teachers(id)';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_students_user_id') THEN
    EXECUTE 'ALTER TABLE students ADD CONSTRAINT fk_students_user_id FOREIGN KEY (user_id) REFERENCES users(id)';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_teachers_user_id') THEN
    EXECUTE 'ALTER TABLE teachers ADD CONSTRAINT fk_teachers_user_id FOREIGN KEY (user_id) REFERENCES users(id)';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_evaluation_detail_detail_id') THEN
    EXECUTE 'ALTER TABLE evaluation_detail ADD CONSTRAINT fk_evaluation_detail_detail_id FOREIGN KEY (detail_id) REFERENCES detail(detail_id)';
  END IF;
END$$;

-- 2) Add indexes for common FK columns (safe: IF NOT EXISTS)
CREATE INDEX IF NOT EXISTS idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_class_id ON enrollments(class_id);
CREATE INDEX IF NOT EXISTS idx_classes_teacher_id ON classes(teacher_id);
CREATE INDEX IF NOT EXISTS idx_evaluation_student_id ON evaluation(student_id);
CREATE INDEX IF NOT EXISTS idx_evaluation_faculty_id ON evaluation(faculty_id);
CREATE INDEX IF NOT EXISTS idx_students_user_id ON students(user_id);
CREATE INDEX IF NOT EXISTS idx_teachers_user_id ON teachers(user_id);

-- 3) Make columns NOT NULL when safe (only if no NULL values exist)
DO $$
BEGIN
  IF (SELECT count(*) FROM enrollments WHERE student_id IS NULL) = 0 THEN
    EXECUTE 'ALTER TABLE enrollments ALTER COLUMN student_id SET NOT NULL';
  ELSE
    RAISE NOTICE 'enrollments.student_id contains NULLs; skipping NOT NULL';
  END IF;
  IF (SELECT count(*) FROM enrollments WHERE class_id IS NULL) = 0 THEN
    EXECUTE 'ALTER TABLE enrollments ALTER COLUMN class_id SET NOT NULL';
  ELSE
    RAISE NOTICE 'enrollments.class_id contains NULLs; skipping NOT NULL';
  END IF;
END$$;

-- 4) Optional: normalize timestamp columns to timestamptz if you prefer
-- Example (uncomment to run when you've confirmed it is safe):
-- ALTER TABLE evaluation ALTER COLUMN created_at TYPE timestamptz USING created_at AT TIME ZONE 'UTC';

COMMIT;

-- End of fixes
