import { useEffect, useState } from "react";
import { api } from "../../services/api";
import "./style.css";

const PokeModal = ({pokeId, handleClose, show }) => {

    const [pokeDetail, setPokeDetail] = useState([]);
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    useEffect(() => {
        function loadDetails(){
            api.get(pokeId.toString(), {})
            .then((response)=>{setPokeDetail(response.data)})
            .catch((error)=> console.log(error))
        }
        if(pokeId > 0){
           loadDetails();
        }
      }, []);

      console.log(pokeId)

    return (
          <div key={pokeDetail.id} className="modal--wrapper">
              <div className={showHideClassName}>
                  <header className="header--modal">
                      <p>{pokeDetail.name}</p>
                      <button className="modal--button" onClick={handleClose}>
                      X
                      </button>
                  </header>        
                  <main>
                      <img src={pokeDetail.sprites.other.dream_world.front_default} alt={pokeDetail.name} />
                          <ol className="baseStats">
                              {
                                  pokeDetail.stats.map((status, index)=>{
                                      return(
                                          <div key={index} className="status--details">
                                              <p>{status.stat.name}</p>
                                              <li>{status.base_stat}</li>
                                          </div>
                                      )
                                  })
                              }
                          </ol>
                  </main>            
              </div>
          </div>
          )
    }

export default PokeModal;