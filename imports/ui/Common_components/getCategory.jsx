import React, {Component} from 'react';
import i18n from 'meteor/universe:i18n';

const T = i18n.createComponent();
const textStyle = { display: 'inline' };

export default class GetCategory extends Component{

    renderCategory(){
        if(this.props.category === "Koral"){
            return <T>common.navbar.coralSpecies</T>;
        } else if(this.props.category === "Fiske art"){
            return <T>common.navbar.fishSpecies</T>;
        } else {
            return <T>common.navbar.unknownSpecies</T>;
        }
    }

    render(){
        return(
            <div style={textStyle}>
                {this.renderCategory()}
            </div>
        );
    }
}