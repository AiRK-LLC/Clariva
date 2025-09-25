import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { courses } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    const courseId = parseInt(id);
    const updates = await request.json();

    // Validate level if provided
    if (updates.level && !['Beginner', 'Intermediate', 'Advanced'].includes(updates.level)) {
      return NextResponse.json({
        error: "Level must be Beginner, Intermediate, or Advanced",
        code: "INVALID_LEVEL"
      }, { status: 400 });
    }

    // Validate durationWeeks if provided
    if (updates.durationWeeks !== undefined) {
      if (!Number.isInteger(updates.durationWeeks) || updates.durationWeeks <= 0) {
        return NextResponse.json({
          error: "Duration weeks must be a positive integer",
          code: "INVALID_DURATION"
        }, { status: 400 });
      }
    }

    // Validate priceAed if provided
    if (updates.priceAed !== undefined) {
      if (!Number.isInteger(updates.priceAed) || updates.priceAed < 0) {
        return NextResponse.json({
          error: "Price AED must be a positive integer",
          code: "INVALID_PRICE"
        }, { status: 400 });
      }
    }

    // Check if slug is unique if being updated
    if (updates.slug) {
      const existingCourse = await db.select()
        .from(courses)
        .where(and(eq(courses.slug, updates.slug), eq(courses.id, courseId)))
        .limit(1);

      const slugExists = await db.select()
        .from(courses)
        .where(eq(courses.slug, updates.slug))
        .limit(1);

      if (slugExists.length > 0 && existingCourse.length === 0) {
        return NextResponse.json({
          error: "Slug already exists",
          code: "SLUG_EXISTS"
        }, { status: 400 });
      }
    }

    // Check if course exists
    const existingRecord = await db.select()
      .from(courses)
      .where(eq(courses.id, courseId))
      .limit(1);

    if (existingRecord.length === 0) {
      return NextResponse.json({ 
        error: 'Course not found' 
      }, { status: 404 });
    }

    // Trim string fields
    if (updates.slug) updates.slug = updates.slug.trim();
    if (updates.title) updates.title = updates.title.trim();
    if (updates.imageUrl) updates.imageUrl = updates.imageUrl.trim();
    if (updates.description) updates.description = updates.description.trim();

    // Update course
    const updated = await db.update(courses)
      .set({
        ...updates,
        updatedAt: new Date().toISOString()
      })
      .where(eq(courses.id, courseId))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ 
        error: 'Course not found' 
      }, { status: 404 });
    }

    return NextResponse.json(updated[0], { status: 200 });

  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    const courseId = parseInt(id);

    // Check if course exists before deleting
    const existingRecord = await db.select()
      .from(courses)
      .where(eq(courses.id, courseId))
      .limit(1);

    if (existingRecord.length === 0) {
      return NextResponse.json({ 
        error: 'Course not found' 
      }, { status: 404 });
    }

    // Delete course
    const deleted = await db.delete(courses)
      .where(eq(courses.id, courseId))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json({ 
        error: 'Course not found' 
      }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Course deleted successfully',
      deletedCourse: deleted[0]
    }, { status: 200 });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}