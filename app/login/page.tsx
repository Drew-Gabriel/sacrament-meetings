import LoginForm from '@/components/login-form';

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <div className="rounded-lg bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-gray-900">
          Bishopric Login
        </h1>

        <p className="mt-2 text-gray-600">
          Sign in to manage sacrament meeting programs.
        </p>

        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}