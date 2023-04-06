import { useState } from "react";
import { api } from "../../services/api";
import "./style.css";

const PokeModal = ({pokeId, handleClose, show }) => {

    const [pokeDetail, setPokeDetail] = useState([]);
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    function loadDetails(){
        api.get(pokeId.toString(), {})
        .then((response)=>{setPokeDetail(response.data)})
        .catch((error)=> console.log(error))
    }
    if(pokeId > 0){
        loadDetails();
    }

    return (
        !pokeDetail && <div key={pokeDetail.id} className="modal--wrapper">
              <div className={showHideClassName}>
                  <header className="header--modal">
                      <p>{pokeDetail.name}</p>
                      <button className="modal--button" onClick={handleClose}>
                      X
                      </button>
                  </header>        
                  <main>
                    <img src={pokeDetail.sprites.other.dream_world.front_default} alt={pokeDetail.name} />
                    <div> 
                        {pokeDetail.stats.map((status, index)=>{
                            <div key={index}>
                                <p>{status.stat.name}</p>
                                <p>{status.base_stat}</p>
                            </div>
                            }
                        )}
                    </div>
                  </main>            
              </div>
            </div>
        )
    }

export default PokeModal;

/*

*/