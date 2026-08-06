import Hero from '../components/common/Hero';

export default function Home() {
  return (
    <div>
      <Hero />
      <section className="info-section">
        <div className="info-card">
          <h3>🔍 For Renters</h3>
          <p>Search all listed properties by city and property type in seconds.</p>
        </div>
        <div className="info-card">
          <h3>🏘️ For Landlords</h3>
          <p>List your property, update details anytime, and remove it once it's rented out.</p>
        </div>
        <div className="info-card">
          <h3>⚡ Fast & Simple</h3>
          <p>Powered by a Spring Boot REST API with a clean, responsive React UI.</p>
        </div>
      </section>
    </div>
  );
}
