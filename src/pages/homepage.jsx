import React, { Component } from 'react';

const HomePage = ({Content}) => {
    return ( 
        <div>
            <p>
                {JSON.stringify(Content)}
            </p>
        </div>
     );
}
 
export default HomePage;