import "./style.css";

const PokeModal = ({ pokeDetail, handleClose, show }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div key={pokeDetail.id} className="modal--wrapper">
      <div className={`${showHideClassName} ${pokeDetail.types[0].type.name}`}>
        <header className="header--modal">
          <p>{pokeDetail.name}</p>
          <button className="modal--button" onClick={handleClose}>
            X
          </button>
        </header>
        <main>
          <img
            src={pokeDetail.sprites.other.dream_world.front_default}
            alt={pokeDetail.name}
          />
          <div>
            {pokeDetail.stats.map((status, index) => {
              return (
                <div key={index} className="modal--stats">
                  <p>{status.stat.name}</p>
                  <p>{status.base_stat}</p>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PokeModal;

/*
<img src={pokeDetail.sprites.other.dream_world.front_default} alt={pokeDetail.name} />
                    <div> 
                        {pokeDetail.stats.map((status, index)=>{
                            return(
                                <div key={index} className="modal--stats">
                                    <p>{status.stat.name}</p>
                                    <p>{status.base_stat}</p>
                                </div>
                                )
                            }
                        )}
                    </div>
*/
