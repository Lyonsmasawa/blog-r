import React, { useEffect, useRef } from "react";

export const MarkDownHint = () => {
  const containerRef = useRef();

  const mdRules = [
    { title: "From h1 to h6", rule: "# Heading -> ###### Heading" },
    { title: "Blockquote", rule: "> Your Quote" },
    { title: "Image", rule: "![image alt](http://image_url.com)" },
    { title: "Link", rule: "[Link Text](http://your_link.com)" },
  ];

  useEffect(() => {
    containerRef.current?.classList.remove("-translate-y-5", "opacity-0");
    containerRef.current?.classList.add("translate-y-0", "opacity-1");
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-white rounded px-2 py-4 -translate-y-5 opacity-0 transition duration-300"
    >
      <h1 className="font-semibold text-center ">General markdown rules</h1>
      <ul className="space-y-2">
        {mdRules?.map(({ title, rule }) => {
          return (
            <li key={title}>
              <p className="font-semibold text-gray-500">{title}</p>
              <p className="font-semibold text-gray-700 pl-2 font-mono">
                {rule}
              </p>
            </li>
          );
        })}
        <li className="text-center text-blue-500">
          <a
            href="https://www.markdownguide.org/basic-syntax/"
            target="_blank"
            rel="noreferrer"
          >
            Find out more
          </a>
        </li>
      </ul>
    </div>
  );
};
