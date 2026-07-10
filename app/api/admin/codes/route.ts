import { NextRequest, NextResponse } from 'next/server';
import { loadCodesWithFirebase } from '@/lib/activationDb';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get('secret');

    // Admin passcode to protect the API
    if (secret !== 'BAC-ADMIN-2026') {
      return NextResponse.json(
        { success: false, message: 'غير مصرح لك بالوصول إلى لوحة التحكم!' },
        { status: 401 }
      );
    }

    const filter = searchParams.get('filter') || 'all'; // all, used, unused
    const search = (searchParams.get('search') || '').toUpperCase().trim();
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    const allCodes = await loadCodesWithFirebase();

    // Apply filtering
    let filtered = allCodes;
    if (filter === 'used') {
      filtered = allCodes.filter(c => c.used);
    } else if (filter === 'unused') {
      filtered = allCodes.filter(c => !c.used);
    }

    // Apply search
    if (search) {
      filtered = filtered.filter(c => c.code.includes(search));
    }

    // Calculate dynamic stats
    const totalCount = allCodes.length;
    const usedCount = allCodes.filter(c => c.used).length;
    const unusedCount = totalCount - usedCount;

    // Pagination
    const totalFiltered = filtered.length;
    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);
    const totalPages = Math.ceil(totalFiltered / limit);

    return NextResponse.json({
      success: true,
      codes: paginated,
      stats: {
        total: totalCount,
        used: usedCount,
        unused: unusedCount,
        filteredTotal: totalFiltered
      },
      pagination: {
        page,
        limit,
        totalPages,
        totalFiltered
      }
    });
  } catch (err: any) {
    console.error('Admin API error:', err);
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء تحميل الرموز.' },
      { status: 500 }
    );
  }
}
