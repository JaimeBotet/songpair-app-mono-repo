import './DownLayers.scss'

function ScreenTransition({active}) {
    return (
      <div>
        <div className={`down-layer ${active ? "active" : ""}`}></div>
        <div className={`down-layer down-layer--2 ${active ? "active" : ""}`}></div>
        <div className={`down-layer down-layer--3 ${active ? "active" : ""}`}></div>
        <div className={`down-layer down-layer--4 ${active ? "active" : ""}`}></div>
      </div>
    );
  }

export default ScreenTransition;