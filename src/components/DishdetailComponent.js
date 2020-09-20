import React,{Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem ,Button, Modal, ModalHeader, ModalBody, ModalFooter, Label,Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required =(val) =>val&&val.length;
const maxLength = (len)=>(val)=>!(val)||(val.length<=len);
const minLength = (len)=>(val)=>(val)&&(val.length>=len);

class CommentForm extends Component{
	constructor(props){
		super(props);
		
		this.state = {
			isModalOpen: false
		  };
		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	};

	toggleModal() {
		this.setState({
		  isModalOpen: !this.state.isModalOpen
		});
	}

	handleSubmit(values) {
		this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
	}

	render(){
		return(
			<div>
      			<Button className="bg-white bg-gradient-primary text-dark" onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={(values)=> this.handleSubmit(values)}>
							<Row className="form-group">
                                <Label htmlFor="rating" md={4}>Rating</Label>
								<Col md={12}>
									<Control.select model=".rating" id="rating" name="rating" className="form-control">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</Control.select>
								</Col>
                            </Row>
							<Row className="form-group">
								<Label htmlFor="author" md={4}>Your Name</Label>
								<Col md={12}>
									<Control.text model=".author" id="author" name="author" 
									placeholder="Your Name"
									className="form-control" 
									validators={{
										required, minLength: minLength(3), maxLength: maxLength(15)
									}}
								/>
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />

								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="coment" md={4}>Comment</Label>
								<Col md={12}>
									<Control.textarea model=".comment" id="comment" name="comment" 
									className="form-control" rows="6" />
								</Col>
							</Row>
							<Button type="submit" value="submit" color="primary">Submit</Button>
						</LocalForm>
						
					</ModalBody>
				</Modal>
			</div>

		);
	}
}

	function RenderComments({showcomment,addComment, dishId}){
		console.log(showcomment)
		const month = ['Jan','Feb','Mar','Apr','May','June','Jul','Aug','Sep','Oct','Nov','Dec']
		const x = showcomment.map((cmnt)=>{
					return(
                		
						<ul className="list-unstyled" key={cmnt.id}>
							
							<li>{cmnt.comment}</li>
							<li> -- {cmnt.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(cmnt.date)))} </li>

						</ul>
						
					);
				})
		return(
			<div className="col-12 col-md-5 m-1">
				<h4>Comments</h4>
				{x}
				<CommentForm dishId={dishId} addComment={addComment} />
			</div>
			);
	}

    function RenderDish({Dish}) {
    	console.log("inside RenderDish")
        if (Dish != null){

            return(
				
				<div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={Dish.image} alt={Dish.name} />
                    <CardBody>
                      <CardTitle>{Dish.name}</CardTitle>
                      <CardText>{Dish.description}</CardText>
                    </CardBody>
                </Card>
                </div>

            );
        }
        else{
        	console.log("inside RenderDish null")
            return(
                <div></div>
            );
        }
    }


	const DishDetail = (props) => {
		console.log(props.dishshow)
		return(
			<div className="container">
	            <div className="row">
	                <Breadcrumb>
	                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
	                    <BreadcrumbItem active>{props.dishshow.name}</BreadcrumbItem>
	                </Breadcrumb>
	                <div className="col-12">
	                    <h3>{props.dishshow.name}</h3>
	                    <hr />
	                </div>                
	            </div>
				<div className="row">
					<RenderDish Dish={props.dishshow} />
					<RenderComments showcomment={props.comments} 
									addComment={props.addComment}
									dishId={props.dishshow.id}
					/>
				</div>
			</div> 
		);
	}


export default DishDetail;