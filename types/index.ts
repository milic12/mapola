import * as L from "leaflet";
import {
  ComponentParams,
  ComponentRendering,
  Field,
} from "@sitecore-jss/sitecore-jss-nextjs";
export interface Products {
  _id: number;
  image: any;
  metaImage: any;
  name: string;
  price: number;
  priceRange: string;
  type: string;
  details: string;
  reviews: number;
  stars: number;
  slug: {
    current: string;
    _type: string;
  };
  quantity: number;
  quantityAdded: number;
  description: [];
  dimensions: {
    first: boolean;
    second: boolean;
    third: boolean;
    forth: boolean;
    fifth: boolean;
  };
  firstOne: boolean;
  key: number;
}

export interface BannerData {
  image: [];

  slug: {
    current: string;
    _type: string;
  };

  smallText: string;

  metaImage: any;

  buttonText: string;

  product: string;

  desc: string;

  midText: string;

  largeText1: string;

  largeText2: string;

  discount: number;

  saleTime: string;
}

export interface FooterData {
  image: string | null;

  metaImage: any;

  smallText: string;

  buttonText: string;

  product: string;

  desc: string;

  midText: string;

  largeText1: string;

  largeText2: string;

  discount: number;

  saleTime: string;
}

export interface IMapLocation {
  lat: number;
  lng: number;
}

type ComponentProps = {
  rendering: ComponentRendering;
  params: ComponentParams;
};
export type ContactUsFormProps = ComponentProps & {
  // fields: {
  //   emailRecipient: Field<string>;
  //   successMessage: Field<string>;
  //   emailSubject: Field<string>;
  // };
  fields: {
    emailRecipient: string;
    successMessage: string;
    emailSubject: string;
  };
};

export interface PersonalMapFormProps {
  selectFrame: string;
  frontSideText: string;
  backSideText: string;
  portraitDimensions: string;
  setSelectFrame: React.Dispatch<React.SetStateAction<string>>;
  setFrontSideText: React.Dispatch<React.SetStateAction<string>>;
  setBackSideText: React.Dispatch<React.SetStateAction<string>>;
  setPortraitDimensions: React.Dispatch<React.SetStateAction<string>>;
  screenShotImage: string;
  position: L.LatLng | null;
  zoomLevel: number;
}
