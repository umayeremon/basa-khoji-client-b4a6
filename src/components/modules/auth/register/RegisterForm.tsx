"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import { toast } from "sonner";
import { registrationValidation } from "./registrationValidation";
import Logo from "@/app/assets/Logo";
import { registerUser } from "@/services/AuthServices";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(registrationValidation),
  });
  const router = useRouter();
  const {
    formState: { isSubmitting },
  } = form;
  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Registering....");
    try {
      const res = await registerUser(data);
      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else {
        toast.success(res?.message, {
          id: toastId,
        });
        router.push("/");
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="max-w-lg w-full flex-grow bg-[#f6f6f6] rounded-md p-8">
      <Logo />
      <div className="space-y-4">
        <div className="flex items-center justify-center mt-2">
          <h1 className="text-3xl font-semibold">Create Account</h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-8">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">User Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          className="rounded-2xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Select Role</FormLabel>
                      <div className="flex gap-4 mt-1">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            {...field}
                            value="tenant"
                            checked={field.value === "tenant"}
                            className="h-4 w-4"
                          />
                          Tenant
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            {...field}
                            value="landlord"
                            checked={field.value === "landlord"}
                            className="h-4 w-4"
                          />
                          Landlord
                        </label>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      type="email"
                      className="rounded-2xl"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      type="number"
                      className="rounded-2xl"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          type="password"
                          className="rounded-2xl"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="passwordConfirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          type="password"
                          className="rounded-2xl"
                        />
                      </FormControl>
                      {passwordConfirm && password !== passwordConfirm ? (
                        <FormMessage> Password does not match </FormMessage>
                      ) : (
                        <FormMessage />
                      )}
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button
              disabled={
                (passwordConfirm && password !== passwordConfirm) as boolean
              }
              type="submit"
              className="w-full rounded-2xl">
              {isSubmitting ? "Registering...." : "Sign Up"}
            </Button>
          </form>
        </Form>
        <div className="text-center space-y-4">
          <p className="text-sm">
            Already have an account?{" "}
            <Link href="/login" className="cursor-pointer">
              <strong>Sign In</strong>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
