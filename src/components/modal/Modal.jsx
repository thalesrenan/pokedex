import "./style.css";

const PokeModal = ({pokeDetails, handleClose, show }) => {

    const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (

pokeDetails.map((pokemon)=>{
    return(
        <div key={pokemon.id} className="modal--wrapper">
            <div className={showHideClassName}>
                <header className="header--modal">
                    <p>{pokemon.name}</p>
                    <button className="modal--button" onClick={handleClose}>
                    X
                    </button>
                </header>        
                <main>
                    <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
                        <ol className="baseStats">
                            {
                                pokemon.stats.map((status, index)=>{
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
    })
  );
}

export default PokeModal;