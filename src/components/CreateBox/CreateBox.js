import React, {Component} from 'react';
import styles from './CreateBox.scss';
import fileIcon from './img/file-icon.png';
import {connect} from 'react-redux';
import {CREATE_CARD, INCREASE_PAGES, UPDATE_CURRENT_CARDS} from "../../actions/actions";

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
            weight: 0,
            type: '',
            popupIsActive: false,
            dragging: false,
            incrementOfMaxLength: 0
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
            }, ()=> {
                if (this.state.type === 'big') {
                    this.setState({weight: 2})
                } else if (this.state.type === 'b') {
                    this.setState({weight: 9})
                } else {
                    this.setState({weight: 1})
                }
            });
        }



    };

    handleCheckIsValidForm = (callback) => {
        const {file, inputTitle, inputDescription} = this.state;
        if (file !== null && inputTitle.trim() !== '' && inputDescription.trim() !== '') {
            // this.setState({
            //     file: null,
            //     inputTitle: '',
            //     inputDescription: '',
            //     type: '',
            //     weight: 0,
            //     popupIsActive: false
            // });

            callback();
        }
    };

    handleSaveCard = (action, payload) => {
        const {inputTitle, inputDescription, file, incrementOfMaxLength} = this.state;


        this.handleCheckIsValidForm(()=> {
            this.props.onSaveCard(action, payload);
            this.props.onUpdateCurrentCards(UPDATE_CURRENT_CARDS, this.props.store.currentPage - 1);
        });

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

        const {totalWeight, pages} = this.props.store;
        let maxLength = 9;
        // если общий вес карточек + множитель триггера создания страницы без остатка делится на 10,
        // или, общий вес карточек больше чем произведение текущего количества страниц и максимальной длины страницы,  то добавляем страничку
        if (totalWeight && totalWeight + incrementOfMaxLength % maxLength === 0 || totalWeight > pages * maxLength) {
            this.props.onIncreasePages(INCREASE_PAGES);
            if (pages === 1) {
                this.setState({incrementOfMaxLength: incrementOfMaxLength + 1});
            } else {
                this.setState({incrementOfMaxLength: incrementOfMaxLength + 2});
            }
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
            type: '',
            weight: 0,
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

        const {inputFile, inputTitle, inputDescription, popupIsActive, file, type, weight} = this.state;

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

                        <input ref={this.inputFile} value={inputFile} id={'inputFile'} onChange={(e)=> {this.handleChangeInput(e)}} className={styles.input_file} name={'file'} type={'file'}/>

                        <label className={styles.input_label} htmlFor="inputTitle">Title</label>
                        <input value={inputTitle} ref={this.inputTitle} onChange={(e)=> {this.handleChangeInput(e)}} placeholder={'Enter title'} className={styles.form_input} type="text" name={'title'} id={'inputTitle'}/>

                        <label className={styles.input_label} htmlFor="type">Type</label>
                        <input value={type} onChange={(e)=> {this.handleChangeInput(e)}} className={styles.form_input} type="text" id={'type'} name={'type'} placeholder={'Enter "big", if you need big card'}/>

                        <label className={styles.input_label} htmlFor={"inputDescription"}>Description</label>
                        <textarea placeholder={'Enter description'} value={inputDescription} ref={this.inputDescription} onChange={(e)=> {this.handleChangeInput(e)}} className={styles.form_area} name={'description'} id={'inputDescription'}/>

                        <button onClick={()=> {this.handleSaveCard(CREATE_CARD, {file, inputTitle, inputDescription, type, weight})}} className={styles.save_button} type={'button'}>Save</button>

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
        },
        onIncreasePages: (action) => {
            dispatch({type: action})
        },
        onUpdateCurrentCards: (action, payload) => {
            dispatch({type: action, payload: payload})
        }
    })
)(CreateBox);


