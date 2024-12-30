"use server";

import puppeteer from "puppeteer-core";
import { writeFile } from "fs";

export async function createPdfByPuppeteer(pdfHtml: string, slug: string) {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/chromium-browser",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
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
