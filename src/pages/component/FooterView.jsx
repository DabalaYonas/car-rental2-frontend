import { Link } from "react-router-dom"

function FooterView() {
    return <><footer>
    <div className="small-container">
      <div className="center-vertical">
        <div className="gap-small">
          <a className="footer-logo" href="#">Car Rental</a>
          <p className="small-text">Unlock the freedom of the open road with our premier car rental service. Experience seamless journeys, unparalleled convenience, and exceptional value. Book your dream ride today. </p>
          <div className="my-row social-media-icon">
            <i className="bi bi-facebook"></i>
            <i className="bi bi-instagram"></i>
            <i className="bi bi-telegram"></i>
          </div>
        </div>
        <div className="gap-small">
          <h2>Site Map</h2>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/service">Services</Link></li>
            <li><Link to="/car-list">Car List</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="gap-small">
          <h2>Contact Us</h2>
          <ul className="footer-links">
            <li><i className="bi bi-geo-alt"></i> Edena Mall, Bole, Addis Ababa</li>
            <li><i className="bi bi-phone"></i> +251 910 227023</li>
            <li><i className="bi bi-telephone"></i> +251 910 227023</li>
          </ul>
        </div>
      </div>
      <hr />
      <p>©2023 Car Rental. All Rights Reserved</p>
      </div>
  </footer>
  </>
  }

  export default FooterView