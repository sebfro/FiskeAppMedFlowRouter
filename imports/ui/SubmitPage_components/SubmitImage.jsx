import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {ReactiveVar} from 'meteor/reactive-var';
import {Template} from 'meteor/templating';
//import Images from '../../../lib/images.collection.js';


export default class SubmitImage extends Component {
    constructor() {
        super();
        this.currentUpload = new ReactiveVar(false);
    }


    uploadedFiles() {
        return Images.find();
    }

    uploadImage(event) {
        if (event.currentTarget.files && event.currentTarget.files[0]) {
            console.log(ReactDOM.findDOMNode(this.refs.file).value);
            // We upload only one file, in case
            // there was multiple files selected
            console.log("Just entered uploadImage");
            var file = event.currentTarget.files[0];
            console.log(file);
            alert("Creater file/Just got file");
            //if (true) {
                console.log("In file");
                const uploadInstance = Images.insert({
                    file: file,
                    stream: 'dynamic',
                    chuckSize: 'dynamic'
                }, false);
                console.log("Insert done");
                alert("In file");
                uploadInstance.on('start', function () {
                    this.currentUpload = this;
                });
                alert("About to uload");
                uploadInstance.on('end', function (error, fileObj) {
                    if (error) {
                        alert('Error during upload: ' + error.reason);
                    } else {
                        alert('File "' + fileObj.name + '" successfully uploaded');
                    }
                    this.currentUpload = false;
                });

                uploadInstance.start();
            //}
        }
    }


    render() {
        console.log(this.currentUpload.curValue);
        return (
            <div>
                { this.currentUpload.curValue ?
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
/*
SubmitImage.propTypes = {
    reports: PropTypes.array.isRequired,
    currentUser: PropTypes.object,
};

export default createContainer(() => {
    return {
        currentUser
    };
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