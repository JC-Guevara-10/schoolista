-- Row Level Security policies for Olopsc schema
-- Enable RLS on each table and create policies for common roles:
-- - Owner: the user who owns the row (mapped via users.id -> auth.uid())
-- - Admins: users with role name 'admin' (checked via users.role_id -> roles.name)
-- - Teachers: users who have a teachers row linked to their user_id
-- - Students: users who have a students row linked to their user_id
-- Notes: service role bypasses RLS. Adjust role names as needed.

-- Helper: admin check used in multiple policies
-- (We use EXISTS join to check the role name in users->roles)

-- USERS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_owner_select" ON users FOR SELECT
  USING (id = auth.uid()::uuid);
CREATE POLICY "users_owner_insert" ON users FOR INSERT
  WITH CHECK (id = auth.uid()::uuid);
CREATE POLICY "users_owner_update" ON users FOR UPDATE
  USING (id = auth.uid()::uuid)
  WITH CHECK (id = auth.uid()::uuid);
CREATE POLICY "users_owner_delete" ON users FOR DELETE
  USING (id = auth.uid()::uuid);
CREATE POLICY "users_admin_select" ON users FOR SELECT
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "users_admin_insert" ON users FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "users_admin_update" ON users FOR UPDATE
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "users_admin_delete" ON users FOR DELETE
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "users_public_select" ON users FOR SELECT
  USING (TRUE); -- allow public select of non-sensitive fields if needed; otherwise remove

-- STUDENTS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
CREATE POLICY "students_owner" ON students FOR SELECT USING (user_id = auth.uid()::uuid);
CREATE POLICY "students_owner_insert" ON students FOR INSERT
  WITH CHECK (user_id = auth.uid()::uuid);
CREATE POLICY "students_owner_update" ON students FOR UPDATE
  USING (user_id = auth.uid()::uuid)
  WITH CHECK (user_id = auth.uid()::uuid);
CREATE POLICY "students_owner_delete" ON students FOR DELETE
  USING (user_id = auth.uid()::uuid);
CREATE POLICY "students_admin_teacher_view" ON students FOR SELECT
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name IN ('admin','teacher')));
CREATE POLICY "students_admin_select" ON students FOR SELECT
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "students_admin_insert" ON students FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "students_admin_update" ON students FOR UPDATE
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "students_admin_delete" ON students FOR DELETE
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));

-- TEACHERS
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "teachers_owner_select" ON teachers FOR SELECT
  USING (user_id = auth.uid()::uuid);
CREATE POLICY "teachers_owner_insert" ON teachers FOR INSERT
  WITH CHECK (user_id = auth.uid()::uuid);
CREATE POLICY "teachers_owner_update" ON teachers FOR UPDATE
  USING (user_id = auth.uid()::uuid)
  WITH CHECK (user_id = auth.uid()::uuid);
CREATE POLICY "teachers_owner_delete" ON teachers FOR DELETE
  USING (user_id = auth.uid()::uuid);
CREATE POLICY "teachers_admin_select" ON teachers FOR SELECT
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "teachers_admin_insert" ON teachers FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "teachers_admin_update" ON teachers FOR UPDATE
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "teachers_admin_delete" ON teachers FOR DELETE
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));

-- ADMINS (administrative accounts)
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins_admin_select" ON admins FOR SELECT
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "admins_admin_insert" ON admins FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "admins_admin_update" ON admins FOR UPDATE
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "admins_admin_delete" ON admins FOR DELETE
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));

-- ROLES and RULES (readable by authenticated users, writable only by admin)
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "roles_select_auth" ON roles FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "roles_admin_select" ON roles FOR SELECT
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "roles_admin_insert" ON roles FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "roles_admin_update" ON roles FOR UPDATE
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "roles_admin_delete" ON roles FOR DELETE
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_catalog.pg_tables WHERE tablename = 'rules') THEN
    ALTER TABLE rules ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "rules_select_auth" ON rules FOR SELECT USING (auth.role() = 'authenticated');
    CREATE POLICY "rules_admin_select" ON rules FOR SELECT
      USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
    CREATE POLICY "rules_admin_insert" ON rules FOR INSERT
      WITH CHECK (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
    CREATE POLICY "rules_admin_update" ON rules FOR UPDATE
      USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'))
      WITH CHECK (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
    CREATE POLICY "rules_admin_delete" ON rules FOR DELETE
      USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
  END IF;
END
$$;

-- CLASSES
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "classes_public_select" ON classes FOR SELECT USING (TRUE);
CREATE POLICY "classes_teacher_insert" ON classes FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM teachers t WHERE t.user_id = auth.uid()::uuid AND t.id = classes.teacher_id));
CREATE POLICY "classes_teacher_update" ON classes FOR UPDATE
  USING (EXISTS (SELECT 1 FROM teachers t WHERE t.user_id = auth.uid()::uuid AND t.id = classes.teacher_id))
  WITH CHECK (EXISTS (SELECT 1 FROM teachers t WHERE t.user_id = auth.uid()::uuid AND t.id = classes.teacher_id));
CREATE POLICY "classes_teacher_delete" ON classes FOR DELETE
  USING (EXISTS (SELECT 1 FROM teachers t WHERE t.user_id = auth.uid()::uuid AND t.id = classes.teacher_id));
CREATE POLICY "classes_admin_select" ON classes FOR SELECT
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "classes_admin_insert" ON classes FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "classes_admin_update" ON classes FOR UPDATE
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "classes_admin_delete" ON classes FOR DELETE
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));

