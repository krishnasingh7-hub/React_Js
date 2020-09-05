import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';



	function RenderComments({showcomment}){
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
					<RenderComments showcomment={props.comments} />
				</div>
			</div> 
		);
	}


export default DishDetail;