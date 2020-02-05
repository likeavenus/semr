import React, {Component} from 'react';
import styles from './CreateBox.scss';
import fileIcon from './img/file-icon.png';
import {connect} from 'react-redux';
import {CREATE_CARD} from "../../actions/createCard";

class CreateBox extends Component {
    constructor(props) {
        super(props);

        this.labelFile = React.createRef();
        this.inputTitle = React.createRef();
        this.inputDescription = React.createRef();

        this.state = {
            inputFile: '',
            inputTitle: '',
            inputDescription: ''
        };
    }

    handleChangeInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleCheckIsValidForm = (callback) => {
        const {inputFile, inputTitle, inputDescription} = this.state;
        if (inputFile.trim() !== '' && inputTitle.trim() !== '' && inputDescription.trim() !== '') {
            callback();
        }
    };

    handleSaveCard = (action, payload) => {
        const {inputFile, inputTitle, inputDescription} = this.state;

        this.handleCheckIsValidForm(()=> {this.props.onSaveCard(action, payload)});

        this.inputTitle.current.style.border = '1px solid #A6B0B3';
        this.labelFile.current.style.border = '1px solid #DEE3E5';
        this.inputDescription.current.style.border = '1px solid #A6B0B3';

        if (inputTitle.trim() === '' ) {
            this.inputTitle.current.style.border = '1px solid red';
        }
        if (inputFile.trim() === '') {
            this.labelFile.current.style.border = '1px solid red';
        }
        if (inputDescription.trim() === '') {
            this.inputDescription.current.style.border = '1px solid red';
        }
    };

    render() {

        const {inputFile, inputTitle, inputDescription} = this.state;
        return (
            <section className={styles.create_box}>
                <div className={styles.create_content}>
                    <h1 className={styles.create_title}>Webinars</h1>
                    <p className={styles.create_text}>Here you can register and take part in educational webinars conducted by the best digital marketing experts</p>

                    <button className={styles.create_btn} type={'button'}>Add new</button>
                </div>

                <div className={styles.overlay}>
                    <form action="" className={styles.form}>
                        <h3 className={styles.form_title}>Add new</h3>
                        <label ref={this.labelFile} htmlFor={'inputFile'} className={styles.form_drag_pole}>
                            <img className={styles.form_icon} src={fileIcon} alt="file-icon"/>
                            <p className={styles.form_label}>select an image file to upload <span>or drag it here</span></p>
                        </label>

                        <input  id={'inputFile'} value={inputFile} onChange={(e)=> {this.handleChangeInput(e)}} className={styles.input_file} name={'file'} type={'file'}/>

                        <label className={styles.input_label} htmlFor="inputTitle">Title</label>
                        <input ref={this.inputTitle} onInput={(e)=> {this.handleChangeInput(e)}} placeholder={'Enter title'} className={styles.form_input} type="text" name={'title'} id={'inputTitle'}/>

                        <label className={styles.input_label} htmlFor={"inputDescription"}>Description</label>
                        <textarea ref={this.inputDescription} onInput={(e)=> {this.handleChangeInput(e)}} className={styles.form_area} name={'description'} id={'inputDescription'}/>

                        <button onClick={()=> {this.handleSaveCard(CREATE_CARD, {inputFile, inputTitle, inputDescription})}} className={styles.save_button} type={'button'}>Save</button>

                    </form>
                </div>


            </section>
        );
    }
}

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        onSaveCard: (action, payload) => {
            dispatch({type: action, payload: payload})
        }
    })
)(CreateBox);


