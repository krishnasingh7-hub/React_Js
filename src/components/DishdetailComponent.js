import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,CardTitle } from 'reactstrap';




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
			<div>
				<h4>Comments</h4>
				<div>
					{x}
				</div>
			</div>
			);
	}

    function RenderDish({Dish}) {
    	console.log("inside RenderDish")
        if (Dish != null){

            return(
				<div className="row">
				<div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={Dish.image} alt={Dish.name} />
                    <CardBody>
                      <CardTitle>{Dish.name}</CardTitle>
                      <CardText>{Dish.description}</CardText>
                    </CardBody>
                </Card>
                </div>
                <div className="col-12 col-md-5 m-1">
                	<RenderComments showcomment={Dish.comments} />
                </div>
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

				<RenderDish Dish={props.dishshow} />
				
			</div> 
		);
	}


export default DishDetail;