import './HomePage.css'

export const HomePage = () => {
  return (
    <main className="home-page">
      <header className="hero">
        <h1>Jeevayurniketan Ayurveda</h1>
        <p>Experience the holistic healing of Ayurveda</p>
      </header>
      <section className="features">
        <div className="feature-card">
          <h3>Authentic Treatments</h3>
          <p>Traditional therapies tailored to your dosha.</p>
        </div>
        <div className="feature-card">
          <h3>Expert Doctors</h3>
          <p>Consult with our experienced Ayurvedic practitioners.</p>
        </div>
        <div className="feature-card">
          <h3>Natural Medicines</h3>
          <p>Herbal remedies sourced from pure nature.</p>
        </div>
      </section>
    </main>
  )
}
