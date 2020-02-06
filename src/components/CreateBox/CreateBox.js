import React, {Component} from 'react';
import styles from './CreateBox.scss';
import fileIcon from './img/file-icon.png';
import {connect} from 'react-redux';
import {CREATE_CARD} from "../../actions/createCard";

class CreateBox extends Component {
    constructor(props) {
        super(props);
        // Рефы здесь только для косметических изменений
        this.labelFile = React.createRef();
        this.inputFile = React.createRef();
        this.inputTitle = React.createRef();
        this.inputDescription = React.createRef();

        this.state = {
            inputFile: '',
            file: null,
            inputTitle: '',
            inputDescription: '',
            weight: 1,
            type: '',
            popupIsActive: false,
            dragging: false,
        };
    }

    handleChangeInput = (event) => {
        if (event.target.id === 'inputFile') {
            let reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = () => {
                this.setState({
                    file: reader.result
                })
            };

        } else {
            this.setState({
                [event.target.id]: event.target.value
            });
        }

    };

    handleCheckIsValidForm = (callback) => {
        const {file, inputTitle, inputDescription} = this.state;
        if (file !== null && inputTitle.trim() !== '' && inputDescription.trim() !== '') {
            callback();
            this.setState({
                file: null,
                inputTitle: '',
                inputDescription: '',
                popupIsActive: false
            })
        }
    };

    handleSaveCard = (action, payload) => {
        const {inputTitle, inputDescription, file} = this.state;

        this.handleCheckIsValidForm(()=> {this.props.onSaveCard(action, payload)});

        this.inputTitle.current.style.border = '1px solid #A6B0B3';
        this.labelFile.current.style.border = '1px solid #DEE3E5';
        this.inputDescription.current.style.border = '1px solid #A6B0B3';

        if (inputTitle.trim() === '') {
            this.inputTitle.current.style.border = '1px solid red';
        }
        if (file === null) {
            this.labelFile.current.style.border = '1px solid red';
        }
        if (inputDescription.trim() === '') {
            this.inputDescription.current.style.border = '1px solid red';
        }
    };

    handleOpenEditMenu = () => {
        this.setState({
            popupIsActive: true
        })
    };

    handleCloseEditMenu = () => {
        this.setState({
            file: null,
            inputTitle: '',
            inputDescription: '',
            popupIsActive: false,
        })
    };

    // drag and drop logic

    handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();

        console.log(e);
    };

    handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();


        this.setState({
            dragging: false
        });
    };

    handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.labelFile.current.style.border = '1px solid #DEE3E5';
        this.setState({
            dragged: false
        });

    };

    componentDidMount() {
        const labelElem = this.labelFile.current;
        labelElem.addEventListener('dragenter', this.handleDrag);
        labelElem.addEventListener('dragleave', this.handleDragIn);
        labelElem.addEventListener('dragover', this.handleDragOut);
        labelElem.addEventListener('drop', this.handleDrop);
    }

    componentWillUnmount() {
        const labelElem = this.labelFile.current;
        labelElem.removeEventListener('dragenter', this.handleDragIn);
        labelElem.removeEventListener('dragleave', this.handleDragOut);
        labelElem.removeEventListener('dragover', this.handleDrag);
        labelElem.removeEventListener('drop', this.handleDrop);
    }

    render() {

        const {inputTitle, inputDescription, popupIsActive, file} = this.state;

        let overlayStyles = styles.overlay;
        let fileLabelStyles = styles.form_drag_pole;

        if (popupIsActive) {
            overlayStyles += ` ${styles.active}`;
        }


        let bodyLabel = <>
            <img className={styles.form_icon} src={fileIcon} alt="file-icon"/>
            <p className={styles.form_info}>select an image file to upload <span>or drag it here</span></p>
        </>;

        if (file !== null) {
            fileLabelStyles += ` ${styles.active}`;
            bodyLabel = <>
                <img className={styles.file_image} src={file} alt="preview"/>
            </>;
        }

        return (
            <section className={styles.create_box}>
                <div className={styles.create_content}>
                    <h1 className={styles.create_title}>Webinars</h1>
                    <p className={styles.create_text}>Here you can register and take part in educational webinars conducted by the best digital marketing experts</p>

                    <button onClick={this.handleOpenEditMenu} className={styles.create_btn} type={'button'}>Add new</button>
                </div>

                <div className={overlayStyles}>
                    <form action="" className={styles.form}>
                        <button onClick={this.handleCloseEditMenu} className={styles.close_btn} type={'button'}></button>
                        <h3 className={styles.form_title}>Add new</h3>
                        <label ref={this.labelFile} htmlFor={'inputFile'} className={fileLabelStyles}>
                            {bodyLabel}
                        </label>

                        <input ref={this.inputFile} value={this.state.inputFile} id={'inputFile'} onChange={(e)=> {this.handleChangeInput(e)}} className={styles.input_file} name={'file'} type={'file'}/>

                        <label className={styles.input_label} htmlFor="inputTitle">Title</label>
                        <input value={this.state.inputTitle} ref={this.inputTitle} onChange={(e)=> {this.handleChangeInput(e)}} placeholder={'Enter title'} className={styles.form_input} type="text" name={'title'} id={'inputTitle'}/>

                        <label className={styles.input_label} htmlFor={"inputDescription"}>Description</label>
                        <textarea placeholder={'Enter description'} value={this.state.inputDescription} ref={this.inputDescription} onChange={(e)=> {this.handleChangeInput(e)}} className={styles.form_area} name={'description'} id={'inputDescription'}/>

                        <button onClick={()=> {this.handleSaveCard(CREATE_CARD, {file, inputTitle, inputDescription})}} className={styles.save_button} type={'button'}>Save</button>

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


