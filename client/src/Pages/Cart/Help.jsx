import { Link } from 'react-router-dom';

// Import CSS
import './Help.css';

function HelpSection() {
  return (
    <section className="help-section py-5">
      <div className="container-fluid">
        <div className="row align-items-center g-4">
          <div className="col-md-6">
            <div className="help-box bg-dark text-white p-5 rounded-4">
              <h4>Need Help? Check Out Our Help Center</h4>
              <p className="mt-3">
                If you have questions, visit our Help Center or contact support.
              </p>
              <Link to="/" className="btn btn-light rounded-pill fw-medium">
                Go to Help Center
              </Link>
            </div>
          </div>
          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80"
              className="img-fluid rounded shadow"
              alt="Tech accessories"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HelpSection;