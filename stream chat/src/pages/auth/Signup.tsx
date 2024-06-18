import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import useSignup from "@/hooks/useSignup";

const formSchema = z.object({
  fullname: z.string().min(3, {
    message: "Fullname must be at least 3 characters.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be atleast 8 characters",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be atleast 8 characters",
  }),
});

const Signup = () => {
  const { loading, signup } = useSignup();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>, e: any) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    e.preventDefault();
    const data = {
      fullname: values.fullname,
      username: values.username,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    await signup(data);
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center gap-2">
          <span className="text-[#dd0808] text-3xl font-bold">Sign up</span>
          <span className="text-3xl font-bold text-[#ababab]">
            to get started
          </span>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#ababab]">Fullname</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#1f1f1f]"
                      placeholder="John Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#e92d2d]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#ababab]">Username</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#1f1f1f]"
                      placeholder="johndoe@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#e92d2d]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#ababab]">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="bg-[#1f1f1f]"
                      placeholder="your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#e92d2d]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#ababab]">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="bg-[#1f1f1f]"
                      placeholder="confirm your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#e92d2d]" />
                </FormItem>
              )}
            />
            <Button
              className="w-full max-w-md bg-[#dd0808] hover:bg-[#C30A0A] text-white text-lg"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Sign up"
              )}
            </Button>
          </form>
        </Form>
        <div className="flex justify-end gap-2">
          <span className="text-[#ababab]">Already have an account?</span>
          <Link to="/login" className="text-[#dd0808] underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
