
/**
 * Landing Stats Section Component
 * Statistics banner with key metrics
 */

const LandingStats = () => {
  const stats = [
    {
      number: "10,000+",
      label: "Companies Trust Us"
    },
    {
      number: "500K+",
      label: "Employees Managed"
    },
    {
      number: "99.9%",
      label: "Uptime Guarantee"
    },
    {
      number: "24/7",
      label: "Customer Support"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-white">
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingStats;
