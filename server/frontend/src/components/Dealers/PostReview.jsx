import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';

const PostReview = () => {
  const [dealer, setDealer] = useState({});
  const [review, setReview] = useState("");
  const [model, setModel] = useState();
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [carmodels, setCarmodels] = useState([]);
  const [message, setMessage] = useState(null);

  const { id } = useParams();
  const root_url = window.location.origin + "/";
  const dealer_url = `${root_url}djangoapp/dealer/${id}`;
  const review_url = `${root_url}djangoapp/add_review/`; // slash ajouté
  const carmodels_url = `${root_url}djangoapp/get_cars`;

  const postreview = async () => {
    let name = sessionStorage.getItem("firstname") + " " + sessionStorage.getItem("lastname");
    if (name.includes("null")) name = sessionStorage.getItem("username");

    if (!model || !review || !date || !year) {
      alert("Tous les champs sont obligatoires.");
      return;
    }

    const [make_chosen, model_chosen] = model.split(" ");
    const jsoninput = JSON.stringify({
      name,
      dealership: id,
      review,
      purchase: true,
      purchase_date: date,
      car_make: make_chosen,
      car_model: model_chosen,
      car_year: year,
    });

    try {
      const res = await fetch(review_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsoninput,
      });

      const json = await res.json();

      if (json.status === 200) {
        setMessage("✅ Évaluation envoyée avec succès !");
        setTimeout(() => {
          window.location.href = `/dealer/${id}`;
        }, 1500);
      } else {
        setMessage("❌ Erreur lors de l'envoi de l’évaluation. Veuillez réessayer.");
        console.error("Erreur back-end :", json.message || json);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      setMessage("❌ Problème de connexion ou serveur. Vérifie ta connexion.");
    }
  };

  const get_dealer = async () => {
    const res = await fetch(dealer_url);
    const retobj = await res.json();
    if (retobj.status === 200 && Array.isArray(retobj.dealer)) {
      setDealer(retobj.dealer[0] || {});
    }
  };

  const get_cars = async () => {
    const res = await fetch(carmodels_url);
    const retobj = await res.json();
    setCarmodels(Array.from(retobj.CarModels));
  };

  useEffect(() => {
    get_dealer();
    get_cars();
  }, []);

  return (
    <div>
      <Header />
      <div style={{ margin: "5%" }}>
        <h1 style={{ color: "darkblue" }}>{dealer.full_name}</h1>
        <textarea
          placeholder="Votre évaluation..."
          cols="50"
          rows="7"
          onChange={(e) => setReview(e.target.value)}
        />
        <div className='input_field'>
          Date d'achat :
          <input type="date" onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className='input_field'>
          Marque et modèle :
          <select onChange={(e) => setModel(e.target.value)}>
            <option value="" disabled selected hidden>Choisir</option>
            {carmodels.map((carmodel, i) => (
              <option key={i} value={`${carmodel.CarMake} ${carmodel.CarModel}`}>
                {carmodel.CarMake} {carmodel.CarModel}
              </option>
            ))}
          </select>
        </div>
        <div className='input_field'>
          Année :
          <input
            type="number"
            min="2000"
            max={new Date().getFullYear()}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div>
          <button className='postreview' onClick={postreview}>Envoyer</button>
        </div>
        {message && <p style={{ marginTop: '1em', color: message.includes('✅') ? 'green' : 'red' }}>{message}</p>}
      </div>
    </div>
  );
};

export default PostReview;