-- ENROLLMENTS
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "enrollments_student_manage" ON enrollments FOR INSERT
  USING (EXISTS (SELECT 1 FROM students s WHERE s.user_id = auth.uid()::uuid AND s.id = enrollments.student_id))
  WITH CHECK (EXISTS (SELECT 1 FROM students s WHERE s.user_id = auth.uid()::uuid AND s.id = enrollments.student_id));
CREATE POLICY "enrollments_student_view" ON enrollments FOR SELECT
  USING (EXISTS (SELECT 1 FROM students s WHERE s.user_id = auth.uid()::uuid AND s.id = enrollments.student_id));
CREATE POLICY "enrollments_admin_select" ON enrollments FOR SELECT
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "enrollments_admin_insert" ON enrollments FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "enrollments_admin_update" ON enrollments FOR UPDATE
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "enrollments_admin_delete" ON enrollments FOR DELETE
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));

-- EVALUATIONS and DETAILS
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "evaluations_admin_teacher_view" ON evaluations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'
    )
    OR
    EXISTS (
      SELECT 1 FROM teachers t WHERE t.user_id = auth.uid()::uuid AND t.id = evaluations.faculty_id
    )
    OR
    EXISTS (
      SELECT 1 FROM students s WHERE s.user_id = auth.uid()::uuid AND s.id = evaluations.student_id
    )
  );
CREATE POLICY "evaluations_admin_select" ON evaluations FOR SELECT
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "evaluations_admin_insert" ON evaluations FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "evaluations_admin_update" ON evaluations FOR UPDATE
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "evaluations_admin_delete" ON evaluations FOR DELETE
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));

ALTER TABLE details ENABLE ROW LEVEL SECURITY;
CREATE POLICY "details_referenced_view" ON details FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM evaluations e WHERE e.id = details.evaluation_id AND (
      EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin')
      OR EXISTS (SELECT 1 FROM teachers t WHERE t.user_id = auth.uid()::uuid AND t.id = details.faculty_id)
    ))
  );

-- EVALUATION_DETAILS
ALTER TABLE evaluation_details ENABLE ROW LEVEL SECURITY;
CREATE POLICY "evaluation_details_view" ON evaluation_details FOR SELECT
  USING (EXISTS (SELECT 1 FROM details d WHERE d.id = evaluation_details.detail_id));
CREATE POLICY "evaluation_details_admin_select" ON evaluation_details FOR SELECT
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "evaluation_details_admin_insert" ON evaluation_details FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "evaluation_details_admin_update" ON evaluation_details FOR UPDATE
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "evaluation_details_admin_delete" ON evaluation_details FOR DELETE
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));

-- GRADES
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
-- If grades.id references students.id, allow student access to their own grades
CREATE POLICY "grades_student_view" ON grades FOR SELECT
  USING (id IN (SELECT s.id FROM students s WHERE s.user_id = auth.uid()::uuid));
CREATE POLICY "grades_teacher_admin_select" ON grades FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin')
    OR
    EXISTS (SELECT 1 FROM teachers t WHERE t.user_id = auth.uid()::uuid)
  );
CREATE POLICY "grades_teacher_admin_insert" ON grades FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin')
    OR EXISTS (SELECT 1 FROM teachers t WHERE t.user_id = auth.uid()::uuid)
  );
CREATE POLICY "grades_teacher_admin_update" ON grades FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin')
    OR
    EXISTS (SELECT 1 FROM teachers t WHERE t.user_id = auth.uid()::uuid)
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin')
    OR EXISTS (SELECT 1 FROM teachers t WHERE t.user_id = auth.uid()::uuid)
  );
CREATE POLICY "grades_teacher_admin_delete" ON grades FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin')
    OR EXISTS (SELECT 1 FROM teachers t WHERE t.user_id = auth.uid()::uuid)
  );

-- PERFORMANCE_RESULTS
ALTER TABLE performance_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "performance_results_view" ON performance_results FOR SELECT
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name IN ('admin','teacher')));
CREATE POLICY "performance_results_admin_select" ON performance_results FOR SELECT
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "performance_results_admin_insert" ON performance_results FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "performance_results_admin_update" ON performance_results FOR UPDATE
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "performance_results_admin_delete" ON performance_results FOR DELETE
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));

-- PROGRAMS
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "programs_public_select" ON programs FOR SELECT USING (TRUE);
CREATE POLICY "programs_admin_select" ON programs FOR SELECT
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "programs_admin_insert" ON programs FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "programs_admin_update" ON programs FOR UPDATE
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "programs_admin_delete" ON programs FOR DELETE
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));

-- SUBJECTS
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "subjects_public_select" ON subjects FOR SELECT USING (TRUE);
CREATE POLICY "subjects_admin_select" ON subjects FOR SELECT
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "subjects_admin_insert" ON subjects FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "subjects_admin_update" ON subjects FOR UPDATE
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));
CREATE POLICY "subjects_admin_delete" ON subjects FOR DELETE
  USING (EXISTS (SELECT 1 FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = auth.uid()::uuid AND r.name = 'admin'));

-- NOTES & NEXT STEPS
-- 1) Review role names in `roles` table (we use 'admin' and 'teacher' strings here).
-- 2) If you use a custom claim for role in JWT, adapt checks accordingly.
-- 3) To apply these policies: run this SQL against your database (preferably in a staging environment), verify behavior, and then apply in production.
-- 4) If some tables should be fully private (no public select), remove the `USING (TRUE)` policies and restrict selects to owners/admins only.

-- End of policies
