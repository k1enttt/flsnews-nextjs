"use server";

import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium-min";
import { writeFile } from "fs";

export async function createPdfByPuppeteer(pdfHtml: string, slug: string) {
  let browser = null;

  console.log("NODE_ENV", process.env.NODE_ENV);
  if (process.env.NODE_ENV !== "production") {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  } else {
  browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    // executablePath: await chromium.executablePath('/var/task/.next/server/app/node_modules/@sparticuz/chromium/bin'),
    executablePath: await chromium.executablePath("https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar"),
    headless: chromium.headless,
  });
  }

  const page = await browser.newPage();

  await page.setContent(pdfHtml, { waitUntil: "networkidle2" });

  const buffer = await page.pdf({
    format: "A4",
    margin: { top: "1.5cm", right: "1.5cm", bottom: "1.5cm", left: "1.5cm" },
  });

  await browser.close();

  writeFile(`./public/pdf/${slug}.pdf`, buffer, {}, (err) => {
    if (err) {
      return console.error("Write PDF error:", err);
    }

    console.log("Write PDF success");
  });
}
