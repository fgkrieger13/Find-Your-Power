import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';


// Basic styling for image dropzone
const dropStyle = {
    border: '1px solid #f29475',
    borderRadius: '100px',
    width: '130px',
    height: '130px',
}

class ImageUpload extends Component {

    handleFinishedUpload = info => {
        console.log(info);
        // console.log('File uploaded with filename', info.filename)
        console.log('Access it on s3 at', info.fileUrl)
        this.props.dispatch({ type: 'POST_IMAGE_URL', payload: info.fileUrl })
        this.props.dispatch({type: 'FETCH_USER'})
    }

    render() {

        const uploadOptions = {
            server: 'http://localhost:5000',
            // signingUrlQueryParams: { uploadType: 'avatar' },
        }

        // URL for bucket where users profile pictures are stored
        const s3Url = 'https://findyourpowerscytalebucket.s3.amazonaws.com'

        const innerDropElement = (
            <div className="inner-drop">
                <p className="inner-drop-text">add a photo</p>
            </div>
        )

        return (
            // This creates the space where image can be uploaded 
            <DropzoneS3Uploader
                children={innerDropElement}
                onFinish={this.handleFinishedUpload}
                s3Url={s3Url}
                maxSize={1024 * 1024 * 5}
                upload={uploadOptions}
                style={dropStyle}
            />
        )
    }

}

export default connect()(ImageUpload);