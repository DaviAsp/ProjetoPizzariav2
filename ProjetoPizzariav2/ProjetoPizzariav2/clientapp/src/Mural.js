import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardImgOverlay, CardTitle, CardText } from 'reactstrap';


export default function Mural() {

    let saida = 
<div>
  <Card inverse>
    <CardImg
      alt="PizzariaBanner"
      src="https://picsum.photos/900/270?grayscale"
      style={{
        height: 270
      }}
      width="100%"
    />
    <CardImgOverlay>
      <CardTitle tag="h5">
        Pizzaria Vabene
      </CardTitle>
      <CardText>
        Por que Pizza vale mais que muita gente
      </CardText>
    </CardImgOverlay>
  </Card>
</div>

     return saida;
 } 