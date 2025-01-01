"use client";
interface FormattedDate {
  value: string;
  title: string;
  datetime: string;
}

/**
 * Trả về một đối tượng chứa thông tin về ngày tháng năm của một bài viết. Giá trị trả về được dùng cho thẻ <time> của bài viết.
 * @param {string | null | undefined} datetimeString
 * @returns {FormattedDate | null}
 */
export function formatDate(
  datetimeString: string | null | undefined
): FormattedDate | null {
  if (!datetimeString) {
    return null;
  }
  return {
    value: formatDateValue(datetimeString),
    title: formatDateTitle(datetimeString),
    datetime: formatDateTime(datetimeString),
  };
}

/**
 * Trả về giá trị ngày tháng năm của một bài viết dưới dạng "Dec. 20, 2024"
 * @returns {string}
 */
function formatDateValue(datetimeString: string): string {
  // Parse the datetime string into a Date object
  const date: Date = new Date(datetimeString);

  // Get the month, day, and year components
  const monthNames = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May.",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];
  const monthIndex: number = date.getMonth();
  const day: number = date.getDate();
  const year: number = date.getFullYear();

  // Format the date string
  return `${monthNames[monthIndex]} ${day}, ${year}`;
}

/**
 * Trả về giá trị ngày tháng năm của một bài viết dưới dạng "2024-12-20"
 * @param {string} datetimeString
 * @returns {string}
 */
function formatDateTime(datetimeString: string): string {
  // Parse the datetime string into a Date object
  const date: Date = new Date(datetimeString);

  // Get the year, month, and day components
  const year: number = date.getFullYear();
  const month: string = String(date.getMonth() + 1).padStart(2, "0"); // Pad month with leading zero if needed
  const day: string = String(date.getDate()).padStart(2, "0"); // Pad day with leading zero if needed

  // Format the date string
  return `${year}-${month}-${day}`;
}

/**
 * Trả về tiêu đề ngày tháng năm của một bài viết dưới dạng "December 20th, 2024"
 * @param {string} datetimeString
 * @returns {string}
 */
function formatDateTitle(datetimeString: string): string {
  // Parse the datetime string into a Date object
  const date: Date = new Date(datetimeString);

  // Get the month, day, and year components
  const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex: number = date.getMonth();
  const day: number = date.getDate();
  const year: number = date.getFullYear();

  // Add ordinal suffix to the day
  const ordinalSuffix: string = getOrdinalSuffix(day);

  // Format the date string
  return `${monthNames[monthIndex]} ${day}${ordinalSuffix}, ${year}`;
}

/**
 * Trả về hậu tố thứ của một ngày, bao gồm "st", "nd", "rd", hoặc "th"
 * @param {string} day
 * @returns {string}
 */
function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) {
    return "th";
  } else {
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }
}

/**
 * Tách một đoạn văn thành các câu và bọc mỗi câu trong thẻ <span>
 * @param {string} text
 * @returns {string[]}
 */
export function splitParagraphIntoSentences(text: string): string[] {
  // Biểu thức chính quy cơ bản để tách câu
  // const regex = /[?.!]\s+/g;
  // Biểu thức chính quy để tách câu và giữ lại dấu câu cuối câu
  const regex = /[.?!]/g;

  // Tách chuỗi thành mảng các câu
  const sentences = text.split(regex);

  // Kết hợp lại các câu và dấu câu
  const result: string[] = [];
  for (let i = 0; i < sentences.length - 1; i++) {
    result.push(sentences[i] + sentences[i + 1]);
  }

  // Loại bỏ các phần tử rỗng
  return result.map((sentence) => `<span>${sentence}</span>`);
}

/**
 * Trả về mảng các từ trong một đoạn văn được cách nhau bởi khoảng trắng
 * @param text Tách một đoạn văn thành các từ
 * @returns Mảng các từ trong đoạn văn
 */
export function splitTextIntoWords(text: string): string[] {
  // Biểu thức chính quy để tách chữ và giữ nguyên dấu câu
  const regex = /\s+/g; // Tách theo khoảng trắng, nhưng không bao gồm khoảng trắng trước dấu câu

  // Tách chuỗi thành mảng các từ và dấu câu
  const words = text.split(regex);

  return words;
}

function escapeSpecialCharacters(str: string): string {
  return str.replace(/[\?\+\*.]/g, "\\$&");
}

/**
 * Thay thế một từ trong một đoạn văn bản, nhưng không thay thế nếu từ đó đã được bọc trong thẻ <span>
 * @param paragraph Đoạn van cần thay thế
 * @param wordToReplace Từ cần thay thế
 * @param replacement Từ thay thế
 * @returns Đoạn văn sau khi thay thế
 */
export function replaceWordToSpan(
  text: string,
  wordToReplace: string,
  replacement: string
): string {
  // Biểu thức chính quy tìm kiếm từ "không" không nằm trong thẻ span
  const escapedWord: string = escapeSpecialCharacters(wordToReplace);
  const regex = new RegExp(
    String.raw`\s?${escapedWord}\s|\s${escapedWord}\s?(?!<\/span>)`,
    ""
  );

  // Thay thế từ tìm thấy đầu tiên, nếu muốn thay thế tất cả thì thêm "g" vào cuối regex
  return text.replace(regex, ` ${replacement} `);
}

/**
 * Trả về innerHTML của HTMLElement với tất cả `targetElement` có trong đó được thêm class
 * @param html HTMLElement chứa các element cần thêm class
 * @param targetElement Element cần thêm class
 * @param newClass Class cần thêm vào element
 * @returns innerHTML của HTMLElement sau khi thêm class
 */
