import React, { Component } from "react";
import Modal, { IModalProps } from "../shared/components/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import "./BookModal.css";
import Hidden from "@material-ui/core/Hidden";
import HttpClient from "../shared/http/HttpClient";
import Endpoints from "../shared/api/endpoints";
import MenuItem from '@material-ui/core/MenuItem';


const bookGenres = [
    {
      value: 'Action',
      label: 'Action',
    },
    {
      value: 'Romance',
      label: 'Romance',
    },
    {
      value: 'Fiction',
      label: 'Fiction',
    },
    {
      value: 'Fantasy',
      label: 'Fantasy',
    },
];

const shelf = [
    {
      value: 'ToRead',
      label: 'To Read',
    },
    {
      value: 'Favorite',
      label: 'Favorite',
    },
];


type MyState = { bookTitle: string, authFirstName: string, authLastName: string, bookGenre: string, bookShelf: string, pageCount: number, publisher: string, showError: boolean, showInfo: boolean, msg: string };
export default class BookModal extends Component<IModalProps, MyState> {


    constructor(props: never) {
        super(props);
        this.state = {
            bookTitle: "",
            authFirstName: "",
            authLastName: "",
            bookGenre: "",
            bookShelf: "",
            pageCount: 0,
            publisher: "",
            showError: false,
            showInfo: false,
            msg: "", 
        };
        this.submitBook = this.submitBook.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePageCount = this.handlePageCount.bind(this);
    }

    

    handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState( { ...this.state, [event.target.name] : event.target.value });
        
    };
   
  
    handlePageCount = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState( { pageCount : Number(event.target.value) });
        
    };

    submitBook = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        const bookName = this.state.bookTitle;
        if(bookName.length > 0 && bookName.toString().length > 20){
            this.setState({showError: true, msg: "Book name is too long"});
            return;
        }
        HttpClient.post(Endpoints.shelf, bookName).then(() => {
            this.setState({showError: false, showInfo: true, msg: "Book saved successfully"});  
        }).catch((error: Record<string, string>) => {
            console.error(error);
            this.setState({showError: true, showInfo: false, msg: "Some error occurred"});    
        });
    };

    render(): JSX.Element {
        return (
            <div>
                <Modal open={this.props.open} onClose={this.props.onClose}>
                    <div className="shelf-modal-container">
                        <div className="modal-content">
                            <div className="modal-title">Add book</div>
                            {/* <div className="shelf-modal-desc-container"> */}
                                <Hidden smDown implementation="css">
                                    {/* <div className="shelf-modal-desc-items"> */}
                                        {/* <p>Book name</p>
                                        <TextField
                                            className="shelfInput"
                                            size="small"
                                            id="outlined-basic"
                                            variant="outlined"
                                            value={this.state.name}
                                            onChange={this.handleChange}
                                        /> */}
                                   
                                   <div>
                                        <TextField
                                        required
                                        id="standard-full-width"
                                        label="Book title"
                                        style={{ width: 520 }}
                                        fullWidth
                                        margin="normal"
                                    
                                        />
                                        <TextField
                                        required
                                        id="filled-required"
                                        label="Author's first name"
                                        className="book-modal-textfield"
                                        style={{ margin: 10 }}
                                        />
                                        <TextField
                                        required
                                        id="filled-required"
                                        label="Author's last name"
                                        className="book-modal-textfield"
                                        style={{ margin: 10 }}
                                        />
                                        <TextField
                                        required
                                        id="fill-select-currency"
                                        select
                                        label="Book genre"
                                        className="book-modal-textfield"
                                        style={{ margin: 10 }}
                                        value={this.state.bookGenre}
                                        onChange={this.props.handleChange}
                                        >
                                            {bookGenres.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <TextField
                                        required
                                        id="fill-select-currency"
                                        select
                                        label="Book shelf"
                                        className="book-modal-textfield"
                                        style={{ margin: 10 }}
                                        value={this.state.bookGenre}
                                        onChange={this.props.handleChange}
                                        >
                                            {shelf.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        
                                        <TextField
                                        id="filled-number"
                                        label="Page count"
                                        type="number"
                                        className="book-modal-textfield"
                                        style={{ margin: 10 }}
                                        
                                        />
                                        <TextField
                                        id="filled-required"
                                        label="Publisher"
                                        className="book-modal-textfield"
                                        style={{ margin: 10 }}
                                        />
                                    </div>
                                    <div className="shelf-modal-button-delete">
                                        <Button
                                            className="shelf-modal-button"
                                            variant="contained"
                                            color="secondary"
                                            fullWidth
                                            disableElevation
                                        >
                                            Delete Book
                                        </Button>
                                    </div>
                                    
                                    {/* </div> */}
                                </Hidden>
                                <Hidden mdUp implementation="css">
                                    <div className="shelf-modal-desc-items">
                                        <TextField
                                            required
                                            id="standard-full-width"
                                            label="Book title"
                                            style={{ width: 520 }}
                                            fullWidth
                                            margin="normal"
                                            name= "bookTitle"
                                            value={this.state.bookTitle}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </Hidden>
                            {/* </div> */}
                        </div>

                        <div className="modal-form-spacer" />

                        <div className="shelf-button-container">
                            <Button
                                className="shelf-modal-button"
                                variant="contained"
                                onClick={this.props.onClose}
                                disableElevation
                            >
                                Cancel
                            </Button>
                            <Button
                                className="shelf-modal-button"
                                variant="contained"
                                onClick={this.submitBook}
                                color="primary"
                                disableElevation
                            >
                                Save Book
                            </Button>
                        </div>
                        <div>
                         { (this.state.showError || this.state.showInfo) ?
                         
                        <Alert variant="filled" severity={this.state.showError? "error" : "info"}>
                            {this.state.msg}
                        </Alert>
                        : <></>
                        }
                      </div>
                    </div>
                    
                </Modal>
            </div>
        );
    }


}
