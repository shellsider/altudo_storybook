import { FC, ElementType } from "react";

export type TextField = { value: string };
export type RichTextField = { value: string };
export type ImageField = { value: { src: string; alt: string } };
export type LinkField = { value: { href: string; text: string } };

export type ComponentParams = Record<string, any>;
export type ComponentRendering = Record<string, any>;

interface TextProps {
  field?: TextField;
  tag?: ElementType;
  className?: string;
}

interface RichTextProps {
  field?: RichTextField;
  className?: string;
}

interface ImageProps {
  field?: ImageField;
  className?: string;
  editable?: boolean;
  priority?: boolean;
}

interface LinkProps {
  field?: LinkField;
  className?: string;
  editable?: boolean;
}

export const Text: FC<TextProps> = ({
  field,
  tag: Tag = "span",
  className,
}) => <Tag className={className}>{field?.value || "Mock Text"}</Tag>;

export const RichText: FC<RichTextProps> = ({ field, className }) => (
  <div
    className={className}
    dangerouslySetInnerHTML={{ __html: field?.value || "Mock RichText" }}
  />
);

export const Image: FC<ImageProps> = ({ field, className }) => (
  <img
    src={field?.value?.src || "https://via.placeholder.com/800x400"}
    alt={field?.value?.alt || "Mock Image"}
    className={className}
  />
);

export const Link: FC<LinkProps> = ({ field, className }) => (
  <a href={field?.value?.href || "#"} className={className}>
    {field?.value?.text || "Mock Link"}
  </a>
);
