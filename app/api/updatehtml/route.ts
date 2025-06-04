import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    let profileData = {
               name: data.userName,
               title: "Arweave Builder & Permaweb Pioneer",
               profileImage:data.profileImg,
               bio: `Building the future of permanent storage and decentralized applications ${data.discription}`,                                       
               since: Date.now(),
               projectsBuilt: data.repos,
               arStored: "0",
               socials: {
                 twitter: "#",
                 github: "#",
                 discord: "#",
               },
               quote: `"The permaweb isn't just storage—it's the foundation for a truly decentralized future."`,
             };
       
    if (!profileData || typeof profileData !== 'object') {
      return NextResponse.json({ error: 'Invalid profile data' }, { status: 400 });
    }

    const templatePath = path.join(process.cwd(), 'public', 'test.html');
    const outputPath = path.join(process.cwd(), 'public', 'myfile.html');

    // Read the template
    let html = await fs.readFile(templatePath, 'utf8');

    const injectedScript = JSON.stringify(profileData);
    const updatedHtml = html.replace('{{PROFILE_DATA}}', injectedScript);


    await fs.writeFile(outputPath, updatedHtml, 'utf8');


    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error in POST /api/update-profile:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
