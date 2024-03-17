import React, { Component } from "react";
import Modal, { IModalProps } from "../shared/components/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import "./ShelfModal.css";
import Hidden from "@material-ui/core/Hidden";
import HttpClient from "../shared/http/HttpClient";
import Endpoints from "../shared/api/endpoints";
import { Book } from "../shared/types/Book";

interface IShelfModalProps extends IModalProps {
    shelves: string[];
    setShelves: (newShef: string[]) => void;
    shelf: {
        name: string;
    };
  }


type MyState = { name: string, showError: boolean, showInfo: boolean, msg: string, shelves: string[], setShelves: (newShelf: string[]) => void, shelf: {name: string}};
export default class ShelfModal extends Component<IShelfModalProps, MyState > {
    constructor(props: IModalProps & MyState ) {
        super(props);
        this.state = {
              name: "",
              showError: false,
              showInfo: false,
              msg: "",
              shelves: props.shelves,
              setShelves: props.setShelves,
              shelf: props.shelf
          };
        this.submitShelf = this.submitShelf.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    
    
    componentDidMount(): void {
        const { shelf } = this.props;
        console.log(shelf);
        
        if (shelf && shelf.name) {
            this.setState({
                name: shelf.name
            });
        }
    }

    // componentDidMount(): void {
    //     if(Object.keys(this.state.shelf).length > 0) {
    //         console.log(this.state.shelf);
            
    //         this.setState({
    //             name: this.state.shelf.name
    //         })
    //         console.log(this.state.shelf.name);
    //         console.log(this.state.name);
    //     } 
    // }


    handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState( { name : event.target.value });
        
    };

    submitShelf = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        const shelfName = this.state.name;
        if(shelfName.length > 0 && shelfName.toString().length > 20){
            this.setState({showError: true, msg: "Shelf name is too long"});
            return;
        }
        // HttpClient.post(Endpoints.shelf, shelfName).then(() => {
        //     this.setState({showError: false, showInfo: true, msg: "Shelf saved successfully"});  
        // }).catch((error: Record<string, string>) => {
        //     console.error(error);
        //     this.setState({showError: true, showInfo: false, msg: "Some error occurred"});    
        // });

        if([shelfName].includes('')){
            this.setState({showError: true, msg: "Please write a name"});
            return;
        }

        this.setState({showError: false});

        console.log(shelfName)
                
        this.props.setShelves([...this.props.shelves, shelfName]);

        this.setState({name: ''});
        this.props.onClose?.();
    };

    

    render(): JSX.Element {
        return (
            <div>
                <Modal open={this.props.open} onClose={this.props.onClose}>
                    <div className="shelf-modal-container">
                        <div className="shelf-modal-content">
                            <div className="modal-title">{this.state.name ? 'Edit shelf' : 'Add shelf'}</div>
                            <div className="shelf-modal-desc-container">
                                <Hidden smDown implementation="css">
                                    <div className="shelf-modal-desc-items">
                                        <p>Shelf name</p>
                                        <TextField
                                            className="shelfInput"
                                            size="small"
                                            id="outlined-basic"
                                            variant="outlined"
                                            value={this.state.name}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    {this.state.name ? (
                                        <div className="shelf-modal-button-delete">
                                            <Button
                                                className="shelf-modal-button"
                                                variant="contained"
                                                color="secondary"
                                                fullWidth
                                                disableElevation
                                            >
                                                Delete Shelf
                                            </Button>
                                        </div> 
                                    ) : (<div></div>)}
                                    
                                </Hidden>
                                <Hidden mdUp implementation="css">
                                    <div className="shelf-modal-desc-items">
                                        <TextField
                                            className="shelfInput"
                                            size="small"
                                            id="name"
                                            variant="outlined"
                                            label="shelf name"
                                            value={this.state.name}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </Hidden>
                            </div>
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
                                onClick={this.submitShelf}
                                color="primary"
                                disableElevation
                            >
                                {this.state.name ? 'Edit shelf' : 'Add shelf'}
                            </Button>
                        </div>
                        {/* <div>
                            { (this.state.showError || this.state.showInfo) ?
                            
                            <Alert variant="filled" severity={this.state.showError? "error" : "info"}>
                                {this.state.msg}
                            </Alert>
                            : <></>
                            }
                        </div> */}
                    </div>
                </Modal>
            </div>
        );
    }
}
