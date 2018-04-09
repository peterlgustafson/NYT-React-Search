import React, { Component } from 'react';

class Results extends Component {
    getArticles (q, begin_date, end_date) => {
        let end = (end_date == undefined) ? 0 : end_date;
    
        //technical term: string interpolation:
        //`http://localhost:3001/articles/${q}/${begin_date}/${end}`
        //"http://localhost:3001/articles/" + q + "/" + begin_date + "/" + end
        return fetch(`http://localhost:3001/articles/${q}/${begin_date}/${end}`)
            .then(res => res.json());
    }
    
}

export default Results;
