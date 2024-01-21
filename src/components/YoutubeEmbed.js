import React from 'react';
import PropTypes from 'prop-types';

const YoutubeEmbed = ({embedId}) => (
    <div className="videoPlayer">
        <iframe
            src={'https://www.youtube.com/embed/' + embedId}
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media"
            allowFullScreen
            title="Burn"
        />
    </div>
);

YoutubeEmbed.propTypes = {
    embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;

// When using component: {/*<YoutubeEmbed embedId="4gMGIrB25eY" />*/}