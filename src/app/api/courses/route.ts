import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { courses } from '@/db/schema';
import { eq, like, and, or, desc, asc } from 'drizzle-orm';

const VALID_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level');
    const limit = Math.min(parseInt(searchParams.get('limit') || '100'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';

    let query = db.select().from(courses);

    // Apply level filter
    if (level && VALID_LEVELS.includes(level)) {
      query = query.where(eq(courses.level, level));
    }

    // Apply search filter
    if (search) {
      const searchCondition = or(
        like(courses.title, `%${search}%`),
        like(courses.description, `%${search}%`),
        like(courses.slug, `%${search}%`)
      );
      
      if (level && VALID_LEVELS.includes(level)) {
        query = query.where(and(eq(courses.level, level), searchCondition));
      } else {
        query = query.where(searchCondition);
      }
    }

    // Apply sorting
    const sortField = courses[sort as keyof typeof courses] || courses.createdAt;
    query = order === 'asc' ? query.orderBy(asc(sortField)) : query.orderBy(desc(sortField));

    // Apply pagination
    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { slug, title, level, durationWeeks, priceAed, imageUrl, description } = requestBody;

    // Validate required fields
    if (!slug) {
      return NextResponse.json({ 
        error: "Slug is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    if (!title) {
      return NextResponse.json({ 
        error: "Title is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    if (!level) {
      return NextResponse.json({ 
        error: "Level is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    if (durationWeeks === undefined || durationWeeks === null) {
      return NextResponse.json({ 
        error: "Duration weeks is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    if (priceAed === undefined || priceAed === null) {
      return NextResponse.json({ 
        error: "Price AED is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    if (!imageUrl) {
      return NextResponse.json({ 
        error: "Image URL is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    if (!description) {
      return NextResponse.json({ 
        error: "Description is required",
        code: "MISSING_REQUIRED_FIELD" 
      }, { status: 400 });
    }

    // Validate level enum
    if (!VALID_LEVELS.includes(level)) {
      return NextResponse.json({ 
        error: "Level must be one of: Beginner, Intermediate, Advanced",
        code: "INVALID_LEVEL" 
      }, { status: 400 });
    }

    // Validate positive integers
    if (!Number.isInteger(durationWeeks) || durationWeeks <= 0) {
      return NextResponse.json({ 
        error: "Duration weeks must be a positive integer",
        code: "INVALID_DURATION_WEEKS" 
      }, { status: 400 });
    }

    if (!Number.isInteger(priceAed) || priceAed <= 0) {
      return NextResponse.json({ 
        error: "Price AED must be a positive integer",
        code: "INVALID_PRICE_AED" 
      }, { status: 400 });
    }

    // Check for unique slug
    const existingCourse = await db.select().from(courses).where(eq(courses.slug, slug.trim())).limit(1);
    if (existingCourse.length > 0) {
      return NextResponse.json({ 
        error: "A course with this slug already exists",
        code: "SLUG_NOT_UNIQUE" 
      }, { status: 400 });
    }

    // Prepare insert data
    const insertData = {
      slug: slug.trim(),
      title: title.trim(),
      level,
      durationWeeks,
      priceAed,
      imageUrl: imageUrl.trim(),
      description: description.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const newCourse = await db.insert(courses)
      .values(insertData)
      .returning();

    return NextResponse.json(newCourse[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
      return NextResponse.json({ 
        error: "A course with this slug already exists",
        code: "SLUG_NOT_UNIQUE" 
      }, { status: 400 });
    }
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}