import { NextResponse } from "next/server";
import fs from "fs";

export async function POST(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  const filename = `${slug}.pdf`;
  const filePath = `./public/pdf/${slug}.pdf`;

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ message: "File not found" }, { status: 404 });
  }

  // Determine the content type based on the file extension
  const contentType = "application/pdf";

  try {
    // Set headers to force download
    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set("Content-Disposition", `attachment; filename="${filename}"`);

    const stat = fs.statSync(filePath);
    headers.set("Content-Length", stat.size.toString());

    // Stream the file
    const stream = fs.createReadStream(filePath);
    return new NextResponse(stream as unknown as ReadableStream, {
      headers,
    });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
