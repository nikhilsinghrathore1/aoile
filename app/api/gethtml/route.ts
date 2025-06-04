
import fs from "fs";
import path from "path";

// For App Router (app/api/gethtml/route.js)
export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "myfile.html");

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return new Response(
        JSON.stringify({
          message:
            "HTML file not found. Please generate it first by connecting your profiles.",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Read the file
    const htmlContent = fs.readFileSync(filePath, "utf8");

    // Return the HTML content
    return new Response(htmlContent, {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    console.error("Error reading HTML file:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
