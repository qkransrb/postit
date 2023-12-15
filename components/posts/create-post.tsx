"use client";

import { useRouter } from "next/navigation";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});

const CreatePost = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(`${window.location.origin}/api/posts`, {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        form.reset();
        router.push(`/posts/${data.post.id}`);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto py-10">
      <h2 className="text-3xl font-semibold text-gray-900 mb-10">
        Create Post
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-screen-sm mx-auto space-y-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 font-medium">
                  Title
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 font-medium">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={10}
                    className="resize-none"
                    {...field}
                  ></Textarea>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreatePost;
