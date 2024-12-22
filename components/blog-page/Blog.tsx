"use client";
import {
  formatDate,
  replaceWordToSpan,
  splitTextIntoWords,
} from "@/lib/utils";
import { useRouter } from "next/navigation";
import type { Post } from "@ts-ghost/content-api";

const Blog = ({ blog }: { blog: Post }) => {
  const route = useRouter();

  const { title, slug, primary_author, html, published_at } = blog;

  const {
    value: dateValue,
    title: dateTitle,
    datetime,
  } = formatDate(published_at) || {};

  // [Explain] Thay đổi link ảnh có trong nội dung post từ localhost sang domain của mình vì thực tế ghostcms đang được host trên local và public bằng cloudflare tunnel
  const formatedHtml = html
    ? `<div class='space-y-4'>${html.replaceAll(
        "http://localhost:8080",
        "https://ghost.kienttt.site"
      )}</div>`
    : "";

  const dangerouslySetPostHTML = { __html: formatedHtml };

  const exportToPdf = async () => {
    const html2pdf = await require("html2pdf.js");
    // const article = document.querySelector("#blog")?.cloneNode(true) as HTMLElement;
    const article = document.getElementById("blog");

    if (article) {
      // Trích xuất tất cả innerText của thẻ <p> trong article mà không có id "author"
      const pTags = Array.from(article.querySelectorAll("p")).filter(
        (pTag) => pTag.id !== "author"
      );

      // Tách các thẻ <p> thành từng thẻ <span> chứa mỗi chữ trong thẻ <p>
      pTags.forEach((pTag) => {
        const html = pTag.innerHTML;
        // 1. Lấy innerText của thẻ <p>
        const text = pTag.innerText;

        // 2. Tách innerText thành từng từ
        const wordSpans = splitTextIntoWords(text);

        // 3. Thay thế từng từ bằng thẻ <span> chứa từng từ
        for (let i = 0; i < wordSpans.length; i++) {
          const span = document.createElement("span");
          span.innerHTML = wordSpans[i];

          pTag.innerHTML = replaceWordToSpan(
            pTag.innerHTML,
            wordSpans[i],
            span.outerHTML
          );
        }

        // 4. Thay thể innerHTML cũ bằng innerHTML mới
        article.innerHTML = article.innerHTML.replace(
          html,
          pTag.innerHTML.trim()
        );
      });

      const options = {
        margin: 16,
        filename: `${slug}.pdf`,
        jsPDF: {
          format: "a4",
          orientation: "portrait",
        },
        pagebreak: { avoid: "span"},
        compressPDF: true,
        // [Explain] "useCORS: true" dùng để tránh lỗi mất hình ảnh khi xuất pdf
        html2canvas: { useCORS: true },
      };

      html2pdf().from(article).set(options).save();
    }
  };

  return (
    <>
      {/* Thẻ main là bài blog + phần comment */}
      <main 
      className="pt-8 pb-16 lg:pt-24 lg:pb-24 text-white antialiased font-gotham-book">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
          {/* Style padding `p-1` của thẻ <article> dùng để tránh lỗi nội dung pdf bị cắt xén ở cuối. */}
          <article
            className="mx-auto w-full max-w-2xl lg:format-lg space-y-4 p-1"
            id="blog"
          >
            <header className="mb-4 lg:mb-6">
              {/* Back button */}
              {/* Prop data-html2canvas-ignore dùng để tránh thẻ đó bị xuất thành pdf */}
              <div className="mb-4" data-html2canvas-ignore>
                <button
                  type="button"
                  className="flex items-center p-2 text-white bg-green hover:underline"
                  onClick={() => route.back()}
                >
                  Back
                </button>
              </div>
              {/* Tựa bài blog */}
              <h1 className="mb-4 text-3xl font-extrabold leading-tight lg:mb-6 font-conthrax-bold">
                {title.toUpperCase()}
              </h1>
              <p id="author">
                <i>
                  By <b>{primary_author ? primary_author.name : "Anonymous"}</b>
                </i>{" "}
                on{" "}
                <time dateTime={datetime} title={dateTitle}>
                  {dateValue}
                </time>
              </p>
            </header>
            {/* Nội dung bài blog */}
            {/* [Explain] Để áp dụng style cho các thẻ html trong nội dung bài viết thì cần khai báo style ở global.css, nhưng nếu làm vậy các style ở tất cả các trang khác sẽ bị ảnh hưởng. 
            Vì thế chưa có cách nào khác để áp dụng style cho nội dung bài viết*/}
            {formatedHtml && (
              <div dangerouslySetInnerHTML={dangerouslySetPostHTML}></div>
            )}

            {/* Export to PDF button */}
            <section data-html2canvas-ignore>
              <div className="mt-8">
                <button
                  type="button"
                  className="flex items-center p-2 text-white bg-green hover:underline"
                  onClick={() => exportToPdf()}
                >
                  Export to PDF
                </button>
              </div>
            </section>
          </article>
        </div>
      </main>
      {/* Footer của trang */}
      <footer className="p-4 bg-white sm:p-6 dark:bg-gray-800 font-gotham-book">
        <div className="mx-auto max-w-screen-xl">
          <div className="md:flex md:justify-between">
            {/* Logo của công ty */}
            <div className="mb-6 md:mb-0">
              <a href="https://fls-group.com" className="flex items-center">
                <img
                  src="/fls-logo.webp"
                  className="mr-3 h-16"
                  alt="FLS Group Logo"
                />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              {/* Tài nguyên của công ty */}
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Resources
                </h2>
                <ul className="text-gray-600 dark:text-gray-400">
                  <li className="mb-4">
                    <a href="https://fls-group.com" className="footer-link">
                      FLS Group
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="https://fls-group.com/who-we-are"
                      className="footer-link"
                    >
                      Who we are
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://fls-group.com/capabilities"
                      className="footer-link"
                    >
                      Capabilities
                    </a>
                  </li>
                </ul>
              </div>
              {/* Thông tin liên hệ */}
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Follow us
                </h2>
                <ul className="text-gray-600 dark:text-gray-400">
                  <li className="mb-4">
                    <a
                      href="https://www.linkedin.com/company/flsgroup/"
                      className="footer-link "
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="https://www.facebook.com/FLSGroup1993"
                      className="footer-link"
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/c/FLSGroup"
                      className="footer-link"
                    >
                      Youtube
                    </a>
                  </li>
                </ul>
              </div>
              {/* Chính sách */}
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Legal
                </h2>
                <ul className="text-gray-600 dark:text-gray-400">
                  <li className="mb-4">
                    <a
                      href="https://fls-group.com/privacy-policy"
                      className="footer-link"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://fls-group.com/terms-conditions"
                      className="footer-link"
                    >
                      Terms &amp; Conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © {new Date().getFullYear()}{" "}
              <a href="https://fls-group.com" className="hover:underline">
                FLS Group
              </a>
              . All Rights Reserved.
            </span>
            <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
              {/* LinkedIn icon */}
              <a
                href="https://www.linkedin.com/company/flsgroup"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                    clipRule="evenodd"
                  />
                  <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                </svg>
              </a>
              {/* Facebook icon */}
              <a
                href="https://www.facebook.com/FLSGroup1993"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              {/* Youtube icon */}
              <a
                href="https://www.youtube.com/c/FLSGroup"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Blog;
