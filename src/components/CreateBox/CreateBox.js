import React, {Component} from 'react';
import styles from './CreateBox.scss';
import fileIcon from './img/file-icon.png';
import {connect} from 'react-redux';
import {CREATE_CARD} from "../../actions/createCard";

class CreateBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputFile: '',
            inputTitle: '',
            inputDescription: ''
        };
    }

    handleChangeInput = (event) => {
        console.log(event.target.id);
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSaveCard = (action, payload) => {
        this.props.onSaveCard(action, payload)
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
                        <label htmlFor={'inputFile'} className={styles.form_drag_pole}>
                            <img className={styles.form_icon} src={fileIcon} alt="file-icon"/>
                            <p className={styles.form_label}>select an image file to upload <span>or drag it here</span></p>
                        </label>

                        <input id={'inputFile'} value={this.state.inputFile} onChange={(e)=> {this.handleChangeInput(e)}} className={styles.input_file} name={'file'} type={'file'}/>

                        <label className={styles.input_label} htmlFor="inputTitle">Title</label>
                        <input onInput={(e)=> {this.handleChangeInput(e)}} placeholder={'Enter title'} className={styles.form_input} type="text" name={'title'} id={'inputTitle'}/>

                        <label className={styles.input_label} htmlFor={"inputDescription"}>Description</label>
                        <textarea onInput={(e)=> {this.handleChangeInput(e)}} className={styles.form_area} name={'description'} id={'inputDescription'}/>

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


