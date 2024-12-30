"use server";

import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium-min";

export async function getBrowser() {
  let browser = null;

  if (process.env.NODE_ENV !== "production") {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  } else {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(
        "https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar"
      ),
      headless: chromium.headless,
    });
  }
  return browser;
}
