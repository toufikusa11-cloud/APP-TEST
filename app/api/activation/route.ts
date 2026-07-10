import { NextRequest, NextResponse } from 'next/server';
import { consumeActivationCode } from '@/lib/activationDb';

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { success: false, message: 'يرجى إدخال رمز التفعيل!' },
        { status: 400 }
      );
    }

    const result = await consumeActivationCode(code);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('Activation API error:', err);
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء معالجة رمز التفعيل.' },
      { status: 500 }
    );
  }
}
