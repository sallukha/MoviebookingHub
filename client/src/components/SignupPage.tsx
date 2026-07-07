 import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Film } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { signupUser } from "./api/api";
import { SignupPayload } from "../types/api.type";
import { Link } from "react-router-dom";

interface SignupForm extends SignupPayload {
  confirmPassword: string;
}

export function SignupPage({
  onSwitchToLogin,
}: {
  onSwitchToLogin: () => void;
}) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>();

  const password = watch("password");

  const onSubmit = async (data: SignupForm) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await signupUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      alert(res.message || "Account created successfully!");
      navigate("/home");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-black">

      {/* ✅ Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <Film className="w-6 h-6 text-purple-400" />
            <h1 className="text-white text-lg sm:text-xl font-semibold">
              Bookify Cinema
            </h1>
          </div>

          <Link to="/login">
            <Button
              variant="ghost"
              onClick={onSwitchToLogin}
              className="text-white hover:bg-white/10 text-sm sm:text-base"
            >
              Login
            </Button>
          </Link>
        </div>
      </div>

      {/* ✅ Left Image Section (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1739433437912-cca661ba902f?w=1200"
          alt="Cinema"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-black/80"></div>
      </div>

      {/* ✅ Right Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 pt-24 pb-10 sm:px-8">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20 p-6 sm:p-8 rounded-2xl">

          <h2 className="text-white text-2xl sm:text-3xl font-bold mb-6 text-center">
            Create Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">

            {/* Name */}
            <div>
              <Label className="text-white text-sm sm:text-base">Full Name</Label>
              <Input
                {...register("name", { required: "Name is required" })}
                className="bg-white/20 border-white/30 text-white mt-2 h-11 text-sm sm:text-base"
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="text-red-400 text-xs sm:text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label className="text-white text-sm sm:text-base">Email</Label>
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email",
                  },
                })}
                className="bg-white/20 border-white/30 text-white mt-2 h-11 text-sm sm:text-base"
                placeholder="Your Email"
              />
              {errors.email && (
                <p className="text-red-400 text-xs sm:text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label className="text-white text-sm sm:text-base">Password</Label>
              <Input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Min 6 characters",
                  },
                })}
                className="bg-white/20 border-white/30 text-white mt-2 h-11 text-sm sm:text-base"
                placeholder="••••••"
              />
              {errors.password && (
                <p className="text-red-400 text-xs sm:text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Label className="text-white text-sm sm:text-base">
                Confirm Password
              </Label>
              <Input
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="bg-white/20 border-white/30 text-white mt-2 h-11 text-sm sm:text-base"
                placeholder="••••••"
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs sm:text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 hover:bg-purple-700 h-11 text-sm sm:text-base font-semibold"
            >
              {isSubmitting ? "Creating..." : "Create Account"}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-300 mt-6 text-sm sm:text-base">
            Already have an account?{" "}
            <Link to="/login">
              <span
                onClick={onSwitchToLogin}
                className="text-purple-400 underline font-medium cursor-pointer"
              >
                Login here
              </span>
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
