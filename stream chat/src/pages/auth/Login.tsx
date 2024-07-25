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
import useLogin from "@/hooks/useLogin";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be atleast 8 characters",
  }),
});

const Signup = () => {
  const { loading, login } = useLogin();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>, e: any) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    e.preventDefault();
    const data = {
      username: values.username,
      password: values.password,
    };

    await login(data);
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center gap-2">
          <span className="text-[#dd0808] text-3xl font-bold">Login</span>
          <span className="text-3xl font-bold text-[#ababab]">and enjoy</span>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#ababab]">Username</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#1f1f1f] text-gray-300 placeholder-[#ababab]"
                      placeholder="username"
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
                      className="bg-[#1f1f1f] text-gray-300 placeholder-[#ababab]"
                      placeholder="your password"
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
                "Login"
              )}
            </Button>
          </form>
        </Form>
        <div className="flex justify-end gap-2">
          <span className="text-[#ababab]">Don't have an account?</span>
          <Link to="/signup" className="text-[#dd0808]">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
