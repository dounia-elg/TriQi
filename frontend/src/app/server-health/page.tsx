type HealthResponse = {
  status: string;
  service: string;
};

async function getHealth(): Promise<HealthResponse> {
  const res = await fetch('http://localhost:3001/health', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch API health');
  }

  return res.json();
}

export default async function ServerHealthPage() {
  const health = await getHealth();

  return (
    <section className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">Server Rendered Health Page</h1>
      <p className="mb-2">
        API status: <strong>{health.status}</strong>
      </p>
      <p>
        Service: <strong>{health.service}</strong>
      </p>
    </section>
  );
}
