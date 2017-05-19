import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {ReactiveVar} from 'meteor/reactive-var';
import {ReactMeteorData, createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {_} from 'meteor/underscore';
import { Images } from '../../../lib/images.collection.js';
import { FilesCollection } from 'meteor/ostrio:files';


class SubmitImage extends Component {


    constructor() {
        super();
        this.currentUpload = new ReactiveVar(false);
    }




    uploadedFiles() {
        return Images.find();
    }

    uploadImage(event) {
        "use strict";
        event.preventDefault();
        let self = this;

        if (event.currentTarget.files && event.currentTarget.files[0]) {
            console.log(event.currentTarget.files);
            console.log(event.currentTarget.files[0]);
            console.log(ReactDOM.findDOMNode(this.refs.file).value);
            // We upload only one file, in case
            // there was multiple files selected
            console.log("Just entered uploadImage");

            this.props.inProgress.curValue = true;
            console.log(this.props.inProgress.curValue);

            var file = event.currentTarget.files[0];
            console.log(file);
            alert("Creater file/Just got file");
                console.log("In file");
                console.log(this.props.imgArray);

                let uploadInstance = Images.insert({
                    file: event.currentTarget.files,
                    stream: 'dynamic',
                    chunkSize: 'dynamic',
                    allowWebWorkers: false //Change to false if uploads not working
                }, false);

                this.props.uploading.push(uploadInstance);
                this.props.inProgress.curValue = true; // show the progress bar now

                console.log("Insert done");
                alert("In file");

                uploadInstance[0].start();
            //}
        }
    }

    showUploads(){
        console.log('********************', this.state.uploading);
    }


    render() {
        console.log(this.props.inProgress.curValue);
        return (
            <div className="container">
                { this.props.inProgress.curValue ?
                    <div>
                        Uploading <p>{this.file}</p>
                    </div>
                    :
                    <div>
                        <input id="fileinput" type="file" ref="file" onChange={this.uploadImage.bind(this)}/>
                        <p>
                            <small>Upload file in <code>jpeg</code> or <code>png</code> format, with size less or equal
                                to 10MB
                            </small>
                        </p>
                    </div>
                }
            </div>
        )
    }
}

SubmitImage.propTypes = {
    imgArray: PropTypes.array.isRequired
};

export default createContainer(() => {
    Meteor.subscribe('files.images.all');
    return {
        imgArray: Images.find({}).fetch(), // Collection is Images(eksmeplet kaller dem userfiles)
        uploading: [],
        progress: 0,
        inProgress: new ReactiveVar(false)
    }
}, SubmitImage);

/*
 {this.uploadedFiles().count() ?
 <div>
 <ForEach items={this.uploadedFiles()}>
 {(file) => //bind is not needed with arrow functions
 <a href={file.link}"?download=true" download={file.name}>
 {file.name}
 </a>
 }
 </ForEach>
 </div>
 :
 <div>
 No Files uploaded, yet
 </div>
 }
 */