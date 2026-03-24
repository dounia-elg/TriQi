import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">

        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center gap-2 mb-6">
            <span className="text-2xl">🧭</span>
            <span className="text-xl font-bold text-indigo-600">TriQi</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500 mt-2">Sign in to continue your journey</p>
        </div>

        <div className="bg-indigo-50 text-indigo-600 text-sm text-center py-4 rounded-xl">
          🔧 Login form coming in the next story (Auth Pages)
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-indigo-600 font-medium hover:underline">
            Sign up free
          </Link>
        </p>

      </div>
    </div>
  );
}
