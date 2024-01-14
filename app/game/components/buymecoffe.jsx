import React from 'react';

function Coffee({ className, color }) {
    return (
        <a {...{ className }} style={{ backgroundColor: color }} target="_blank" href="https://www.buymeacoffee.com/lubascik">
            <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy me a tea" />
            <span>Buy me a tea</span>
        </a>
    );
}

export default Coffee;