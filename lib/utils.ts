import { getAllTags } from "./tag";
import type { MinimalTag } from "./types";

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
 * Trả về tất cả các tag có trong Ghost dưới dạng cây
 * @returns {Promise<Array<Record<string, MinimalTag[]>>}
 */
export async function getTagTree(): Promise<
  Array<Record<string, MinimalTag[]>>
> {
  const tags = await getAllTags();

  const formatedTags: Array<Record<string, MinimalTag[]>> = [];

  for (const tag of tags) {
    const tagProp = tag.name.split(": ");
    const parent = tagProp[0];
    const child = tagProp[1];

    const parentTagIndex: number = formatedTags.findIndex(
      (item) => Object.keys(item)[0] === parent
    );

    const childTagObject = { slug: tag.slug, name: child };
    if (parentTagIndex != -1) {
      Object.values(formatedTags[parentTagIndex])[0].push(childTagObject);
    } else {
      formatedTags.push({ [parent]: [childTagObject] });
    }
  }
  return formatedTags;
}

/**
 * Trả về giá trị ngày tháng năm của một bài viết dưới dạng "Dec. 20, 2024"
 * @returns {Promise<MinimalTag[]>}
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
  const escapedWord = escapeSpecialCharacters(wordToReplace);
  const regex = new RegExp(
    String.raw`\s?${escapedWord}\s|\s${escapedWord}\s?(?!<\/span>)`,
    "g"
  );
  console.log("Literal special characters: " + regex);
  // const regex = "2024,";

  // Thay thế tất cả các từ "không" tìm thấy
  return text.replace(regex, ` ${replacement} `);
}

// function replaceWords(
//   text: string,
//   wordToReplace: string,
//   replacement: string
// ): string {
//   // Biểu thức chính quy tìm kiếm từ "không" không nằm trong thẻ span
//   const regex = new RegExp(
//     `\\s?${escapeSpecialCharacters(wordToReplace)}\\s|\\s2024,\\s?(?!<\/span>)`,
//     "g"
//   );
//   console.log("Literal special characters: " + regex);

//   // Thay thế tất cả các từ "không" tìm thấy
//   return text.replace(regex, `${replacement}`);
// }

// // Ví dụ sử dụng:
// const text =
//   '<p>Đây là một đoạn văn bản có chứa từ "không" 2024, và 2024,</span> và 2024 không. không và <span>không nên</span> thay đổi.</p>';
// const newText = replaceWords(text, "2024,", "rất");

// console.log("replaceKhong \n" + newText); // Output: <p>Đây là một đoạn văn bản có chứa từ "rất" và <span>không nên</span> thay đổi.</p>
