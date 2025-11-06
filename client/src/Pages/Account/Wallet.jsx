import './Account.css';

function Wallet() { 
    return ( 
       <>
          <section className='wallet-section'>
          <h2>My Wallet</h2>
          <p>View your wallet balance and transaction history.</p>
          </section>
          <hr />
          <section className='info-section'>
          <h3>Wallet Balance</h3>
          <p>Your current wallet balance is $0.00.</p>
          </section>
          <button type="button" className="wallet-btn">+ Add Payment Method</button>
        </> 
     );
}

export default Wallet; 