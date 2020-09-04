import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,CardTitle } from 'reactstrap';


class DishDetail extends Component{

	constructor(props){
		super(props)
		this.state = {
			
		}
	}

	renderComments(showcomment){
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

    renderDish(dish) {
        if (dish != null)
            return(
				<div className="row">
				<div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </div>
                <div className="col-12 col-md-5 m-1">
                	{this.renderComments(dish.comments)}
                </div>
                </div>

				

            );
        else
            return(
                <div></div>
            );
    }


	render(){

		return(
			<div className="container">

				{this.renderDish(this.props.dishshow)}
				
			</div> 
		);
	}
}

export default DishDetail;