import React from "react";
import markdownit from "markdown-it";
import DOMPurify from "dompurify";

type Props = {
  content: string;
};

const md = markdownit({});

const Markdown = ({ content }: Props) => {
  const htmlcontent = md.render(content);
  const sanitized = DOMPurify.sanitize(htmlcontent);
  return <div dangerouslySetInnerHTML={{ __html: sanitized }}></div>;
};

export default Markdown;
