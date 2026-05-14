"use server";
import { createClient } from "@/lib/supabase/server";

interface AuthForm {
  name?: string;
  mode: "signin" | "signup";
  email: string;
  password: string;
  gender?: string;
  birthDate?: string;
  address?: string;
  contactNumber?: string;
  studentNumber?: string;
}

export async function authAction(
  authForm: AuthForm,
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();

    const { name, mode, email, password } = authForm;

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: "STUDENT",
          },
        },
      });

      if (error) {
        console.log(error);
        return {
          success: false,
          error:
            "An unexpected error occurred while signing up. Please try again.",
        };
      }

      // Check if user is null, return error if it is
      const user = data.user;
      if (!user) return { success: false, error: "No user returned." };

      // insert or upsert into `users`
      const userRow = {
        id: user.id,
        email,
        role_id: "d6182c0c-d1c8-4c15-9a3b-882db19de988",
      };
      const { error: usersError } = await supabase
        .from("users")
        .upsert(userRow, { onConflict: "id" });
      if (usersError) {
        console.error("users upsert error", usersError.message);
        return { success: false, error: usersError.message };
      }

      // insert student profile
      const studentRow = {
        user_id: user.id,
        student_number: authForm.studentNumber || null,
        full_name: name || null,
        created_at: new Date().toISOString(),
        email: email,
        contact_number: authForm.contactNumber
          ? Number(authForm.contactNumber)
          : null,
        birth_date: authForm.birthDate || null,
        address: authForm.address || null,
        gender: authForm.gender || null,
      };

      const { error: studentsError } = await supabase
        .from("students")
        .insert(studentRow);
      if (studentsError) {
        // log and continue — user was created in auth; application data can be retried
        return { success: false, error: studentsError.message };
      }

      return { success: true };
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.log(error);
        return {
          success: false,
          error:
            "An unexpected error occurred while signing in. Please try again.",
        };
      }
      return { success: true };
    }
  } catch (err) {
    console.error("Error inserting profile rows", err);
    return { success: false, error: "An error occurred" };
  }
}
