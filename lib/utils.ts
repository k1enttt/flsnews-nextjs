import { getAllTags } from "./tag";
import { MinimalTag } from "./types";

export function formatDate(datetimeString: string | null | undefined) {
  if (!datetimeString) {
    return null;
  }
  return {
    value: formatDateValue(datetimeString),
    title: formatDateTitle(datetimeString),
    datetime: formatDateTime(datetimeString),
  };
}

export async function getTagTree() {
  const tags = await getAllTags();

  const formatedTags: Array<Record<string, MinimalTag[]>> =
    [];

  for (const tag of tags) {
    const tagProp = tag.name.split(": ");
    const parent = tagProp[0];
    const child = tagProp[1];

    const parentTagIndex = formatedTags.findIndex((item) => Object.keys(item)[0] === parent);

    const childTagObject = { slug: tag.slug, name: child };
    if (parentTagIndex != -1) {
      Object.values(formatedTags[parentTagIndex])[0].push(childTagObject);
    } else {
      formatedTags.push({ [parent]: [childTagObject] });
    }
  }
  return formatedTags;
}

function formatDateValue(datetimeString: string): string {
  // Parse the datetime string into a Date object
  const date = new Date(datetimeString);

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
  const monthIndex = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  // Format the date string
  return `${monthNames[monthIndex]} ${day}, ${year}`;
}

function formatDateTime(datetimeString: string): string {
  // Parse the datetime string into a Date object
  const date = new Date(datetimeString);

  // Get the year, month, and day components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Pad month with leading zero if needed
  const day = String(date.getDate()).padStart(2, "0"); // Pad day with leading zero if needed

  // Format the date string
  return `${year}-${month}-${day}`;
}

function formatDateTitle(datetimeString: string): string {
  // Parse the datetime string into a Date object
  const date = new Date(datetimeString);

  // Get the month, day, and year components
  const monthNames = [
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
  const monthIndex = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  // Add ordinal suffix to the day
  const ordinalSuffix = getOrdinalSuffix(day);

  // Format the date string
  return `${monthNames[monthIndex]} ${day}${ordinalSuffix}, ${year}`;
}

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
