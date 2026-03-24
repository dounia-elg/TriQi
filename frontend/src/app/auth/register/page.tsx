import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">

        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center gap-2 mb-6">
            <span className="text-2xl">🧭</span>
            <span className="text-xl font-bold text-indigo-600">TriQi</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Start your journey</h1>
          <p className="text-gray-500 mt-2">Create your free TriQi account</p>
        </div>

        <div className="bg-indigo-50 text-indigo-600 text-sm text-center py-4 rounded-xl">
          🔧 Register form coming in the next story (Auth Pages)
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-indigo-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}
