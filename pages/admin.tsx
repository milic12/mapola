"use client";
import nookies from "nookies";
import { firebaseAdmin } from "@/lib/firebase/firebaseAdmin";
import { GetServerSidePropsContext } from "next";

import Admin from "@/components/admin/Admin";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);

    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email } = token;

    return {
      props: { message: `Welcome ${email}` },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/sign-in",
      },
      props: {} as never,
    };
  }
};

const AdminPage = (props: any) => {
  return <Admin props={props} />;
};

export default AdminPage;
