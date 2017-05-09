import React, {Component} from 'react';

export class Container extends Component{
    render(){
        const style = {
            width: '100vw',
            height: '100vh'
        }
        return (
            <div style={style}>
                <Map google={this.props.google} />
            </div>
        )
    }
}

export default GoogleApiComponent({
    apiKey: AIzaSyDnIDl19gpTBe-paoHvJbjTyEmrLAXqZtw
})(Container)