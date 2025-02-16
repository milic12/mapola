import { SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

import { createClient, type ClientConfig } from "@sanity/client";

const config: ClientConfig = {
  projectId: "ue6hcxll",
  dataset: "production",
  apiVersion: "2023-03-18",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
};

export const client = createClient(config);

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);
