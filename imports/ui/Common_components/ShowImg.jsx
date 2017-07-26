import React, {Component} from 'react';
import {Grid, Row, Thumbnail, Button, Col} from 'react-bootstrap'
import i18n from 'meteor/universe:i18n';


const wellStyles = {maxWidth: 400};
const T = i18n.createComponent();


//ShowImg komponent - gjengir et bilde på skjerm
export default class ShowImg extends Component {

    constructor(props) {
        super(props);
        this.state = {
            enLarge: false,
            showImg: true
        }
    }

    //<img src={this.props.photo[i]} className="w3-round-large" style={{"height" : "100%", "width" : "30%", padding : 20}} onClick={() => this.props.removeImg(i)}/>

    /*
    <Button bsStyle="primary" bsSize="large" block>Block level button</Button>
                            <Button bsSize="large" block>Block level button</Button>

                            <Button bsStyle="primary" style={{"height": "100%", "width": "30%"}}
                                    onClick={() => this.props.removeImg(i)} block><span>Remove</span></Button>&nbsp;
     */

    renderImg() {
        let imgArray = [];
        for (let i = 0; i < this.props.photo.length; i++) {
            imgArray.push(
                <Col xs={6} md={4}>
                    <Thumbnail src={this.props.photo[i]} alt="242x200">
                        <Button bsStyle="primary" onClick={() => this.props.removeImg(i)} block><T>common.ShowImgSubmitPage.deleteBtn</T></Button>
                    </Thumbnail>
                </Col>
            );
        }

        return imgArray
    }

    render() {
        if (this.props.photo.length === 0) {
            return ( null )
        } else {
            return (
                <li>
                    <Grid>
                        <Row>
                            {this.renderImg()}
                        </Row>
                    </Grid>
                </li>
            );
        }
    }
}