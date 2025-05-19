import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import positive_icon  from "../assets/positive.png";
import neutral_icon   from "../assets/neutral.png";
import negative_icon  from "../assets/negative.png";
import review_icon    from "../assets/reviewbutton.png";
import Header         from '../Header/Header';

const Dealer = () => {
  const { id } = useParams();

  // États
  const [dealer, setDealer]       = useState(null);
  const [reviews, setReviews]     = useState([]);
  const [unreviewed, setUnreviewed] = useState(false);
  const [postReviewLink, setPostReviewLink] = useState(null);

  // ⚙️ Chemins relatifs → CRA proxy dans package.json
  const dealer_url  = `/djangoapp/dealer/${id}/`;
  const reviews_url = `/djangoapp/reviews/dealer/${id}/`;
  const post_url    = `/djangoapp/postreview/${id}/`;

  useEffect(() => {
    // 1) Récupérer le dealer
    const fetchDealer = async () => {
      try {
        const res    = await fetch(dealer_url);
        const retobj = await res.json();
        console.log("fetchDealer →", retobj);
        if (retobj.status === 200) {
          // Selon la forme de retobj.dealer :
          //  - si c'est un objet : setDealer(retobj.dealer)
          //  - si c'est un tableau : setDealer(retobj.dealer[0])
          const d = Array.isArray(retobj.dealer)
            ? retobj.dealer[0]
            : retobj.dealer;
          setDealer(d);
        }
      } catch (err) {
        console.error("Erreur fetchDealer:", err);
      }
    };

    // 2) Récupérer les reviews
    const fetchReviews = async () => {
      try {
        const res    = await fetch(reviews_url);
        const retobj = await res.json();
        console.log("fetchReviews →", retobj);
        if (retobj.status === 200) {
          retobj.reviews.length > 0
            ? setReviews(retobj.reviews)
            : setUnreviewed(true);
        }
      } catch (err) {
        console.error("Erreur fetchReviews:", err);
      }
    };

    fetchDealer();
    fetchReviews();

    // 3) Lien pour poster une review si connecté
    if (sessionStorage.getItem("username")) {
      setPostReviewLink(
        <a href={post_url}>
          <img
            src={review_icon}
            alt="Write a review"
            style={{ width: '10%', marginLeft: 10, marginTop: 10 }}
          />
        </a>
      );
    }
  }, [id]);

  // Icône selon sentiment
  const sentiIcon = s =>
    s === 'positive' ? positive_icon
      : s === 'negative' ? negative_icon
      : neutral_icon;

  // --- Guard : tant que dealer n'est pas chargé, on affiche un loader ---
  if (!dealer) {
    return (
      <div style={{ margin: 20 }}>
        <Header />
        <div>Loading dealer…</div>
      </div>
    );
  }

  return (
    <div style={{ margin: 20 }}>
      <Header />
      <div style={{ marginTop: 10 }}>
        <h1 style={{ color: 'grey' }}>
          {dealer.full_name} {postReviewLink}
        </h1>
        <h4 style={{ color: 'grey' }}>
          {dealer.city}, {dealer.address}, Zip – {dealer.zip}, {dealer.state}
        </h4>
      </div>

      <div className="reviews_panel">
        {reviews.length === 0 && !unreviewed ? (
          <span>Loading Reviews…</span>
        ) : unreviewed ? (
          <div>No reviews yet!</div>
        ) : (
          reviews.map((r, idx) => (
            <div key={idx} className="review_panel">
              <img
                src={sentiIcon(r.sentiment)}
                className="emotion_icon"
                alt={r.sentiment}
              />
              <div className="review">{r.review}</div>
              <div className="reviewer">
                {r.name} – {r.car_make} {r.car_model} ({r.car_year})
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dealer;
