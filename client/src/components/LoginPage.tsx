 import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Film } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { loginUser } from "./api/api";
import { LoginPayload } from "../types/api.type";
import { Link } from "react-router-dom";
interface Props {
  onLogin: (data: any) => void;
  onSwitchToSignup: () => void;
}
export function LoginPage({ onLogin, onSwitchToSignup }: Props) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginPayload>();

  const onSubmit = async (data: LoginPayload) => {
    try {
      const res = await loginUser(data);
      localStorage.setItem("user", JSON.stringify(res));
      onLogin(res);
      navigate("/home");
    } catch (err) {
      alert("Login failed!");
      console.error(err);
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
          <div className="flex gap-2">
            <Link to="/signup">
              <Button
                variant="ghost"
                onClick={onSwitchToSignup}
                className="text-white hover:bg-white/10 text-sm sm:text-base"
              >
                Sign Up
              </Button>
            </Link>
            <Link to="/login">
              <Button className="bg-purple-600 hover:bg-purple-700 text-sm sm:text-base">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ✅ Left Image Section (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1739433437912-cca661ba902f?w=1200"
          alt="Cinema"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-black/80 justify-center"></div>
        <div className="relative z-10 flex flex-col justify-center px-10">
          <h2 className="text-white text-4xl font-bold leading-tight">
         
          </h2>
        </div>
      </div>

      {/* ✅ Right Form Section (Fully Responsive) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 pt-24 pb-10 sm:px-8">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20 p-6 sm:p-8 rounded-2xl">

          <div className="text-center mb-6">
            <h2 className="text-white text-2xl sm:text-3xl font-bold mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-300 text-sm sm:text-base">
              Login to book your favorite movies
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">

            {/* Email */}
            <div>
              <Label className="text-white text-sm sm:text-base">Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
                className="bg-white/20 border-white/30 text-white mt-2 h-11 text-sm sm:text-base"
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
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
                className="bg-white/20 border-white/30 text-white mt-2 h-11 text-sm sm:text-base"
              />
              {errors.password && (
                <p className="text-red-400 text-xs sm:text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 hover:bg-purple-700 h-11 text-sm sm:text-base font-semibold"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-300 text-sm sm:text-base">
              Don't have an account?{" "}
              <Link to="/signup">
                <button
                  onClick={onSwitchToSignup}
                  className="text-purple-400 underline font-medium"
                >
                  Create Account
                </button>
              </Link>
            </p>
          </div>

        </Card>
      </div>
    </div>
  );
}
