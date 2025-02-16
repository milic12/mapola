import Stripe from "stripe";
import type { NextApiRequest, NextApiResponse } from "next";
import { Products } from "@/types";
// @ts-ignore
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("stripe:", req.body);
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "required",
        shipping_options: [{ shipping_rate: "shr_1MznIuCNovgkJFhx0whTGh3T" }],
        line_items: req.body.map((item: Products) => {
          const img = item.metaImage.url;

          return {
            price_data: {
              currency: "eur",
              product_data: {
                name: item.name,
                images: [img],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantityAdded,
          };
        }),
        success_url: `${req.headers.origin}/successful-payment`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      };
      //@ts-ignore
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
