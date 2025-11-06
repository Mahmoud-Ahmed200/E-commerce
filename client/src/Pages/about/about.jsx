import './about.css';

function About() {
    return ( 
        <>
        <div className="container my-5" id="about">
    <div className="row g-5 align-items-center">
      
      <div className="col-md-6">
        <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop" className="img-fluid rounded-3 shadow-sm" alt="Modern Tech Team" />
      </div>

      <div className="col-md-6">
        <h2 className="fw-bold">About Modern Tech</h2>
        <p className="text-muted fs-5 mb-4">Your Trusted Partner for the Latest in Tech.</p>
        
        <p>At Modern Tech, we are passionate about connecting you with the best technology the world has to offer. From state-of-the-art laptops and smartphones to the smallest PC accessories, we believe everyone deserves access to tools that improve their lives, work, and play.</p>
        
        <p>We're more than just a store; we're tech enthusiasts and experts. Our team carefully curates every product, ensuring it meets our high standards for quality, performance, and value. Our goal is to provide a seamless and secure shopping experience from start to finish.</p>

        <ul className="list-unstyled mt-4">
          <li className="d-flex align-items-start gap-3 mb-3">
            <i className="bi bi-check-circle-fill fs-4 text-info"></i>
            <div>
              <h5 className="fw-bold mb-0">Curated Selection</h5>
              <p className="text-muted mb-0 small">Only the best brands and verified products.</p>
            </div>
          </li>
          <li className="d-flex align-items-start gap-3 mb-3">
            <i className="bi bi-headset fs-4 text-info"></i>
            <div>
              <h5 className="fw-bold mb-0">Expert Support</h5>
              <p className="text-muted mb-0 small">Our tech-savvy team is ready to help you.</p>
            </div>
          </li>
          <li className="d-flex align-items-start gap-3">
            <i className="bi bi-tags-fill fs-4 text-info"></i>
            <div>
              <h5 className="fw-bold mb-0">Competitive Prices</h5>
              <p className="text-muted mb-0 small">Get the tech you want without breaking the bank.</p>
            </div>
          </li>
        </ul>

      </div>
    </div>
  </div>
        </>
     );
}

export default About;