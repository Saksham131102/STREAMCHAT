import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import useJoinRoom from "@/hooks/useJoinRoom";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be atleast 8 characters",
  }),
});

const JoinRoom = () => {
  const { loading, joinRoom } = useJoinRoom();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const data = {
      name: values.name,
      password: values.password,
    };

    await joinRoom(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#494949] hover:bg-[#383838] h-20 md:my-10 p-10 text-white text-lg md:text-2xl rounded-lg">
          Join a Room
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-[#ababab]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-[#dd0808]">
            Join a Room
          </DialogTitle>
          <DialogDescription className="">
            Enter 'name' and 'password' to join the room
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel className="text-[#ababab]">
                      Name of the Room
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-[#1f1f1f] text-gray-300 placeholder-[#ababab]"
                        placeholder="room name"
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
                  <FormItem className="mb-8">
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

              <div className="flex justify-end">
                <Button
                  className="w-1/3 max-w-md bg-[#dd0808] hover:bg-[#C30A0A] text-white text-lg"
                  type="submit"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Join"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JoinRoom;
