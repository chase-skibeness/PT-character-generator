import React from 'react';
import './LevelView.css';

const LevelView = ({ level, classDef, stats }) => {
  return (
    <div className="level-view-container">
      <p>Level: {level}</p>
      <p>Class: {classDef?.name}</p>
      <div className="level-view-stats-container">
        {stats != null
          ? Object.keys(stats).map((stat) => (
              <p key={`statdisplay${stat}key`}>
                <span>{stat}:</span> {stats[stat]}
              </p>
            ))
          : null}
      </div>
    </div>
  );
};

export default LevelView;