export function addClass(
  html: HTMLElement | null,
  targetElement: string,
  newClass: string[]
): string {
  if (!html) {
    return "";
  }

  html.querySelectorAll(targetElement).forEach((e) => {
    const outerHTML = e.outerHTML;

    // Thêm class border-black vào tất cả ảnh
    e.classList.add(...newClass);
    html.innerHTML = html.innerHTML.replace(outerHTML, e.outerHTML);
  });
  return html.innerHTML;
}

/**
 * Trả về innerHTML của HTMLElement với tất cả `targetElement` có trong đó class được thay thế
 * @param html HTMLElement chứa các element cần thêm class
 * @param targetElement Element cần thêm class
 * @param newClass Class thay thế cho element
 * @returns innerHTML của HTMLElement sau khi thay thế class
 */
export function replaceImageDimensions(
  html: HTMLElement | null,
  dimensionList: {
    width: number;
    height: number;
  }[]
): string {
  if (!html) {
    return "";
  }
  let index = 0;
  html.querySelectorAll("img").forEach((e) => {
    const outerHTML = e.outerHTML;

    // Thay thế thuộc tính width và height bằng width và height mới
    if (dimensionList[index]) {
      e.setAttribute("width", dimensionList[index].width.toString());
      e.setAttribute("height", dimensionList[index].height.toString());
    } else {
      e.setAttribute("width", "672");
      e.setAttribute("height", "400");
    }

    html.innerHTML = html.innerHTML.replace(outerHTML, e.outerHTML);
    index++;
  });
  return html.innerHTML;
}

/**
 * Xóa tất cả các ký tự "\" trong chuỗi HTML
 * @param htmlString Chuỗi HTML cần xóa ký tự "\"
 * @returns Chuỗi HTML sau khi xóa ký tự "\"
 */
export function removeEscapeCharacters(htmlString: string): string {
  // Thay thế tất cả các cặp "\" bằng "" (rỗng)
  return htmlString.replace(/\\/g, "");
}

/**
 * Xóa tất cả các thẻ figure và figcaption trong một element
 * @param element Nội dung HTML cần xóa thẻ figure và figcaption
 */
export function removeFigureAndFigcaption(element: HTMLElement) {
  // Chọn tất cả các thẻ figure và figcaption
  const figures = element.querySelectorAll("figure, figcaption");

  // Duyệt qua từng thẻ và thay thế bằng nội dung con của nó
  figures.forEach((figure) => {
    const parent = figure.parentNode;
    while (figure.firstChild) {
      parent!.insertBefore(figure.firstChild, figure);
    }
    parent!.removeChild(figure);
  });
}

/**
 * Đợi 1 khoảng thời gian (ms)
 * @param time Thời gian (ms) mà bạn muốn tạm dừng
 * @returns Hàm setTimeout chạy với thời gian đã nhập
 */
export function delay(time: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

/**
 * Lấy file pdf từ server và lưu về máy của người dùng
 * @param slug slug của bài viết
 */
export function savePdf(blob: Blob, slug: string) {
  // Create a temporary anchor element to trigger the download
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;

  // Setting filename received in response
  link.setAttribute("download", `${slug}.pdf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Xử lý việc xuất bài viết ra file PDF
 * @param document Document của trang web
 * @param slug Slug của bài viết
 * @returns Lỗi nếu có, null nếu không có lỗi
 */
export async function exportToPdf(
  document: Document,
  slug: string
): Promise<string | null> {
  let errorString: string | null = null;
  const imageDimensionList = getImageDimensions(
    document.getElementById("blog")
  );

  const article = document
    .getElementById("blog")
    ?.cloneNode(true) as HTMLElement;

  // Cập nhật kích thước ảnh trong PDF thành kích thước ảnh trên trình duyệt để tránh lỗi ảnh quá to khi xuất pdf
  article!.innerHTML = replaceImageDimensions(article!, imageDimensionList);

  // Thay loading="lazy" thành loading="eager" để tránh lỗi khi xuất pdf
  article!.innerHTML = article!.innerHTML.replaceAll(
    'loading="lazy"',
    'loading="eager"'
  );

  if (article) {
    const response = await fetch(`/api/${slug}/pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ html: article.outerHTML }),
    });

    if (response.ok) {
      const blob = await response.blob();
      savePdf(blob, slug);
    } else {
      try {
        const json = (await response.json()) as { error: string };
        errorString = json.error;
      }
      catch (error) {
        console.error(error);
        errorString = "Failed to generate PDF";
      }
    }
  }
  return errorString;
}

/**
 *
 * @param HTMLElement Có thê là Document của trang web hoặc một phần tử HTML
 * @param isMobile Có phải là đang sử dụng thiết bị di động không
 * @returns
 */
export function getImageDimensions(
  htmlElement: HTMLElement | null
): { width: number; height: number }[] {
  if (!htmlElement) {
    return [];
  }
  const imageDimensionList: { width: number; height: number }[] = [];

  // Lấy độ rộng và chiều cao của ảnh trên mobile
  const imgElements = htmlElement.querySelectorAll("img");

  // Tính chiều dài mới của ảnh bằng cách lấy tỷ lệ ảnh chia với 600px (là độ rộng mong muốn của ảnh trên pdf)
  if (imgElements) {
    for (let i = 0; i < imgElements.length; i++) {
      const img = imgElements[i];
      const newWidth = 580;
      const newHeight = (img.height * newWidth) / img.width;
      imageDimensionList.push({ width: newWidth, height: newHeight });
    }
  }

  return imageDimensionList;
}
