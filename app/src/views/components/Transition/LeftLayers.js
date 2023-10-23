import './LeftLayers.scss'

function ScreenTransition({active}) {
    return (
      <div>
        <div className={`left-layer ${active ? "active" : ""}`}></div>
        <div className={`left-layer left-layer--2 ${active ? "active" : ""}`}></div>
        <div className={`left-layer left-layer--3 ${active ? "active" : ""}`}></div>
        <div className={`left-layer left-layer--4 ${active ? "active" : ""}`}></div>
      </div>
    );
  }

export default ScreenTransition;