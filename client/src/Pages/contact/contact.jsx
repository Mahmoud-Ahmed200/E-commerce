import "./contact.css";

function Contact() {
  return (
    <>
      <div className="container my-5" id="contact">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Get In Touch</h2>
          <p className="text-muted">
            We'd love to hear from you. Send us a message!
          </p>
        </div>

        <div className="row g-5">
          <div className="col-md-7">
            <h4 className="fw-bold mb-4">Send a Message</h4>
            <form>
              <div className="row">
                <div className="col-lg-6 mb-3">
                  <label for="contactName" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="contactName"
                    required
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <label for="contactEmail" className="form-label">
                    Your Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="contactEmail"
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label for="contactSubject" className="form-label">
                  Subject
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="contactSubject"
                  required
                />
              </div>
              <div className="mb-3">
                <label for="contactMessage" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="contactMessage"
                  rows="5"
                  required
                ></textarea>
              </div>
              <div className="text-end">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ background: "var(--accent)", border: "none" }}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          <div className="col-md-5">
            <h4 className="fw-bold mb-4">Contact Information</h4>
            <p className="text-muted mb-4">
              Feel free to reach out to us directly through any of the following
              methods.
            </p>

            <div className="d-flex align-items-start gap-3 mb-4">
              <i className="bi bi-geo-alt fs-2 text-info"></i>
              <div>
                <h5 className="fw-bold mb-1">Address</h5>
                <p className="text-muted mb-0">16 Roshdy basha, Cairo, Egypt</p>
              </div>
            </div>

            <div className="d-flex align-items-start gap-3 mb-4">
              <i className="bi bi-telephone fs-2 text-info"></i>
              <div>
                <h5 className="fw-bold mb-1">Phone</h5>
                <p className="text-muted mb-0">+201065754308</p>
              </div>
            </div>

            <div className="d-flex align-items-start gap-3 mb-4">
              <i className="bi bi-envelope fs-2 text-info"></i>
              <div>
                <h5 className="fw-bold mb-1">Email</h5>
                <p className="text-muted mb-0">moderntech@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
