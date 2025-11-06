import HelpSection from './Help.jsx';
import './Cart.css';
import acerlaptop from '../../assets/acerlaptop.jpg';
import huweifreebuds from '../../assets/Huweifreebuds.jpg';

function CartPage() {
  return (
    <>
      <section className="cart p-5">
        <div className="container-fluid">
          <div className="row gy-4 align-items-start">
            <div className="col-lg-8">
              <div className="p-4 h-100">
                <h3 className="mb-4">My cart</h3>
                <hr className="my-3" />
                <div
                  className="d-flex flex-column flex-sm-row align-items-center mb-4"
                >
                  <img
                    src={acerlaptop}
                    className="img-thumbnail me-sm-4 mb-3 mb-sm-0"
                    alt="Laptop"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                  <div className="flex-grow-1 text-center text-sm-start mb-3 mb-sm-0">
                    <h5 className="mb-1">Acer Laptop</h5>
                    <p className="mb-0">EGP 60,000</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="input-group input-group-sm" style={{ width: '100px' }}>
                      <button className="btn btn-outline-secondary" type="button">
                        -
                      </button>
                      <input
                        type="text"
                        defaultValue="1"
                        className="form-control text-center"
                        style={{ backgroundColor: '#e8e8e8' }}
                      />
                      <button className="btn btn-outline-secondary" type="button">
                        +
                      </button>
                    </div>
                    <p className="mb-0 mx-3">EGP 60,000</p>
                    <lord-icon
                      src="https://cdn.lordicon.com/jzinekkv.json"
                      trigger="hover"
                      colors="primary:#545454,secondary:#545454"
                      style={{ width: '30px', height: '30px' }}
                    >
                    </lord-icon>
                  </div>
                </div>

                <hr className="my-3" />
                <div
                  className="d-flex flex-column flex-sm-row align-items-center mb-4"
                >
                  <img
                    src={huweifreebuds}
                    className="img-thumbnail me-sm-4 mb-3 mb-sm-0"
                    alt="Phone"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                  <div className="flex-grow-1 text-center text-sm-start mb-3 mb-sm-0">
                    <h5 className="mb-1">Huwei Freebuds</h5>
                    <p className="mb-0">EGP 30,000</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="input-group input-group-sm" style={{ width: '100px' }}>
                      <button className="btn btn-outline-secondary" type="button">
                        -
                      </button>
                      <input
                        type="text"
                        defaultValue="1"
                        className="form-control text-center"
                        style={{ backgroundColor: '#e8e8e8' }}
                      />
                      <button className="btn btn-outline-secondary" type="button">
                        +
                      </button>
                    </div>
                    <p className="mb-0 mx-3">EGP 30,000</p>
                    <lord-icon
                      src="https://cdn.lordicon.com/jzinekkv.json"
                      trigger="hover"
                      colors="primary:#545454,secondary:#545454"
                      style={{ width: '30px', height: '30px' }}
                    >
                    </lord-icon>
                  </div>
                </div>

                <hr className="my-3" />
              </div>
            </div>

            <div className="col-lg-4">
              <div className="p-4 h-100 d-flex flex-column">
                <div>
                  <h3 className="mb-4">Order summary</h3>
                  <hr className="my-3" />
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span>EGP 90,000</span>
                  </div>
                  <div className="d-flex justify-content-between mb-4">
                    <span>
                      <a href="#" className="text-decoration-none text-dark">
                        Estimate Delivery
                      </a>
                    </span>
                    <span>FREE</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <hr className="my-3" />
                  <div className="d-flex justify-content-between mb-4">
                    <h5>Total</h5>
                    <h5>EGP 90,000</h5>
                  </div>
                  <button className="btn btn-lg w-100 mb-3 text-white btn-checkout">
                    Checkout
                  </button>
                  <p className="text-center text-muted small mb-0">
                    <i className="fas fa-lock me-1"></i>Secure Checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HelpSection />
    </>
  );
}

export default CartPage;