import React from "react";
import CoinPreviewGhost from "../CoinPreview/CoinPreviewGhost";
import {connect} from "react-redux";

function CoinListGhost({limit}){
    const content = [];
    for(let i = 0; i < limit; i++){
        content.push( <CoinPreviewGhost key={i}/> );
    }

    return content;
}

const mapStateToProps = state => ({
    limit: state.searchCriteria.limit
})

export default connect(mapStateToProps)(CoinListGhost);