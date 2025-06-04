import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { html } = await req.json();

    if (!html) {
      return NextResponse.json({ message: "HTML content is required" }, { status: 400 });
    }

    const deployDir = path.join(process.cwd(), 'deploy');

    // Ensure deploy folder exists
    await mkdir(deployDir, { recursive: true });

    const filePath = path.join(deployDir, 'index.html');

    await writeFile(filePath, html, 'utf-8');

    return NextResponse.json({ message: "File written successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error writing file", error }, { status: 500 });
  }
}
