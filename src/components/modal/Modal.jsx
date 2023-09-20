import "./style.css";

const PokeModal = ({ pokeDetail,id, handleClose, show }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <>
      {pokeDetail.map((detail) => {
        if (detail.id === id) {
          return (
            <div key={detail.id} className="modal--wrapper">
              <div
                className={`${showHideClassName} ${detail.types[0].type.name}`}
              >
                <header className="header--modal">
                  <p>{detail.name}</p>
                  <button
                    className="modal--button"
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    X
                  </button>
                </header>
                <main>
                  <img
                    src={detail.sprites.other.dream_world.front_default}
                    alt={detail.name}
                  />
                  <div>
                    {detail.stats.map((status, index) => {
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
        }
      })}
    </>
  );
};

export default PokeModal;
