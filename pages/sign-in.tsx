"use client";
import { useState } from "react";
import { signIn } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import SignIn from "@/components/signIn/SignIn";

const SignInPage = () => {
  return <SignIn />;
};

export default SignInPage;
