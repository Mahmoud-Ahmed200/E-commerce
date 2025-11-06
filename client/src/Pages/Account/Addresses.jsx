import './Account.css';

function Addresses() {
    return ( 
        <>
          <section className='addresses-section'>
          <h2>My Addresses</h2>
          <p>Add and manage the addresses you use often.</p>
          </section>

          <hr />
          <section className='info-section'>
          <h3>Saved Addresses</h3>
          <p>You have no saved addresses.</p>
          </section>

          <section>
          <button type="button" className="btn btn-primary my-2">Add New Address</button>
          </section>
        </> 
     );
}

export default Addresses;