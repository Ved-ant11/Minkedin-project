import { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  FileText,
  AlertCircle,
  UserPlus,
} from "lucide-react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

 
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.5,
        staggerChildren: 0.08,
      },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
    
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent_50%)]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md"
      >
       
        <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl shadow-2xl overflow-hidden">
          
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800/20 to-transparent pointer-events-none" />

          <div className="relative p-8">
            
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-slate-300" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-100 mb-2">
                Register
              </h2>
              <p className="text-slate-400 text-sm">
                Create your account to get started
              </p>
            </motion.div>

            
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6"
              >
                <Alert className="border-red-500/20 bg-red-500/10">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-300 text-sm">
                    {error}
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            
            <motion.form
              variants={formVariants}
              initial="hidden"
              animate="visible"
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              
              <motion.div variants={fieldVariants} className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-slate-300 text-sm font-medium"
                >
                  Name
                </Label>
                <div className="relative">
                  <User
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
                      focusedField === "name"
                        ? "text-slate-300"
                        : "text-slate-500"
                    }`}
                  />
                  <input
                    required
                    placeholder="Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-10 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-600/20 transition-all duration-200"
                  />
                </div>
              </motion.div>

            
              <motion.div variants={fieldVariants} className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-slate-300 text-sm font-medium"
                >
                  Email
                </Label>
                <div className="relative">
                  <Mail
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
                      focusedField === "email"
                        ? "text-slate-300"
                        : "text-slate-500"
                    }`}
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-10 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-600/20 transition-all duration-200"
                  />
                </div>
              </motion.div>

             
              <motion.div variants={fieldVariants} className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-slate-300 text-sm font-medium"
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
                      focusedField === "password"
                        ? "text-slate-300"
                        : "text-slate-500"
                    }`}
                  />
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-10 pr-10 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-600/20 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </motion.div>

              
              <motion.div variants={fieldVariants} className="space-y-2">
                <Label
                  htmlFor="bio"
                  className="text-slate-300 text-sm font-medium"
                >
                  Bio
                </Label>
                <div className="relative">
                  <FileText
                    className={`absolute left-3 top-3 w-4 h-4 transition-colors duration-200 ${
                      focusedField === "bio"
                        ? "text-slate-300"
                        : "text-slate-500"
                    }`}
                  />
                  <textarea
                    placeholder="Bio"
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("bio")}
                    onBlur={() => setFocusedField(null)}
                    rows={3}
                    className="w-full pl-10 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-slate-600 focus:ring-2 focus:ring-slate-600/20 transition-all duration-200 resize-none"
                  />
                </div>
              </motion.div>

              
              <motion.div variants={fieldVariants}>
                <Button
                  type="submit"
                  className="w-full bg-slate-100 hover:bg-white text-slate-900 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-slate-100/10"
                >
                  Register
                </Button>
              </motion.div>
            </motion.form>

            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 pt-6 border-t border-slate-800/50 text-center"
            >
              <p className="text-slate-400 text-sm">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-slate-300 hover:text-slate-100 font-medium transition-colors duration-200"
                >
                  Sign in
                </button>
              </p>
            </motion.div>
          </div>
        </div>

       
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-slate-600/5 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-slate-700/5 rounded-full blur-3xl -z-10" />
      </motion.div>
    </div>
  );
}

export default Register;
