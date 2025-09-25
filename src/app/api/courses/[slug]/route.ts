import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { courses } from '@/db/schema';
import { eq } from 'drizzle-orm';

interface RouteParams {
  params: {
    slug: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json({ 
        error: "Course slug is required",
        code: "MISSING_SLUG" 
      }, { status: 400 });
    }

    const course = await db.select()
      .from(courses)
      .where(eq(courses.slug, slug))
      .limit(1);

    if (course.length === 0) {
      return NextResponse.json({ 
        error: "Course not found",
        code: "COURSE_NOT_FOUND" 
      }, { status: 404 });
    }

    return NextResponse.json(course[0], { status: 200 });

  } catch (error) {
    console.error('GET course by slug error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}